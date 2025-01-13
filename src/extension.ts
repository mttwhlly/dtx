import * as vscode from 'vscode';

interface TaskQuickPickItem extends vscode.QuickPickItem {
    task?: TaskOption;
}

interface TaskOption {
    label: string;
    description: string;
    command: string;
    args?: string[];
    requiresInput?: boolean;
    inputPrompt?: string;
    category: string;
}

export function activate(context: vscode.ExtensionContext) {
    const taskOptions: TaskOption[] = [
        // Git Workflow Tasks
        {
            label: "Create Feature Branch",
            description: "Creates a new feature branch",
            command: "git checkout -b feature/",
            requiresInput: true,
            inputPrompt: "Enter feature name",
            category: "Git Workflow"
        },
        {
            label: "Merge Changes",
            description: "Merge changes from main branch",
            command: "git fetch origin && git merge origin/main --no-ff",
            category: "Git Workflow"
        },
        {
            label: "Deploy",
            description: "Deploy the application",
            command: "npm run build && npm run deploy",
            category: "Git Workflow"
        },

        // Development Tasks
        {
            label: "Fix Linting Issues",
            description: "Automatically fix linting issues",
            command: "npm run lint",
            args: ["--fix"],
            category: "Development"
        },
        {
            label: "Watch Tests",
            description: "Run tests in watch mode",
            command: "npm run test",
            args: ["--watch"],
            category: "Development"
        },
        {
            label: "Generate Documentation",
            description: "Generate project documentation",
            command: "npm run docs",
            category: "Development"
        },

        // Maintenance Tasks
        {
            label: "Update Dependencies",
            description: "Update npm packages and fix security issues",
            command: "npm update && npm audit fix",
            category: "Maintenance"
        },
        {
            label: "Clear Cache",
            description: "Clean npm cache and reinstall dependencies",
            command: "npm cache clean --force && rm -rf node_modules && npm install",
            category: "Maintenance"
        }
    ];

    let disposable = vscode.commands.registerCommand('ui-dev-tools.showMenu', async () => {
        // Group tasks by category
        const groupedTasks = taskOptions.reduce((acc, task) => {
            if (!acc[task.category]) {
                acc[task.category] = [];
            }
            acc[task.category].push(task);
            return acc;
        }, {} as Record<string, TaskOption[]>);

        // Create QuickPick for categories
        const categoryPick = vscode.window.createQuickPick();
        categoryPick.title = 'UI Dev Tools';
        categoryPick.placeholder = 'Select a category';
        categoryPick.items = Object.keys(groupedTasks).map(category => ({
            label: category,
            description: `${groupedTasks[category].length} tasks`
        }));

        categoryPick.onDidChangeSelection(async ([selection]) => {
            if (selection) {
                categoryPick.hide();
                
                // Show tasks for selected category
                const taskPick = vscode.window.createQuickPick<TaskQuickPickItem>();
                taskPick.title = selection.label;
                taskPick.placeholder = 'Select a task';
                taskPick.items = groupedTasks[selection.label].map(task => ({
                    label: task.label,
                    description: task.description,
                    task: task
                }));

                taskPick.onDidChangeSelection(async ([selection]) => {
                    if (selection && selection.task) {
                        const task = selection.task;
                        taskPick.hide();

                        let command = task.command;
                        
                        // Handle input if required
                        if (task.requiresInput) {
                            const input = await vscode.window.showInputBox({
                                prompt: task.inputPrompt || 'Enter value'
                            });
                            if (!input) {
                                return; // User cancelled
                            }
                            command += input;
                        }

                        // Add arguments if any
                        if (task.args) {
                            command += ' ' + task.args.join(' ');
                        }

                        // Execute in terminal
                        const terminal = vscode.window.createTerminal('UI Dev Tools');
                        terminal.show();
                        terminal.sendText(command);
                    }
                });

                taskPick.show();
            }
        });

        categoryPick.show();
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}