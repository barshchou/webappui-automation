import { defineConfig } from 'cypress';
import { addMatchImageSnapshotPlugin } from '@simonsmith/cypress-image-snapshot/plugin';
import { ENVS, evalUrl } from './utils/env.utils';
import api from "./cypress/api";
import fsUtil from "./cypress/utils/files.utils";
import grepFilterPlugin from "cypress-grep/src/plugin";
import ddTracePlugin from "dd-trace/ci/cypress/plugin";

export default defineConfig({
    chromeWebSecurity: false,
    defaultCommandTimeout: 100000,
    viewportWidth: 1920,
    viewportHeight: 1200,
    watchForFileChanges: false,
    videoCompression: 15,
    videoUploadOnPasses: false,
    projectId: 'EDvaU4',
    e2e: {
        // baseUrl is staging, but it will be reset down below
        baseUrl: ENVS.staging,

        setupNodeEvents(on, config) {
            // setup and validate `baseUrl` in runtime
            config.baseUrl = evalUrl(config);

            // ernst: don't remove, this is for debug in CI
            // eslint-disable-next-line no-console
            console.log(`\nBaseUrl is: ${config.baseUrl}\n`);

            // configuring cypress-grep plugin
            grepFilterPlugin('cypress-grep/src/plugin')(config);

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
                async getFilePath({ _reportName, _docx_html }) {
                    return await fsUtil._getFilePath(_reportName, _docx_html);
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

            return config;
        },
        excludeSpecPattern: '*.studio.*',
        specPattern: 'cypress/integration/**/*.spec.{js,jsx,ts,tsx}',
        env: {
            report: "api"
        }
    },
});
