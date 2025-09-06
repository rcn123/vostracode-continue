# Refresh Extension After Changes

## Quick Steps

1. **Rebuild the extension:**

   ```bash
   cd extensions/vscode
   npm run esbuild
   ```

2. **Reload VS Code:**
   - Press `Ctrl+Shift+P`
   - Run: "Developer: Reload Window"

## When to Use

- After changing config files (`vc-default.ts`, etc.)
- After modifying TypeScript source files
- After changing `package.json`

## For Live Development

```bash
cd extensions/vscode
npm run esbuild-watch  # Auto-rebuilds on file changes
```

Then reload VS Code window when you see "esbuild complete" in terminal.
