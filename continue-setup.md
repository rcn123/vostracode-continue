# VostraCode-Continue Repository Setup Guide

## Overview

This guide documents the setup for maintaining a private fork of Continue.dev with the ability to pull updates from upstream while maintaining your custom modifications.

## Current Setup Status

✅ **Completed:**
- Continue.dev repository cloned
- Remote renamed from `origin` to `upstream`
- Repository points to upstream: https://github.com/continuedev/continue.git

## Next Steps

### 1. Create Your Private Repository

Create a new private repository on GitHub for your Continue.dev fork:

```bash
# Using GitHub CLI (if installed)
gh repo create YourOrg/vostracode-continue --private --description "VostraCode Continue - Private fork of Continue.dev"

# Or create manually on GitHub.com
# Go to: https://github.com/new
# Name: vostracode-continue
# Visibility: Private
```

### 2. Add Your Private Repository as Origin

After creating your private repository, add it as the origin remote:

```bash
# Replace with your actual repository URL
git remote add origin git@github.com:YourOrg/vostracode-continue.git

# Or if using HTTPS
git remote add origin https://github.com/YourOrg/vostracode-continue.git

# Verify remotes are configured correctly
git remote -v
# Should show:
# origin    git@github.com:YourOrg/vostracode-continue.git (fetch)
# origin    git@github.com:YourOrg/vostracode-continue.git (push)
# upstream  https://github.com/continuedev/continue.git (fetch)
# upstream  https://github.com/continuedev/continue.git (push)
```

### 3. Push to Your Private Repository

```bash
# Push the main branch to your private repository
git push -u origin main

# Push all branches if needed
git push origin --all

# Push all tags
git push origin --tags
```

## Working with the Repository

### Development Workflow

```bash
# Always work on feature branches
git checkout -b feature/your-feature-name

# Make your changes
# ...

# Commit your changes
git add .
git commit -m "feat: your feature description"

# Push to your private repository
git push origin feature/your-feature-name
```

### Pulling Updates from Upstream

Regularly sync with the upstream Continue.dev repository:

```bash
# Fetch latest changes from upstream
git fetch upstream

# Check what's new
git log --oneline main..upstream/main

# Merge upstream changes into your main branch
git checkout main
git merge upstream/main

# Push updated main to your private repository
git push origin main
```

### Handling Merge Conflicts

If you encounter conflicts when merging upstream:

```bash
# After merge conflict occurs
# Edit conflicted files to resolve conflicts
# Look for <<<<<<< HEAD markers

# After resolving conflicts
git add .
git commit -m "Merge upstream changes from Continue.dev"
git push origin main
```

## Creating a Rebranding Strategy (Optional)

If you want to rebrand Continue.dev similar to the VostraCode approach:

### 1. Create Patches Directory

```bash
mkdir -p patches
```

### 2. Create Branding Branch

```bash
# Create a branch for your customizations
git checkout -b vostra-branding

# Make your branding changes
# Edit files as needed...

# Commit changes organized by component
git add .
git commit -m "rebrand: Initial VostraCode-Continue branding"
```

### 3. Generate Patches

```bash
# Switch back to main
git checkout main

# Generate patches from branding commits
git format-patch main..vostra-branding -o patches/

# Add patches to version control
git add patches/
git commit -m "Add VostraCode-Continue branding patches"
git push origin main
```

### 4. Apply Patches for Releases

```bash
# Create release branch
git checkout -b release-v1.0.0

# Apply patches
git apply patches/*.patch

# Build and deploy from this branch
```

## Repository Structure

```
vostracode-continue/
├── .git/              # Git repository data
├── cc/                # Your documentation folder
│   ├── patch-workflow.md
│   └── repository-setup.md
├── patches/           # (Optional) Branding patches
├── continue-setup.md  # This file
└── [Continue.dev source files]
```

## Quick Command Reference

```bash
# Check remotes
git remote -v

# Fetch from upstream
git fetch upstream

# Merge upstream changes
git checkout main
git merge upstream/main

# Push to private repo
git push origin main

# Create feature branch
git checkout -b feature/new-feature

# Apply patches (if using patch workflow)
git apply patches/*.patch
```

## Team Collaboration

For team members to clone your private repository:

```bash
# Clone the private repository
git clone git@github.com:YourOrg/vostracode-continue.git
cd vostracode-continue

# Add upstream remote
git remote add upstream https://github.com/continuedev/continue.git

# Verify setup
git remote -v
```

## Security Notes

- Keep your private repository access restricted to authorized team members
- Never commit API keys, tokens, or sensitive configuration
- Review upstream changes before merging for security implications
- Use environment variables for sensitive configuration

## Troubleshooting

### Permission Denied When Pushing

```bash
# Check SSH key is added to GitHub
ssh -T git@github.com

# Or switch to HTTPS with token
git remote set-url origin https://YOUR_TOKEN@github.com/YourOrg/vostracode-continue.git
```

### Upstream Changes Break Your Code

```bash
# Create a branch to test upstream changes
git checkout -b test-upstream
git merge upstream/main

# If issues occur, you can reset
git checkout main
git branch -D test-upstream
```

## Next Actions Required

1. **Create your private GitHub repository**
2. **Add it as origin remote using the commands above**
3. **Push the code to your private repository**
4. **Set up any CI/CD pipelines you need**
5. **Configure team access and permissions**

Once you've created your private repository, run these commands:

```bash
# Add your private repo as origin (replace with your actual URL)
git remote add origin git@github.com:YourOrg/vostracode-continue.git

# Push to your private repository
git push -u origin main
```