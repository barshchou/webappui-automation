const {getEnvValue, getEnvUrl, getCustomUrl} = require("./getData");
const axios = require("axios");


const printNecessaryData = (prData, dataToPrint) => {
    const envValue = getEnvValue(prData);
    if (dataToPrint === "env") {
        console.log(envValue.toLowerCase());
    } else if (dataToPrint === "url") {
        if (envValue.toLowerCase() !== "custom") {
            const envUrl = getEnvUrl(envValue);
            console.log(envUrl);
        } else {
            const customUrl = getCustomUrl(prData);
            console.log(customUrl);
        }
    } else {
        const dataToPrint = envValue.toLowerCase() === "custom" ? getCustomUrl(prData) : "";
        console.log(dataToPrint);
    }
};

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
