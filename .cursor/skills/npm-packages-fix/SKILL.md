---
name: npm-packages-fix
disable-model-invocation: true
description: >-
  Fixes or validates a Dependabot branch: refresh the local repo, checkout the
  branch, install dependencies, run build/lint/tests and fix issues, commit
  (GPG signed) and push, then switch back to main and delete the local branch.
  Use when fixing or validating a Dependabot branch (e.g. "fix dependabot",
  "npm packages fix", "validate dependabot branch").
---

# NPM Packages Fix

Read and follow `.cursor/skills/local-repository-update/SKILL.md` first.

Execute the following steps.

1. **Checkout the dependabot branch**
   Ask the user which dependabot branch should be checked out, then checkout that branch.

2. **Install dependencies**
   Run `npm install` to install the updated dependencies.

3. **Run checks and fix issues**
   Read `./.github/workflows/__call__checks.yaml` and run equivalent local validation. Fix any issues that arise:
   - Build the project
   - Lint check
   - Unit tests

4. **Commit and push changes**
   Commit the changes and push to the remote branch.

5. **Switch back to main and clean up**
   Switch back to the main branch and delete the local dependabot branch.

## Git constraints

Run git commands outside the sandbox (see `.cursor/rules/git-guidelines.mdc`). All commits must be GPG-signed; never use `--no-gpg-sign`. If signing is not possible in the current environment, stop and give the user exact commands to run locally.

## NPM constraints

Follow `.cursor/rules/npm-guidelines.mdc` for installs and lockfile conflict resolution.
