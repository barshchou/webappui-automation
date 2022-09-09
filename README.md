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
  - [Comp-plex end-to-end tests development](#compplex-e2e-flow)
  - [Secrets update](#secrets-update)
  - [GH Actions debug](#gh_actions_debug)
  - [Validation of export](#export_validation)
- [Usage](#usage)
  - [CLI_flags](#cli_flags)
  - [Tags and tagged test run](#tagged_run)
  - [Run tests on custom env / localhost](#run_tests_in_custom_env)
  - [Triggering GH Actions pipeline](#trigger_gh_actions)
  - [Exploring test results](#explore_test_results)
- [NPM Scripts](#npm_scripts)
- [Useful VS Code extensions](#vs_code_extensions)

## Quick summary <a id="tl_dr"></a>
- If you want to use/develop tests from your machine - make sure everything is ready from "[Getting Started](#getting_started)".
- If you would like to figure out how to use these tests in your developement flow - go to "[Run tests on custom env / localhost](#run_tests_in_custom_env)" section. 
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
  2. If you develop:
  -  task - name branch in next notation `task/your_name/jira_ticket_id` (for example, `task/your_name/QA-666`)
  - story - name branch in next notation `feature/your_name/jira_ticket_id` (for example, `feature/your_name/QA-666`)
  - hotfix -> `hotfix/your_name/ticket_name_OR_hotfix_name`
  
  3. If you are implementing test case with export document verification, then 'it's title HAVE TO contain 'Check export' string in exact this state! And spec name **HAS TO** contain .export. in it's name, for example: `QA-4667.export.spec.ts`   
  
  4. Use the pull request template to create PR, it is NECESSARY to check only 1 environment checkbox to trigger pull_request_check workflow appropriately. If you choose to run your tests on custom env, paste the link to customEnvLink URL section. This will trigger to run tests from your PR to check, if they work. Workflow for PR will run ONLY if you label it with ready_for_review label, it won't run even if you create pull request without this label
  
  5. Assign at least 2 reviewers for your pull request. **Get at least 2 approvals**. 

  6. If you want to add improvements into someone's PR - branch from feature branch, make changes and create to PR into parents branch (naming: feature/your_name/ticket_id__pr_changes). *You can commit into someones branch*, but this is allowed in exceptional cases (for example, PR almost merged and you need to run and apply ESLint changes or make some minor fixes for typos or comments).
  
  7. When you got approvals - merge branch by yourself or ping someone who was a reviewer.

  **NOTE**: 
  - **please, while developing anything** - run `npm run tsc:watch` command in separate terminal instance (or split terminal into two). This will make TypeScript compilier keep an eye on your files changes and alert you when you forget, for example, update methods names after merge.
  - please, when writing commit message - add something meaningful, rather than "added some code". Good commit message: "[QA-something] added new actions into module_name" / "[misc] linter fixes". Bad commit message: "upd" / "fix"
  
  ### Comp-plex end-to-end tests development <a id="compplex-e2e-flow"></a>

TODO: add flow regarding comp-plex development later

### Secrets update <a id="#secrets-update"></a>

Quick recap: please, refer to next page in [Notion](https://www.notion.so/boweryvaluation/AWS-Secret-Manager-db893148e2b34445928f787169791485)

We have tests which requires login as specific user (Lead Appraiser, Appraiser user, Admin and etc), you can find them by `@permissions_roles` tag. 

Or we want store some secret data which is too complex and big to store in GH Actions secrets (any json-like structure).

We could've store these secrets in GH Actions secrets, but in that case we won't have an option to edit them (especially, if we store a pretty big `json`).



  ### GH Actions debug <a id="gh_actions_debug"></a>

If your task will be connected with GH Actions changes or you would like to check how your newly implemnted test can behave in GH Actions - you should use [act](https://github.com/nektos/act), rather then commit a lot of times into the repo and trigger the real pipeline.

Main flow of how we use act for this repo - described in txt file in [these notes](./.act/install_notes.txt).

### Validation of export <a id="export_validation"></a>

1. (1st `it` in `describe`) Your test creates report.
2. (1st `it` in `describe`) Your test downloads report. Report has `job_id.docx` name and stored in `cypress/download`. Inside method `downloadAndConvertDocxReport()` we call several tasks (code which executes in nodejs): wait until file showed up in filesystem -> we convert docx into html -> we rename docx file from `job_id.docx` to `QA-test_case_number.docx` -> we rename html file from `job_id.html` to `QA-test_case_number.html`
3. (2nd `it` in `describe`) **important** Before calling `cy.task("getFilePath")` to get the path of your html report - you will need explicitly change `baseUrl` in `cypress.json` by adding next line:

```ts
Cypress.config().baseUrl = null;
```

This will set baseUrl of `cypress.json` to `null` and reload browser's window, which eventually made possible to navigate to static html page in filesystem. Without it - Cypress will consider relative path of html report as path to web resource (will navigate to `http://baseUrl.com/
cypress/downloads/TestAutoReport-QA-4719 - 462 1st Avenue, Manhattan, NY 10016.docx.html`, for example).

4. (2nd `it` in `describe`) Your test opens generated html report in Cypress (Cypress *can't* (well, until [release 9.6.0](https://github.com/cypress-io/cypress/releases/tag/v9.6.0)) [visit other origin url](https://docs.cypress.io/guides/guides/web-security#Same-superdomain-per-test))
5. (2nd `it` in `describe`) Your test makes traverse and assert on generated html report.  

## Usage <a id="usage"></a>

TLDR: to open Cypress - run `npm run cy:open`. Don't forget to create `cypress.env.json` in root of project fill it with value of `Github/Cypress/webapp-e2e-secrets` secret from AWS Secret Manager. 

For more info: refer to [description of npm script](#npm_scripts)

### CLI flags <a id="cli_flags"></a>

About cypress command line and it's general flags can be read [here](https://docs.cypress.io/guides/guides/command-line). This section will describe how to work with [custom env variables](https://docs.cypress.io/guides/guides/command-line#cypress-run-env-lt-env-gt) related to the Cypress.

Project's specific environment variables for `--env` flag:
1. `url=` - accepts values `dev`,`prod` or `staging` for development, production or staging environment. Example of usage:
```shell
npx cypress run --env url=prod
```
or
```shell
npm run cy:open -- --env url=custom,customUrl='https://playwright.dev'
```
will run tests at production environment. If this variable was not passed, uses `staging` by default.
2. `loginMethod=` - accepts values `ui` or `api` for login by UI or Api. Example of usage: `npx cypress run --env loginMethod=ui` will launch tests with login by UI. If this variable was not passed, uses `api` by default.
Example of combining previous variables: `npx cypress run --env url=dev,loginMethod=ui` will launch tests at development environment with login by UI.
3. `customEnv=` - accepts url to specific branch environment. Example of usage: `npx cypress run --env customEnv=https://someUrl/to/env` will launch tests at this environment. 

### Tags and tagged test run <a id="tagged_run"></a>

Please, refer to next page in [Notion](https://www.notion.so/boweryvaluation/Tags-and-their-usage-6b99bfbe85144ed9aba19c64684062ca)

### Run tests on custom env / localhost <a id="run_tests_in_custom_env"></a>

For dynamic [`baseUrl`](https://docs.cypress.io/guides/references/configuration#e2e) set we use [Cypress env variables](https://docs.cypress.io/guides/guides/environment-variables) 
and access to `config` from [`setupNodeEvents`](https://docs.cypress.io/guides/references/configuration#setupNodeEvents) (yeah, since Cypress 10 released - a lot of changed).

Basically what we do - we reassign `baseUrl` during runtime here:
```ts
config.baseUrl = evalUrl(config);
```
If want more details on hot it works - dive into `evalUrl` function.

**How to use:**

Pass `--env url=key_of_the_env` (urls and their **keys** defined in [ENVS](./cypress/utils/env.utils.ts)

Opens Cypress GUI with dev url:
```shell
npm run cy:open -- --env url=dev
```

Opens Cypress GUI with custom url:
```shell
npm run cy:open -- --env url=custom,customUrl='https://playwright.dev'
```

**The same approach** remains for `npx cypress run` and CI runs.

In CI we have check whether `url==custom` and in that case assign `customUrl`.

Previously, we were selecting specific url to run the tests with help of [Cypress environmental variables](https://docs.cypress.io/guides/guides/environment-variables), but our `baseUrl` in `cypress.json` wasn't set. It [wasn't a good approach](https://docs.cypress.io/guides/references/best-practices#Setting-a-global-baseUrl), but it allowed us dynamically set the url to visit and url for api requests. **BUT ALSO** our `before/beforeEach` **hooks were executing two time** (two time of login through api). And if we would try to create report - we would create two report and were working in the second one. 

### Triggering GH Actions pipeline <a id="trigger_gh_actions"></a>

Please, refer to [Notion](https://www.notion.so/boweryvaluation/webapp-ui-automation-Triggering-GH-Actions-workflows-261e3dc066fb48d7adf5011cc6900d44) page

### Exploring test results <a id="explore_test_results"></a>

Please, refer to [Notion](https://www.notion.so/boweryvaluation/webapp-ui-automation-Test-results-investigation-b57201ce3e61486584fe3c4d4638084a) page

## NPM Scripts <a id="npm_scripts"></a>

| Script         | Description                                                                                                                                                                       |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| act:debug            | Runs [act cli](https://github.com/nektos/act) for local GithubAction workflow (you can check install_notes in `.act` dir for more).                                                                                                                                          |
| cy:open      | Opens [Cypress GUI](https://docs.cypress.io/guides/getting-started/installing-cypress#Opening-Cypress)                                                     |
| cy:open:comp_plex      | Opens [Cypress GUI](https://docs.cypress.io/guides/getting-started/installing-cypress#Opening-Cypress) with on Comp-plex dev env                                                     |
| cy:run      | Base command to run Cypress tests in headless mode. By default uses Electron (to use Chrome - pass `--browser=chrome` to command)                                                     |
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
