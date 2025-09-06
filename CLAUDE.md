# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Building and Running

**Install dependencies:**

```bash
npm install  # Root dependencies
cd core && npm install  # Core package
cd ../extensions/vscode && npm install  # VS Code extension
cd ../gui && npm install  # GUI
```

**Development:**

```bash
# Watch TypeScript across all packages
npm run tsc:watch

# VS Code extension development
cd extensions/vscode
npm run esbuild-watch  # Watch and rebuild
npm run package  # Create VSIX package

# GUI development
cd gui
npm run dev  # Start Vite dev server

# Core development
cd core
npm run vitest  # Run tests
npm run tsc:check  # Type check without emitting
```

**Testing:**

```bash
# Core tests
cd core
npm test  # Run Jest tests
npm run vitest  # Run Vitest tests

# VS Code extension tests
cd extensions/vscode
npm test  # Run Vitest tests

# Run a single test file
npm run vitest -- path/to/test.vitest.ts
```

**Formatting and Linting:**

```bash
# Root level
npm run format  # Format all files
npm run format:check  # Check formatting

# Core
cd core
npm run lint  # Lint TypeScript files
npm run lint:fix  # Auto-fix lint issues

# VS Code extension
cd extensions/vscode
npm run lint
npm run lint:fix
```

## Architecture

### Core Components

**core/** - Shared business logic and abstractions

- `core.ts` - Main Core class that handles all protocol messages from IDE/GUI
- `protocol/` - Message types and communication contracts between components
- `llm/` - LLM provider implementations and streaming chat
- `indexing/` - Codebase indexing and retrieval
- `autocomplete/` - Code completion provider and context retrieval
- `context/` - Context providers for chat (files, codebase, MCP, etc.)
- `tools/` - Tool definitions and implementations for LLM function calling
- `config/` - Configuration handling and profile management

**extensions/vscode/** - VS Code extension implementation

- `src/extension.ts` - Extension entry point
- `src/VsCodeMessenger.ts` - Handles communication with Core
- `src/VsCodeIde.ts` - IDE interface implementation
- Protocol messages to Core use `core.invoke()` pattern

**extensions/intellij/** - JetBrains IDE extension (Kotlin)

- `IdeProtocolClient.kt` - Handles IDE-side protocol messages

**gui/** - React-based web interface

- `src/main.tsx` - Application entry point
- Redux store for state management
- Communicates with Core via webview protocol

### Communication Flow

1. **IDE ↔ Core**: IDE extensions communicate with Core via protocol messages

   - IDE → Core: See `core/protocol/core.ts` for available commands
   - Core → IDE: See `core/protocol/ide.ts` for IDE interface methods

2. **GUI ↔ Core**: Web interface communicates via webview protocol

   - Messages pass through IDE extension layer
   - See `core/protocol/passThrough.ts` for forwarded message types

3. **Protocol Guidelines**:
   - New protocol messages must be added to appropriate protocol files
   - Update `passThrough.ts` for webview↔core messages
   - Update `MessageTypes.kt` for JetBrains compatibility
   - Implement handlers in `core.ts`, `VsCodeMessenger.ts`, or `IdeProtocolClient.kt`

### Key Rules from Existing Documentation

- When adding protocol messages, verify they don't duplicate existing functionality
- Core is designed to be bundleable as a binary - avoid direct imports where possible
- Use `core.invoke()` pattern for VS Code → Core communication
- All webview↔core messages must be registered in passThrough.ts
- TypeScript compilation should pass across all packages before committing
