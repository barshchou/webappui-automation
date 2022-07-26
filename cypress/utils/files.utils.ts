import { sync } from "glob";
import { convertToHtml } from "mammoth";
import { existsSync, writeFileSync } from "fs";

/**
 * Get relative path to the file (report docx file or converted html in our case)
 * @param {string} _reportName - generated `testData.reportCreationData.reportNumber` in test fixture
 * @param {"docx" | "html"} _docxHtml - look for file which ends with "docx" or "html" extension
 * @param currentTime
 * @param timeout
 * @returns first relative path from array of matches
 * @see https://www.npmjs.com/package/glob
 */
const _getFilePath = async (_reportName: string, _docxHtml: string, currentTime = 0, timeout = 60000) => {
    let file = sync(`cypress/downloads/**${_reportName}**.${_docxHtml}`)[0];
    if (file != undefined) {
        return file;
    }
    await new Promise((resolve) => {
        setTimeout(() => resolve(true), 1000);
    });
    return _getFilePath(_reportName, _docxHtml, currentTime + 1000, timeout);
};

/**
 * ernst: for type - check `cypress/types`, I couldn't import it via JSDoc explicitly
 * @description Converts docx file into html via mammoth lib and writes it into cypress/downloads
 */
const _convertDocxToHtml = async (report: string): Promise<null> => {
    let result = await convertToHtml({ path: report });
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
const _waitForFileExists = async (filePath: string, currentTime = 0, timeout = 60000): Promise<boolean> => {
    if (existsSync(filePath)) {
        return true;
    }
    if (currentTime === timeout) {
        return false;
    }
    await new Promise((resolve) => {
        setTimeout(() => resolve(true), 1000);
    });
    return _waitForFileExists(filePath, currentTime + 1000, timeout);
};

export default {
    _waitForFileExists,
    _convertDocxToHtml,
    _getFilePath
};