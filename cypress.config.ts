import { defineConfig } from 'cypress';
import grepFilterPlugin from "cypress-grep/src/plugin";
import { addMatchImageSnapshotPlugin } from '@simonsmith/cypress-image-snapshot/plugin';
import api from "./cypress/api";
import Enums from "./cypress/enums/enums";
import { _convertDocxToHtml, _getFilePath, _waitForFileExists } from "./cypress/utils/files.utils";

export default defineConfig({
    chromeWebSecurity: false,
    defaultCommandTimeout: 100000,
    viewportWidth: 1920,
    viewportHeight: 1080,
    watchForFileChanges: false,
    videoCompression: 15,
    videoUploadOnPasses: false,
    projectId: 'EDvaU4',
    e2e: {
        baseUrl: Enums.ENV_URLS.STAGING,
        // We've imported your old cypress plugins here.
        // You may want to clean this up later by importing these.
        setupNodeEvents(on, config) {

            // configuring cypress-grep plugin
            grepFilterPlugin(config);

            // configuring cypress-image-snapshot plugin
            addMatchImageSnapshotPlugin(on, config);

            on("before:browser:launch", (browser, launchOptions) => {
                if (browser.isHeadless === true) {
                    launchOptions.args.push("--window-size=1920,1080");
                    return launchOptions;
                }
            });

            on("task", {
                async loginApi({ _envUrl, _username, _password }) {
                    return await api._loginApi(_envUrl, _username, _password);
                }
            });

            on("task", {
                async createReportApi({ _reportCreationData, _payload, _token, _envUrl }){
                    return await api._createReportApi(_reportCreationData, _payload, _token, _envUrl);
                }
            });

            on("task", {
                async getFilePath({ _reportName, _docx_html }){
                    return await _getFilePath(_reportName, _docx_html);
                }
            });

            on("task", {
                async convertDocxToHtml(report: string){
                    // ernst: it's async because it has call of async function from mammoth lib
                    return await _convertDocxToHtml(report);
                }
            });

            on("task", {
                async waitForFileExists(filePath: string){
                    return await _waitForFileExists(filePath);
                }
            });
        },
        excludeSpecPattern: '*.studio.*',
        specPattern: 'cypress/integration/**/*.spec.{js,jsx,ts,tsx}',
        env: {
            report: "api"
        }
    },
});
