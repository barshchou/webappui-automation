import { defineConfig } from 'cypress';
import { addMatchImageSnapshotPlugin } from '@simonsmith/cypress-image-snapshot/plugin';
import api from "./cypress/api";
import fsUtil from "./cypress/utils/files.utils";
import grepFilterPlugin from "cypress-grep/src/plugin";
import ddTracePlugin from "dd-trace/ci/cypress/plugin";
import { ENVS, evalUrl } from "./cypress/utils/env.utils";

export default defineConfig({
    chromeWebSecurity: false,
    defaultCommandTimeout: 5000,
    viewportWidth: 1920,
    viewportHeight: 1200,
    watchForFileChanges: false,
    video: false,
    projectId: 'EDvaU4',
    includeShadowDom: true,
    e2e: {
        // baseUrl is staging, but it will be reset down below
        baseUrl: ENVS.staging,

        defaultCommandTimeout: 15000,   // Timeout for default actions and assertions
        pageLoadTimeout: 120000,        // Timeout for cy.visit, cy.go, cy.back
        requestTimeout: 5000,
        responseTimeout: 30000,
        taskTimeout: 60000,

        retries: {
            runMode: 1,
            openMode: 0,
        },

        setupNodeEvents(on, config) {
            // setup and validate `baseUrl` in runtime
            config.baseUrl = evalUrl(config);

            // ernst: don't remove, this is for debug in CI
            // eslint-disable-next-line no-console
            console.log(`\nBaseUrl is: ${config.baseUrl}\n`);

            // configuring cypress-grep plugin
            grepFilterPlugin(config);

            // configuring cypress-image-snapshot plugin
            addMatchImageSnapshotPlugin(on, config);

            // configuring datadog trace plugin
            ddTracePlugin(on, config);

            on("before:browser:launch", (browser, launchOptions) => {
                if (browser.isHeadless === true) {
                    launchOptions.args.push("--window-size=1920,1200");
                    return launchOptions;
                }
            });

            on("task", {
                async loginApi({ _envUrl, _username, _password }) {
                    return await api._loginApi(_envUrl, _username, _password);
                }
            });

            on("task", {
                async createReportApi({ _reportCreationData, _payload, _token, _envUrl }) {
                    return await api._createReportApi(_reportCreationData, _payload, _token, _envUrl);
                }
            });

            on("task", {
                async getFilePath({ _reportName, _docxHtml }) {
                    return await fsUtil._getFilePath(_reportName, _docxHtml);
                }
            });

            on("task", {
                async convertDocxToHtml(report: string) {
                    // ernst: it's async because it has call of async function from mammoth lib
                    return await fsUtil._convertDocxToHtml(report);
                }
            });

            on("task", {
                async waitForFileExists(filePath: string) {
                    return await fsUtil._waitForFileExists(filePath);
                }
            });

            on("task", {
                logNode(message) {
                    // eslint-disable-next-line no-console
                    console.log(message);
                    return null;
                }
            });

            return config;
        },
        excludeSpecPattern: '*.studio.*',
        specPattern: 'cypress/integration/**/*.spec.{js,jsx,ts,tsx}',
        env: {
            report: "api"
        }
    },
});