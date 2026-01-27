# Angular Webapp Template

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.7.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Run this project locally

To create container image, use the following command.

```shell
docker build -t angular-webapp-template .
```

To start the container, use the following command.

```shell
docker run -d -p 8000:80 --name angular-webapp-template angular-webapp-template
```

Alternatively you can use docker-compose as well.

```shell
docker-compose up -d
```

When you are done with local development inspection, you can stop the container.

```shell
docker-compose down
```

- **Auto-merge Dependabot PRs** - Automatically merges Dependabot pull requests when all checks pass
  - Intelligent mergeable status checking with retry logic
  - Validates PR author and workflow completion before merging
  - Prevents infinite loops with maximum retry attempts

- **Pull Request Checks** - Automated validation workflow that runs on pull requests to main branch

- **Dependabot Configuration** - Automated dependency updates for GitHub Actions

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

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details on how to contribute to this project.

## License

This template is part of the StarForge Universe project.

## Support

For issues, questions, or contributions, please open an issue or contact the code owners.
