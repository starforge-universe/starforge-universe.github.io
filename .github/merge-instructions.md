# Template Merging Process

Follow these steps to merge updates from the template remote into your repository. Steps must be executed one after another separately.

1. **Update your local main branch**
   ```sh
   git checkout main
   git pull origin main
   ```

2. **Fetch all remotes**
   ```sh
   git fetch --all
   ```

3. **Create a feature branch for the template update**
   ```sh
   git checkout -b feature/template-update
   ```

4. **Merge changes from the template remote's main branch**
   ```sh
   git merge template/main -m "Merge updates from template"
   ```

5. **Resolve Merge Conflicts**
   - **Conflict Resolution Policy:**
     - **Fast forwards:** Accept them as-is.
     - **Conflicting changes:** Accept changes from `origin` (your project) over the template.
       - If a dependency or code was intentionally removed in the project but exists in the template, do not re-add it from the template.
     - **If there were changes in the template:** Review project library dependencies and, if the template has a higher version for a dependency that still exists in the project, use the higher version from the template.

6. **Test and validate the merge**
    - Execute all checks defined in `./.github/workflows/__call__checks.yaml` to ensure nothing is broken.

7. **Commit the merge changes if there are any**
   ```sh
   git add .
   git commit -m "Resolved merge conflicts and updated dependencies"
   ```

8. **Push the feature branch and open a pull request**
   ```sh
   git push origin feature/template-update
   ```

9. **Switch back to main and clean up the feature branch locally**
   ```sh
   git checkout main
   git branch -D feature/template-update
   ```
