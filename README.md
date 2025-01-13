# UI Development Tools (DTX)

A VS Code extension that provides a convenient UI for common development tasks in the UI project workflow.

## Features

This extension provides quick access to common development tasks through an intuitive menu interface:

### Git Workflow Tasks
- **Create Feature Branch**: Quickly create a new feature branch with proper naming
- **Merge Changes**: Merge changes from the main branch
- **Deploy**: Run build and deployment tasks

### Development Tasks
- **Fix Linting Issues**: Automatically fix common linting issues
- **Watch Tests**: Run tests in watch mode for TDD workflow
- **Generate Documentation**: Generate project documentation

### Maintenance Tasks
- **Update Dependencies**: Update npm packages and fix security issues
- **Clear Cache**: Clean npm cache and reinstall dependencies

## Usage

1. Open the Command Palette (Cmd/Ctrl + Shift + P)
2. Type "UI Dev Tools: Show Menu"
3. Select a category of tasks
4. Choose the specific task you want to run

## Requirements

- Visual Studio Code version 1.96.0 or higher
- Node.js version 20.0.0 or higher
- Git installed and configured

## Installation

Since this is a private extension for internal use:

1. Download the `.vsix` file from the internal repository
2. In VS Code, go to Extensions view
3. Click on the ... menu (More Actions)
4. Select "Install from VSIX..."
5. Choose the downloaded `.vsix` file

## Contributing

1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Make your changes
4. Test the extension:
   - Press F5 to launch the extension in debug mode
   - Run `pnpm run test` to execute the test suite

## Building

To build the extension:
```bash
pnpm run package
```

## License

Private - For internal use only

## Release Notes

### 0.0.1

Initial release:
- Added Git workflow tasks
- Added development tasks
- Added maintenance tasks