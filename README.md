# DevOps Template

A project skeleton repository focusing on DevOps template elements implemented in GitHub Workflows. This repository provides reusable workflows and automation tools for DevOps practices, including standardized CI/CD workflows, automated dependency management, and pull request automation.

## Overview

This repository serves as a project skeleton containing DevOps template elements implemented as GitHub Actions workflows. It is designed to be reused as a base for new projects **while preserving git history**, allowing template updates to be merged and adopted later. The repository includes reusable GitHub Actions workflows, automated dependency updates via Dependabot, and automated merge workflows for dependency updates.

## Features

### 🔄 Reusable Workflows

The template provides modular, reusable GitHub Actions workflows that can be called from your project workflows:

- **`__call__build.yaml`** - Build workflow submodule for compiling and building projects
- **`__call__checks.yaml`** - Testing and validation workflow submodule
- **`__call__publish.yaml`** - Publishing workflow submodule for artifact distribution
- **`__call__release.yaml`** - Release workflow submodule for version management

### 🤖 Automation

- **Auto-merge Dependabot PRs** - Automatically merges Dependabot pull requests when all checks pass
  - Intelligent mergeable status checking with retry logic
  - Validates PR author and workflow completion before merging
  - Prevents infinite loops with maximum retry attempts

- **Pull Request Checks** - Automated validation workflow that runs on pull requests to main branch

- **Dependabot Configuration** - Automated dependency updates for GitHub Actions

## Repository Structure

```
.
├── .github/
│   ├── workflows/
│   │   ├── __call__build.yaml      # Reusable build workflow
│   │   ├── __call__checks.yaml     # Reusable checks workflow
│   │   ├── __call__publish.yaml    # Reusable publish workflow
│   │   ├── __call__release.yaml    # Reusable release workflow
│   │   ├── auto-merge.yaml         # Auto-merge Dependabot PRs
│   │   ├── pull-request-check.yaml # PR validation workflow
│   │   ├── publish.yaml            # Publish workflow
│   │   └── release.yaml            # Release workflow
│   ├── CODEOWNERS                  # Code ownership configuration
│   ├── dependabot.yaml            # Dependabot configuration
│   └── merge-instructions.md       # Template merging guidelines
└── README.md                       # This file
```

## Usage

### Using This Template

**Important**: This repository is designed to be reused **while keeping git history**. This allows template updates to be merged and adopted later, maintaining a connection to the original template repository.

1. **Clone the Repository**: Clone this repository to preserve the complete git history:
   ```bash
   git clone <template-repository-url> <your-project-name>
   cd <your-project-name>
   ```

2. **Set Up Your Remote**: Change the remote origin to point to your new repository:
   ```bash
   git remote set-url origin <your-new-repository-url>
   ```

3. **Add Template Remote**: Add the template repository as a remote source to enable merging updates:
   ```bash
   git remote add template <template-repository-url>
   git fetch template
   ```

4. **Merge Template Updates**: When you want to adopt the latest template changes, follow the [Template Merging Process](.github/merge-instructions.md) to merge updates from the template remote while preserving your project-specific changes.

5. **Customize Workflows**: Adapt the reusable workflows (`__call__*.yaml`) to match your project's specific build, test, and deployment requirements while maintaining compatibility with template updates.

**Note**: Cloning preserves the complete git history, enabling you to merge template updates later. Avoid using GitHub's "Use this template" button, as it creates a new repository without preserving commit history.

### Workflow Integration

To use the reusable workflows in your project, reference them in your workflow files:

```yaml
jobs:
  build:
    uses: ./.github/workflows/__call__build.yaml
  
  checks:
    uses: ./.github/workflows/__call__checks.yaml
```

## Auto-Merge Workflow

The auto-merge workflow automatically merges Dependabot pull requests when:

- All checks have passed successfully
- The PR is from `dependabot[bot]`
- The PR is mergeable (with intelligent retry logic)

The workflow includes:
- **Smart Retry Logic**: Waits up to 60 seconds (12 attempts × 5 seconds) for GitHub to calculate mergeability
- **Early Exit**: Stops checking as soon as mergeable status is determined
- **Error Handling**: Provides detailed error messages if mergeability cannot be determined

## Template Merging Process

This repository is designed to maintain git history, allowing template updates to be merged and adopted. When updating your repository with template changes:

1. Update your local main branch
2. Fetch all remotes (including the template remote)
3. Create a feature branch for the template update
4. Merge changes from the template remote's main branch into your feature branch
5. Resolve conflicts according to the guidelines:
   - Keep your project-specific dependencies but adopt version numbers from the template
   - Preserve your project-specific customizations
   - Ask for help when unsure about conflict resolution
6. Run checks locally using `./.github/workflows/__call__checks.yaml`
7. Push the feature branch and open a pull request
8. After merge, switch back to main and clean up the feature branch

This process ensures that template improvements can be continuously adopted while preserving your project's git history and customizations.

See [merge-instructions.md](.github/merge-instructions.md) for detailed steps.

## Dependabot

Dependabot is configured to:
- Check for GitHub Actions updates daily
- Automatically create pull requests for updates
- Auto-merge PRs when checks pass (via auto-merge workflow)

## Code Ownership

Code ownership is managed via `.github/CODEOWNERS`. All changes require approval from the code owners before merging.

## Contributing

This is a project skeleton repository focusing on DevOps template elements. To contribute improvements:

1. Create a feature branch
2. Make your changes
3. Ensure all checks pass
4. Open a pull request
5. Wait for code owner approval

**Note**: When using this repository as a base for your project, maintain the git history by **cloning** the repository rather than using GitHub's "Use this template" feature or creating a fresh repository. Cloning preserves all commit history, enabling continuous adoption of template updates through git merge operations.

## License

This template is part of the StarForge Universe project.

## Support

For issues, questions, or contributions, please open an issue or contact the code owners.
