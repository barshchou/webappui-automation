# WebApp UI test automation

## 📝 Table of Contents

- [Quick summary](#tl_dr)
- [About](#about)
- [Getting Started](#getting_started)
  - [System requirements](#system_requirements)
  - [General prerequisites](#general_prerequisites)
  - [Setup](#setup)
- [Contributing](#contributing)
  - [Development flow](#development_flow)
  - [Complex TODO]
  - [GH Actions debug](#gh_actions_debug)
  - [Validation of export](#export_validation)
- [Usage](#usage)
  - [CLI_flags](#cli_flags)
  - [Tags and tagged test run](#tagged_run)
  - [Run tests on PR deploy / localhost](#run_tests_in_custom_env)
  - [Triggering GH Actions pipeline](#trigger_gh_actions)
  - [Exploring test results](#explore_test_results)
- [NPM Scripts](#npm_scripts)
- [Useful VS Code extensions](#vs_code_extensions)

## Quick summary <a id="tl_dr"></a>
- If you want to use/develop tests from your machine - make sure everything is ready from "[Getting Started](#getting_started)".
- If you would like to figure out how to use these tests in your developement flow - go to "[Run tests on PR deploy / localhost](#run_tests_in_custom_env)" section. 
- If you need to run specific test spec or set of tests related to specific domain - go to "[Tags and tagged test run](#tagged_run)" section. 
-  If you need to use GH Actions pipeline with these tests - go to [Triggering GH Actions pipeline](#trigger_gh_actions).
- If you need to check test results from triggered GH Actions pipeline or just see the stats / insights for end-to-end tests - go to "[Exploring test results](#explore_test_results)" section 
## About <a id="about"></a>
This repository contains the code of end-to-end tests, written in  [Cypress framework](https://docs.cypress.io/guides/getting-started/writing-your-first-test). Main pattern used for this project - is [Page Object](https://martinfowler.com/bliki/PageObject.html). We describe elements of pages and the way they can behave (*./cypress/pages* folder). We describe actions, which we use to interact with pages (*./cypress/actions* folder). And describe test specs (*./cypress/integration* folder) - things/flows we want to test and verify on our pages, using actions to put the app in a required state.

There are several main folders of these project:

* *.github* - contains GitHub actions workflows files and PR template
* *cypress* - base folder, that contains the following:
  * *actions* - contains classes with methods which describe the interaction with pages. Contains subfolders, named by application's tabs. All action are separated in their own "domains" with `index.ts` as an entrypoint.
  * *api* - contains specific logic for interactions with different APIs (WebApp, LaunchDarkly, (TBA) SalesForce)
  * *enums* - contains some static data objects, which describes different parts of applications. Separated by different domains and app's flows. Needs to refactored for proper management and extensions (just look at `enums.ts` and `enumKeys.enum.d.ts`)  
  * *fixtures* - contains test data, named by test spec names. Data is stored in `ts` files for convenient exporting and autocompletion.
  * *integration* - contains test specs.
  * *pages* - contains classes, which describe what elements different pages have and how pages can behave. Contains subfolders, named by application's tabs. Also contains manager files for each folder, that accumulates files of folder to one manager file to prevent big amount of imports in specs.
  * *snapshots* - contains artifacts from [snapshot testing](https://github.com/jaredpalmer/cypress-image-snapshot)
  * *support* - contains several files:
    * `e2e.ts` - [Cypress's support file](https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests#Support-file). Contains type definitions of custom Cypress commands, "hacks" for testing (custom error handling and DOM snapshot recording), plugins imports, global hooks and event bindings.
    * `commands.ts` - contains implementations of [custom Cypress commands](https://docs.cypress.io/api/cypress-api/custom-commands), some plugin configurations and explicit custom commands (such as `_mutateArrayInMap` or `_saveDataInFile`)   
* *types* - contains type definitions for this project. We're trying to stick to single-responsibility principle by not putting all the types into one `index.ts` file, but they still need to refactored.  
* *utils* - folder for helper functions. Contains useful functions validating format of data, working with uploading fixtures, acquiring baseUrl for current environment of test run. P.s. Don't pay attention to `index.ts` there, this will be refactored soon.

## Getting started <a id="getting_started"></a>

### System requirements <a id="system_requirements"></a>
- (Windows users) [WSL2](https://docs.microsoft.com/en-us/windows/wsl/install) (Windows Subsystem for Linux). We use *Ubuntu 20.04* and you need to [use version 2 of WSL](https://docs.microsoft.com/en-us/windows/wsl/install#upgrade-version-from-wsl-1-to-wsl-2).
- Docker. Get it for your system from [here](https://docs.docker.com/get-docker/).If you use Windows - please, [use WSL 2 based engine](https://docs.docker.com/desktop/windows/wsl/) for Docker.

### General prerequisites <a id="general_prerequisites"></a>
1. Install `nvm`([macOS/Linux](https://github.com/nvm-sh/nvm), [Windows](https://github.com/coreybutler/nvm-windows)).
2. **WARN: please, use lts version of node 16. , currently (05.05.22) - lts/gallium*** Install lts node version. Run `nvm install lts`.
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
## Contributing <a id="contributing"></a>
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
  - (ernst): I do not force to use small commits instead of big ones, but when commit something - think what you would do with the big one if you have to revert / reset or cherry-pick it.### GH Actions debug <a id="gh_actions_debug"></a>

If your task will be connected with GH Actions changes or you would like to check how your newly implemnted test can behave in GH Actions - you should use [act](https://github.com/nektos/act), rather then commit a lot of times into the repo and trigger the real pipeline.

Main flow of how we use act for this repo - described in txt file in [these notes](./.act/install_notes.txt).

### Validation of export <a id="export_validation"></a>

Since we have a lot of test cases which has validation of Report Export (it will `*.docx` file) - we had to find the way we could automate these checks somehow. 

We found a way we can somehow automate it - **we convert `docx` file into html and then open it in Cypress**. 

You can refer to [QA-4053 spec](./cypress/integration/not_full_reports/sales/value_conclusion/QA-4053.spec.ts) to see the code of such tests.

**Flow for ReportExport checks**

1. (1st `it` in `describe`) Your test creates report.
2. (1st `it` in `describe`) Your test downloads report. Report has `job_id.docx` name and stored in `cypress/download`. Inside method `downloadAndConvertDocxReport()` we call several tasks (code which executes in nodejs): wait until file showed up in filesystem -> we convert docx into html -> we rename docx file from `job_id.docx` to `QA-test_case_number.docx` -> we rename html file from `job_id.html` to `QA-test_case_number.html`
3. (2nd `it` in `describe`) Your test opens generated html report in Cypress (Cypress *can't* (well, until [release 9.6.0](https://github.com/cypress-io/cypress/releases/tag/v9.6.0)) [visit other origin url](https://docs.cypress.io/guides/guides/web-security#Same-superdomain-per-test))
4. (2nd `it` in `describe`) Your test makes traverse and assert on generated html report. 

## Usage <a id="usage"></a>

General way to run all cypress tests to run `npx cypress run` command. This command will run all existing test spec headless in electron browser at staging environment, using Api login method by default. General way to open cypress GUI is to run `npx cypress open` command.

`package.json` file in `"scripts":` property contains ready to use commands for some mostly used cases. For example `npm run cy:open` command will open cypress GUI, `npm run cy:chrome_headed_prod_api` will run all tests in chrome headed browser at production environment, using Api login method etc.  

### CLI flags <a id="cli_flags"></a>

About cypress command line and it's general flags can be read [here](https://docs.cypress.io/guides/guides/command-line). This section will describe how to work with [custom env variables](https://docs.cypress.io/guides/guides/command-line#cypress-run-env-lt-env-gt) related to the Cypress.

Project's specific environment variables for `--env` flag:
1. `url=` - accepts values `dev`,`prod` or `staging` for development, production or staging environment. Example of usage:
```shell
npx cypress run --env url=prod
```
or
```shell
npm run 
```
will run tests at production environment. If this variable was not passed, uses `staging` by default.
2. `loginMethod=` - accepts values `ui` or `api` for login by UI or Api. Example of usage: `npx cypress run --env loginMethod=ui` will launch tests with login by UI. If this variable was not passed, uses `api` by default.
Example of combining previous variables: `npx cypress run --env url=dev,loginMethod=ui` will launch tests at development environment with login by UI.
3. `customEnv=` - accepts url to specific branch environment. Example of usage: `npx cypress run --env customEnv=https://someUrl/to/env` will launch tests at this environment. 

### Tags and tagged test run <a id="tagged_run"></a>

Sometimes there could be a case when we need to run 

### PR deploy / localhost test run (or any custom env) <a id="run_tests_in_custom_env"></a>

Sometimes there could be a case when we need to run 

### Triggering GH Actions pipeline <a id="trigger_gh_actions"></a>

SomethingSomethingSomethingSomethingSomethingSomethingSomething

### Exploring test results <a id="explore_test_results"></a>

SomethingSomethingSomethingSomethingSomethingSomethingSomething

## NPM Scripts <a id="npm_scripts"></a>

| Script         | Description                                                                                                                                                                       |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| act:debug            | Runs [act cli](https://github.com/nektos/act) for local GithubAction workflow (you can check install_notes in `.act` dir for more).                                                                                                                                          |
| cy:open      | Opens [Cypress GUI](https://docs.cypress.io/guides/getting-started/installing-cypress#Opening-Cypress)                                                     |
| cy:chrome:snapshot_tests       | Runs [snapshot tests](https://github.com/jaredpalmer/cypress-image-snapshot#cypress-image-snapshot) in headless Chrome                                                        |
| cy:chrome:update_snapshots    | Updates [snapshot tests](https://github.com/jaredpalmer/cypress-image-snapshot#updating-snapshots) in headless Chrome                                 |
| cy:chrome_headed_stage_api     | Runs tests in a headed-mode on staging env (default env for test runs) in Chrome |
| cy:chrome_headed_dev_api          | Runs tests in a headed-mode on dev env in Chrome                                                                                                                                                       |
| cy:chrome_stage_api          | Runs tests in a headless mode on staging env in Chrome                                                                                                                                                                    |
| cy:chrome_prod_api        | Runs tests in a headless mode on prod env in Chrome                                                                                                                            |
| cy:full_prod_api   | Runs [full-report spec](cypress/integration/full_reportsfullBoweryMultifamilyAsComplete.spec.ts) on prod env in Electron browser (default browser for Cypress). **NOTE: DO NOT RUN THIS SPEC FOR NOW SINCE ITS UNSTABLE AND TAKES 40-50 MINUTES TO RUN**                                                                                                                     |
| cy:full_chrome_headed_prod_api         | Runs all tests in a dir `cypress/integration/not_full_reports` on prod env in headed Chrome                                                                                                               |
| cy:not_full_chrome_headed | Runs all tests in a dir `cypress/integration/not_full_reports` on staging env in headed Chrome                                                                                                                            |
| tsc:check | Runs TypeScript compilier with `--noEmit` flag to check whether errors in codebase                                                                                                                            |
| tsc:watch | Runs TypeScript compilier in watch mode. Can be useful for local development                                                                                                                            |
| lint:run | Runs ESlint to check codebase                                                                                                                            |
| lint:fix | Runs ESlint to fix auto-fixable issues. **NOTE: Please, use this only after development to have separate commit for linter changes**                                                                                                                            |

## Useful VS Code extensions <a id="vs_code_extensions"></a>

WARN: if you use Prettier - **make sure to disable it**, since it has conflicts with ESLint.

List of useful extensions:
  - ESLint
  - GitGraph
  - LiveShare
  - GitLens
  - GitHub Pull Requests
  - Jira and Bitbucket (you will use only Jira integration)
