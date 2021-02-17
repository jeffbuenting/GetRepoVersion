# GetRepoVersion
Github Action to retrieve the repos version

---

![Version](https://img.shields.io/badge/Version-1.0.0-brightgreen)

---

This action retrieves a gitub repo version either from a PowerShell module manifest file, a package.json javascript file, or from a readme.md version badge.


### Inputs

- `vertype`: File type from where the version was optained.
- `version`: New version to update.

### Example

```yaml
  - name: GetRepoVersion
        if: success()
        id: GetRepoVer
        uses: ./
```

You can reference the output using the github environment variable ( using the code above )

```yaml
  steps.GetRepoVer.outputs.version
```

