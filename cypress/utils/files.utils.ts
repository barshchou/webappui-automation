import glob = require("glob");
import mammoth = require("mammoth");
import { existsSync, writeFileSync } from "fs";

/**
 * Get relative path to the file (report docx file or converted html in our case)
 * @param {string} _reportName - generated `testData.reportCreationData.reportNumber` in test fixture
 * @param {"docx" | "html"} _docx_html - look for file which ends with "docx" or "html" extension
 * @returns first relative path from array of matches
 * @see https://www.npmjs.com/package/glob
 */
export const _getFilePath = async (_reportName: string, _docx_html: string, currentTime = 0, timeout = 60000) => {
    let file = glob.sync(`cypress/downloads/${_reportName}**.${_docx_html}`)[0];
    if (file != undefined) {
        return file;
    }
    await new Promise((resolve) => {
        setTimeout(() => resolve(true), 1000);
    });
    return _getFilePath(_reportName, _docx_html, currentTime + 1000, timeout);
};

/**
 * ernst: for type - check `cypress/types`, I couldn't import it via JSDoc explicitly
 * @description Converts docx file into html via mammoth lib and writes it into cypress/downloads
 */
export const _convertDocxToHtml = async (report: string): Promise<null> => {
    let result = await mammoth.convertToHtml({ path: report });
    writeFileSync(`${report}.html`, result.value);
    return null;
};

/**
 * @description Waiting recursively file to exist. If file exists - return Promise<true>.
 * If not - resolve Promise with timeout for 1 second (this is our interval for checks),
 * and return function itself.
 * if currentTime == timeout
 * (notice, that we call function itself with currentTime+1second,
 * so we will make recursion until timeout exceed) - return Promise<false>
 */
export const _waitForFileExists = async (filePath: string, currentTime = 0, timeout = 60000): Promise<boolean> => {
    if (existsSync(filePath)) {
        return true;
    }
    if (currentTime === timeout){
        return false;
    }
    await new Promise((resolve) => {
        setTimeout(() => resolve(true), 1000);
    });
    return _waitForFileExists(filePath, currentTime + 1000, timeout);
};