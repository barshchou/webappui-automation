/**
 * @param {string} prData Data from pullRequest, that were acquired from api request
 * @returns {string} Value of checked environment in pullRequest
 */
exports.getUrlValue = (prData) => {
    return prData.split("The environment:")[1].split("2. Paste the link")[0]
        .split("[x]")[1].split("[ ]")[0].replaceAll("-", "").trim();
};

/**
 * @param {string} prData Data from pullRequest, that were acquired from api request
 * @returns {string} Returns url of custom env, in customEnvLink section
 */
exports.getCustomUrl = (prData) => {
    let url = prData.split("[customEnvLink]")[1].split("## Test run screenshots")[0]
        .trim().replace("(", "").replace(")", "");
    if (url.endsWith("/")) url = url.replace(/.$/, "");
    return url;
};
