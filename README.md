# WebApp UI test automation

## 📝 Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
  - [System requirements](#system_requirements)
  - [General prerequisites](#general_prerequisites)
  - [Setup](#setup)
- [Usage](#usage)
  - [Development flow](#development_flow)
  - [CLI_flags](#cli_flags)
  - [GH Actions debug](#gh_actions_debug)
- [Useful VS Code extensions](#vs_code_extensions)

## About <a id="about"></a>
This repository contains the code of end-to-end tests, written in  Cypress framework (https://docs.cypress.io/guides/getting-started/writing-your-first-test). Main pattern used for this project - is Page Object. We describe elements of pages and the way they can behave (*pages* folder). We describe actions, which we use to interact with pages (*actions* folder). And describe test specs (*integration* folder) - things/flows we want to test and verify on our pages, using actions to put the app in a required state.

There are several main folders of these project:

* .github - contains GitHub actions workflows files
* cypress - base folder, that contains the following:
  * actions - contains classes with methods which describe the interaction with pages. Contains subfolders, named by application's tabs.
  * fixtures - contains test data, named by test spec names. Data is stored in js files for convenient exporting and autocompletion.
  * integration - contains test specs
  * pages - contains classes, which describe what elements different pages have and how pages can behave. Contains subfolders, named by application's tabs. Also contains manager files for each folder, that accumulates files of folder to one manager file to prevent big amount of imports in specs.
  * plugins - contains **index.js** file, that can be used to tap into plugins, modify, or extend the internal behavior of Cypress.
  * support - contains three files:
    * **commands.js** - contains custom cypress commands.
    * **index.d.ts** - contains types definitions for custom cypress commands.
    * **index.js** - used for enabling additional modules for cypress
* utils - folder for helper functions. Contains useful functions validating format of data, working with uploading fixtures, acquiring baseUrl for current environment of test run.

## Getting started <a id="getting_started"></a>

### System requirements <a id="system_requirements"></a>
- (Windows users) [WSL2](https://docs.microsoft.com/en-us/windows/wsl/install) (Windows Subsystem for Linux). We use *Ubuntu 20.04* and you need to [use version 2 of WSL](https://docs.microsoft.com/en-us/windows/wsl/install#upgrade-version-from-wsl-1-to-wsl-2).
- Docker. Get it for your system from [here](https://docs.docker.com/get-docker/).If you use Windows - please, [use WSL 2 based engine](https://docs.docker.com/desktop/windows/wsl/) for Docker.

### General prerequisites <a id="general_prerequisites"></a>
1. Install `nvm`([macOS/Linux](https://github.com/nvm-sh/nvm), [Windows](https://github.com/coreybutler/nvm-windows)).
2. Install lts node version. Run `nvm install lts`.
3. Run `nvm use lts` to use it.

### Setup <a id="setup"></a>
1. Clone repo
2. Install packages. Run `npm i`
3. Add `cypress.env.json` file to the root of project with following format:
```json
{
  "USERNAME": "value", 
  "PASSWORD": "value"
}
```

## Usage <a id="usage"></a>

General way to run all cypress tests to run `npx cypress run` command. This command will run all existing test spec headless in electron browser at staging environment, using Api login method by default. General way to open cypress GUI is to run `npx cypress open` command.

`package.json` file in `"scripts":` property contains ready to use commands for some mostly used cases. For example `npm run cy:open` command will open cypress GUI, `npm run cy:chrome_headed_prod_api` will run all tests in chrome headed browser at production environment, using Api login method etc.

### Development flow <a id="development_flow"></a>

We don't have strict rules for our development flow. Everything is pretty standard: 
  1. You branching from master (**always push empty branch after its creation, it will be a signal that you at least started work on a ticket**)
  2. If you develop test / framework feature - name branch in next notation **feature/your_name/jira_ticket_id** (for example, feature/Ernst/QA-666)
  - If you developing hotfix -> **hotfix/your_name/ticket_name_OR_hotfix_name**
  3. Assign Ernst and Vlad as a reviewers (for now, later review can do anyone else). **Get all approvals.** (for the start, it is important for us to check all new code since we want to follow already declared codestyle rules and structure). 
  4. If you want to add improvements into someone's PR - branch from feature branch, make changes and create to PR into parents branch (naming: **feature/your_name/ticket_id__pr_changes**). *You can commit into someones branch*, **but you are allowed to do that in exceptional cases** (for example, PR almost merged and you need to run and apply ESLint changes) 
  5. When you got approvals - merge branch by yourself or ping someone who was a reviewer.

  **NOTE**: 
  - **please, while developing anything** - run `npm run tsc:watch` command in separate terminal instance (or split terminal into two). This will make TypeScript compilier keep an eye on your files changes and alert you when you forget, for example, update methods names after merge.
  - please, when writing commit message - add something meaningful, rather than "added some code". Good commit message: "[QA-something] added new actions into module_name" / "[misc] linter fixes". Bad commit message: "upd" / "fix" 
  - (ernst): I do not force to use small commits instead of big ones, but when commit something - think what you would do with the big one if you have to revert / reset or cherry-pick it. 
     

### CLI flags <a id="cli_flags"></a>

About cypress command line and it's general flags can be read [here](https://docs.cypress.io/guides/guides/command-line).

Project's specific environment variables for `--env` flag:
1. `url=` - accepts values `dev`,`prod` or `staging` for development, production or staging environment. Example of usage: `npx cypress run --env url=prod` will run tests at production environment. If this variable was not passed, uses `staging` by default.
2. `loginMethod=` - accepts values `ui` or `api` for login by UI or Api. Example of usage: `npx cypress run --env loginMethod=ui` will launch tests with login by UI. If this variable was not passed, uses `api` by default.
Example of combining previous variables: `npx cypress run --env url=dev,loginMethod=ui` will launch tests at development environment with login by UI.
3. `customEnv=` - accepts url to specific branch environment. Example of usage: `npx cypress run --env customEnv=https://someUrl/to/env` will launch tests at this environment.

### GH Actions debug <a id="gh_actions_debug"></a>

If your task will be connected with GH Actions changes or you would like to check how your newly implemnted test can behave in GH Actions - you should use [act](https://github.com/nektos/act), rather then commit a lot of times into the repo and trigger the real pipeline.

Main flow of how we use act for this repo - described in txt file in [these notes](./.act/install_notes.txt).

## Useful VS Code extensions <a id="vs_code_extensions"></a>

WARN: if you use Prettier - **make sure to disable it**, since it has conflicts with ESLint.

List of useful extensions:
  - ESLint
  - GitGraph
  - LiveShare
  - GitLens
  - GitHub Pull Requests
  - Jira and Bitbucket (you will use only Jira integration)
