# WebApp UI test automation

## 📝 Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
  - [General prerequisites](#general_prerequisites)
  - [Setup](#setup)
- [Usage](#usage)
  - [CLI_flags](#cli_flags)
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

### CLI flags <a id="cli_flags"></a>

About cypress command line and it's general flags can be read [here](https://docs.cypress.io/guides/guides/command-line).

Project's specific environment variables for `--env` flag:
1. `url=` - accepts values `dev`,`prod` or `staging` for development, production or staging environment. Example of usage: `npx cypress run --env url=prod` will run tests at production environment. If this variable was not passed, uses `staging` by default.
2. `loginMethod=` - accepts values `ui` or `api` for login by UI or Api. Example of usage: `npx cypress run --env loginMethod=ui` will launch tests with login by UI. If this variable was not passed, uses `api` by default.
Example of combining previous variables: `npx cypress run --env url=dev,loginMethod=ui` will launch tests at development environment with login by UI.
3. `customEnv=` - accepts url to specific branch environment. Example of usage: `npx cypress run --env customEnv=https://someUrl/to/env` will launch tests at this environment.
