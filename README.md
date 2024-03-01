# Action Get Merged Pull Request

[![license][license-badge]][license]

This is a GitHub Action to get the pull request merged with the base branch.

This action supports `push` events with the base branch (e.g., `main`).

It would be more useful to use this with other GitHub Actions' outputs.

## Inputs

| NAME           | DESCRIPTION         | TYPE     | REQUIRED | DEFAULT               |
|----------------|---------------------|----------|----------|-----------------------|
| `github_token` | A GitHub token.     | `string` | `true`   | `N/A`                 |
| `commit_sha`   | Targeted commit sha | `string` | `false`  | `triggered commit id` |

## Outputs

| NAME          | DESCRIPTION                                                                                            | TYPE     |
|---------------|--------------------------------------------------------------------------------------------------------|----------|
| `title`       | The title of the pull request.                                                                         | `string` |
| `body`        | The body of the pull request.                                                                          | `string` |
| `number`      | The number of the pull request.                                                                        | `number` |
| `labels`      | The list of labels for the pull request. Separated with line breaks if there're multiple labels.       | `string` |
| `assignees`   | The list of assignees for the pull request. Separated with line breaks if there're multiple assignees. | `string` |
| `base_branch` | The base branch of pull request                                                                        | `string` | 
| `head_branch` | The head branch of pull request                                                                        | `string` | 

## License

Copyright 2020 The Actions Ecosystem Authors.

Action Get Merged Pull Request is released under the [Apache License 2.0](./LICENSE).

<!-- badge links -->

[license]: LICENSE

[license-badge]: https://img.shields.io/github/license/actions-ecosystem/action-get-merged-pull-request?style=for-the-badge
