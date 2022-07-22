const { getUrlValue, getCustomUrl } = require("./getData");
const axios = require("axios");

/**
 * @description Prints appropriate data to console, depending on the dataToPrint parameter and urlValue
 * @param {string} prData Data from pullRequest, that were acquired from api request
 * @param {string} dataToPrint Value of --data flag, passed to command line
 */
const printNecessaryData = (prData, dataToPrint) => {
    const envValue = getUrlValue(prData);
    if (dataToPrint === "url") {
        console.log(envValue.toLowerCase());
    } else {
        const dataToPrint = envValue.toLowerCase() === "custom" ? getCustomUrl(prData) : "";
        console.log(dataToPrint);
    }
};

/**
 * @description Makes request to github api to retrieve data from PR by number, then processes this data to print
 * necessary values to console, depending on the env value and passed --data flag
 * @param {string} githubToken Github personal access token of user
 * @param {string} pullRequestNumber
 * @param {string} dataToPrint The value of --data flag
 */
exports.makeRequestPrintData = (githubToken, pullRequestNumber, dataToPrint) => {
    axios.get(`https://api.github.com/repos/Bowery-RES/webapp-ui-automation/pulls/${pullRequestNumber}`, {
        method: "GET",
        headers: {
            "Authorization": `token ${githubToken}`
        }
    }).then(response => {
        const prData = response.data.body;
        printNecessaryData(prData, dataToPrint);
    })
};
