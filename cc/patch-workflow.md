# VostraCode Git Patch Workflow Guide

## Overview

This guide explains how to use git patches for VostraCode rebranding, allowing clean development with upstream compatibility while maintaining complete control over release branding.

## Core Concept

- **Development:** Work with original Continue branding to avoid merge conflicts
- **Release:** Apply patches to transform Continue → VostraCode branding
- **Maintenance:** Version-control patches and update them when needed

## One-Time Setup

### 1. Create Branding Branch

```bash
# Start from clean main branch
git checkout main
git pull upstream main

# Create branding branch
git checkout -b vostra-branding

# Make all rebranding changes here
# (Follow rebrand.md specifications)
```

### 2. Organize Rebranding Commits

Make separate commits for each component to create focused patches:

```bash
# Commit 1: VSCode Extension
git add extensions/vscode/
git commit -m "rebrand: VSCode extension to VostraCode"

# Commit 2: Core branding
git add core/
git commit -m "rebrand: Core configuration and paths"

# Commit 3: GUI branding
git add gui/
git commit -m "rebrand: GUI components and assets"

# Commit 4: Documentation
git add website/ clients/vscode/src/StatusBarItem.ts clients/vscode/src/logger.ts
git commit -m "rebrand: Documentation and UI strings"

# Commit 5: Code actions and terminal
git add clients/vscode/src/code-action/ clients/vscode/src/chat/webview.ts
git commit -m "rebrand: Code actions and terminal integration"
```

### 3. Generate Patches

```bash
# Create patches directory
mkdir -p patches

# Generate patches from all branding commits
git format-patch main..vostra-branding -o patches/

# Patches will be named:
# 0001-rebrand-VSCode-extension-to-VostraCode.patch
# 0002-rebrand-Server-startup-banner-and-API-docs.patch
# etc.
```

### 4. Store Patches in Version Control

```bash
# Switch back to main for development
git checkout main

# Add patches to version control
git add patches/
git commit -m "Add VostraCode rebranding patches"
```

## Release Workflow

### Creating a Release

```bash
# Ensure main is up to date
git checkout main
git pull upstream main

# Create release branch
git checkout -b release-v1.0.0

# Apply all patches
git apply patches/*.patch

# Verify the branding was applied correctly
# (See verification checklist below)

# Tag the release
git tag v1.0.0-vostracode

# Build and deploy from this branch
```

### Alternative: Using git am

For more robust patch application with commit messages:

```bash
# Instead of git apply, use git am to preserve commit history
git am patches/*.patch

# This creates commits in your release branch with original commit messages
```

## Patch Maintenance

### When Upstream Changes Break Patches

If `git apply` fails due to upstream changes:

```bash
# Try applying patches one by one to identify which one fails
git apply patches/0001-*.patch  # Success
git apply patches/0002-*.patch  # Fails with conflict

# Apply the failing patch with conflict markers
git apply --3way patches/0002-*.patch

# Resolve conflicts manually
# Edit conflicted files, remove conflict markers

# Update the patch
git add .
git commit -m "Resolve conflicts in server branding patch"

# Regenerate the updated patch
git format-patch HEAD~1 -o patches/ --start-number=2
mv patches/0001-*.patch patches/0002-rebrand-Server-startup-banner-and-API-docs.patch

# Clean up
rm patches/0001-*.patch
```

### Updating Patches for New Features

When adding new rebranding requirements:

```bash
# Switch to branding branch
git checkout vostra-branding

# Rebase on latest main
git rebase main

# Add new branding changes
# Make commits for new changes

# Regenerate all patches
rm patches/*
git format-patch main..vostra-branding -o patches/

# Commit updated patches
git checkout main
git add patches/
git commit -m "Update rebranding patches for new features"
```

## Verification Checklist

After applying patches, verify the following:

### Visual Verification

- [ ] VSCode extension displays "VostraCode" in marketplace
- [ ] Sidebar shows "VostraCode" instead of "Continue"
- [ ] Config directory is ~/.vostracode instead of ~/.continue
- [ ] All error messages reference VostraCode

### Functional Verification

- [ ] Server starts without errors
- [ ] VSCode extension connects to server
- [ ] Code completion works
- [ ] Chat functionality works
- [ ] All configuration files are valid

### Build Verification

- [ ] `cargo build` succeeds
- [ ] `pnpm build` succeeds in clients/vscode
- [ ] No linting errors introduced

## Troubleshooting

### Common Issues

**Patch doesn't apply cleanly:**

- Use `git apply --3way` to get conflict markers
- Resolve conflicts manually
- Regenerate the patch

**Build fails after applying patches:**

- Check for syntax errors in modified files
- Verify package.json files are valid after string replacements
- Run npm/pnpm install to ensure dependencies are correct

**VSCode extension fails to load:**

- Check package.json syntax
- Verify all command IDs are still valid
- Test extension loading in development mode

### Rollback Procedure

To remove branding and return to clean Continue state:

```bash
# Reset release branch to main
git checkout release-v1.0.0
git reset --hard main

# Or create fresh release branch
git branch -D release-v1.0.0
git checkout -b release-v1.0.0
```

## Best Practices

1. **Keep patches focused:** One component per patch
2. **Test patches regularly:** Apply to fresh main branch periodically
3. **Document patch purposes:** Use descriptive commit messages
4. **Version patches:** Update when upstream changes require it
5. **Backup strategy:** Keep patches in version control
6. **Automation ready:** Patches can be applied in CI/CD pipelines

## VostraCode Override Pattern

**Standard approach for overriding upstream behavior:**

1. **Create `vc-*.ts` file** with override function
2. **Patch source function** to call VostraCode override
3. **Leave all other files unchanged**

**Example:**

```typescript
// vc-freetrial.ts
export function vcHasPassedFTL(): boolean {
  return false;
}

// freeTrial.ts (patch)
import { vcHasPassedFTL } from "./vc-freetrial";
export function hasPassedFTL(): boolean {
  return vcHasPassedFTL(); // VostraCode override
}
```

**Benefits:**

- Single chokepoint for all behavior
- Forces conflicts to surface when upstream changes
- Clear separation of VostraCode vs upstream logic

## Integration with CI/CD

Example GitHub Actions workflow:

```yaml
name: Create VostraCode Release
on:
  workflow_dispatch:
    inputs:
      version:
        description: "Release version"
        required: true

jobs:
  create-release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Apply branding patches
        run: |
          git checkout -b release-${{ github.event.inputs.version }}
          git apply patches/*.patch
      - name: Build release
        run: |
          cd extensions/vscode
          npm install
          npm run package
      - name: Create release artifacts
        run: |
          # Package binaries, extensions, etc.
```

This approach provides a robust, version-controlled method for maintaining VostraCode branding while keeping development conflict-free.
