# Dashboard

<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=for-the-badge)](#contributors)
<!-- ALL-CONTRIBUTORS-BADGE:END -->
<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

[![GitHub Workflow Status - Lint](https://img.shields.io/github/workflow/status/DylanGore-FYP/Dashboard/Lint%20Code?label=Lint&logo=github&style=for-the-badge)](https://github.com/DylanGore-FYP/Dashboard/actions/workflows/lint-code.yml)
[![GitHub Workflow Status - Build](https://img.shields.io/github/workflow/status/DylanGore-FYP/Dashboard/build?label=Docker%20Build&logo=github&style=for-the-badge)](https://github.com/DylanGore-FYP/Dashboard/actions/workflows/build-docker.yml)

A Vue.js web app (built using Vite) designed to interact with the vehicles API to display data. Firebase is used for authentication.

## Requirments

- Node JS v14+

## Configuration

Firebase credentials required for this software to run. Please see the [documentation](https://dylangore-fyp.github.io/Documentation/setup/external-firebase-authentication/) for details. Other than that please create a `.env` file based on the example found in this repository. If you would like to run this app in Docker, please see the `docker-compose.yml` file for an example.

## Running

Install the dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Run the production server:

```bash
npm run serve
```

Build for production:

```bash
npm run build
```

## Commit Message Convention

This project uses [Gitmoji](https://gitmoji.dev/) for commit organisation. For more details see the [Gitmoji Repository](https://github.com/carloscuesta/gitmoji).

## Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/DylanGore"><img src="https://avatars.githubusercontent.com/u/2760449?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Dylan Gore</b></sub></a><br /><a href="https://github.com/DylanGore-FYP/Car/commits?author=DylanGore" title="Code">💻</a> <a href="https://github.com/DylanGore-FYP/Car/commits?author=DylanGore" title="Documentation">📖</a> <a href="#ideas-DylanGore" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://github.com/mohittaneja7"><img src="https://avatars.githubusercontent.com/u/4126813?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Mohit Taneja</b></sub></a><br /><a href="#ideas-mohittaneja7" title="Ideas, Planning, & Feedback">🤔</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification.
