# VostraCode Repository Setup Guide

## Overview

This guide walks you through setting up a clean VostraCode repository using the git patch-based rebranding strategy. This approach allows you to maintain a private repository while easily pulling updates from the upstream Tabby project.

## Prerequisites

- Git installed and configured
- GitHub CLI (`gh`) installed (optional but recommended)
- Access to create private repositories in your organization

## Option 1: Fresh Repository Setup (Recommended)

### Step 1: Clone Upstream Repository

```bash
# Clone the original Tabby repository
git clone https://github.com/TabbyML/tabby.git vostracode
cd vostracode

# Verify you're on the main branch
git branch
```

### Step 2: Create Private Repository

```bash
# Create a new private repository (using GitHub CLI)
gh repo create Vostra-AI/vostracode --private --description "VostraCode - Enterprise On-Premises AI Coding Assistant"

# Or create manually on GitHub.com and note the URL
```

### Step 3: Configure Remotes

```bash
# Rename origin to upstream
git remote rename origin upstream

# Add your private repository as origin
git remote add origin git@github.com:Vostra-AI/vostracode.git

# Verify remotes
git remote -v
# Should show:
# origin    git@github.com:Vostra-AI/vostracode.git (fetch)
# origin    git@github.com:Vostra-AI/vostracode.git (push)
# upstream  https://github.com/TabbyML/tabby.git (fetch)
# upstream  https://github.com/TabbyML/tabby.git (push)
```

### Step 4: Push to Private Repository

```bash
# Push main branch to your private repository
git push -u origin main

# Push all branches and tags
git push origin --all
git push origin --tags
```

## Option 2: Migration from Existing Repository

If you already have a repository with conflicts (like your current `rcn-test` branch):

### Step 1: Start Fresh in New Directory

```bash
# Create a new clean clone
cd ..
git clone https://github.com/TabbyML/tabby.git vostracode-clean
cd vostracode-clean
```

### Step 2: Copy Your Custom Work

```bash
# Copy any custom files from your old repository
cp -r ../tabby/claude-docs ./
cp ../tabby/CLAUDE.md ./

# Add any VostraCode-specific code you've written
# (Avoid copying conflicted files)
```

### Step 3: Follow Option 1 Steps 2-4

Continue with creating the private repository and configuring remotes.

## Initial Patch Setup

### Step 1: Create Branding Branch

```bash
# Create the vostra-branding branch
git checkout -b vostra-branding

# This branch will contain all your rebranding changes
```

### Step 2: Apply Initial Rebranding

Make the changes specified in `rebrand.md`, organized by component:

```bash
# VSCode Extension changes
# Edit clients/vscode/package.json
# Edit clients/vscode/src/StatusBarItem.ts
# Edit clients/vscode/src/logger.ts
# Edit clients/vscode/src/code-action/*.ts
# Edit clients/vscode/src/chat/webview.ts

# Commit VSCode changes
git add clients/vscode/
git commit -m "rebrand: VSCode extension to VostraCode"

# Server branding changes
# Edit crates/tabby/src/routes/mod.rs (ASCII banner)
# Edit crates/tabby/src/serve.rs (API documentation)

# Commit server changes
git add crates/tabby/src/
git commit -m "rebrand: Server startup banner and API docs"

# Agent configuration changes
# Edit clients/tabby-agent/src/config/configFile.ts

# Commit agent changes
git add clients/tabby-agent/
git commit -m "rebrand: Agent configuration templates"

# Documentation changes
# Edit website/docusaurus.config.js

# Commit documentation changes
git add website/
git commit -m "rebrand: Documentation website"
```

### Step 3: Generate Initial Patches

```bash
# Switch back to main
git checkout main

# Create patches directory
mkdir -p patches

# Generate patches
git format-patch main..vostra-branding -o patches/

# Add patches to version control
git add patches/
git commit -m "Add initial VostraCode rebranding patches"

# Push to your private repository
git push origin main
```

## Team Setup

### For Team Members

```bash
# Clone the private repository
git clone git@github.com:Vostra-AI/vostracode.git
cd vostracode

# Set up upstream remote for pulling updates
git remote add upstream https://github.com/TabbyML/tabby.git

# Verify setup
git remote -v
```

### Branching Strategy

```bash
# Main development branch (Tabby branding)
git checkout main

# Feature branches (also Tabby branding)
git checkout -b feature/new-feature

# Release branches (VostraCode branding, created by applying patches)
git checkout -b release-v1.0.0
git apply patches/*.patch
```

## Regular Upstream Updates

### Weekly/Monthly Upstream Sync

```bash
# Fetch latest from upstream
git fetch upstream

# Check for new commits
git log --oneline main..upstream/main

# Merge upstream changes
git checkout main
git merge upstream/main

# Push updated main to your private repository
git push origin main
```

### When Patches Break

If upstream changes cause patch conflicts:

```bash
# Test patches on latest main
git checkout -b test-patches
git apply patches/*.patch

# If conflicts occur, see patch-workflow.md for resolution steps
```

## Verification

### Verify Repository Setup

```bash
# Check remotes
git remote -v

# Verify you can pull from upstream
git fetch upstream

# Verify you can push to private repository
git push origin main

# Check branch structure
git branch -a
```

### Verify Patch Workflow

```bash
# Test patch application
git checkout -b test-release
git apply patches/*.patch

# Verify branding
echo "Check that VostraCode branding is applied correctly"

# Clean up test
git checkout main
git branch -D test-release
```

## Security Considerations

### Private Repository Access

- Ensure only authorized team members have access
- Use deploy keys for CI/CD access
- Consider using GitHub Apps for automated workflows

### Upstream Monitoring

- Set up GitHub notifications for upstream repository
- Monitor security advisories for the upstream project
- Regularly review upstream changes before merging

### Sensitive Information

- Never commit API keys or secrets
- Use environment variables for configuration
- Review patches before applying to ensure no sensitive data exposure

## Troubleshooting

### Common Issues

**Remote already exists:**
```bash
git remote remove origin
git remote add origin git@github.com:Vostra-AI/vostracode.git
```

**Permission denied:**
```bash
# Check SSH keys
ssh -T git@github.com

# Or use HTTPS with token
git remote set-url origin https://token@github.com/Vostra-AI/vostracode.git
```

**Patches don't apply:**
```bash
# Check if main branch is up to date with your patches
git log --oneline main..vostra-branding

# Regenerate patches if needed
git format-patch main..vostra-branding -o patches/ --overwrite
```

## Next Steps

1. Follow the [patch workflow guide](patch-workflow.md) for development
2. Create your first release using the [release checklist](release-checklist.md)
3. Set up CI/CD pipelines for automated patch application
4. Configure team access and permissions

This setup provides a clean foundation for VostraCode development while maintaining upstream compatibility.