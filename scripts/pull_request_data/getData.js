const envUrls = require("../../scripts/env.urls");

exports.getEnvValue = (prData) => {
    return prData.split("The environment:")[1].split("2. Paste the link")[0]
        .split("[x]")[1].split("[ ]")[0].replaceAll("-", "").trim();
};

exports.getEnvUrl = (envValue) => {
    return envUrls[envValue.toUpperCase()];
};

exports.getCustomUrl = (prData) => {
    let url = prData.split("[Envlink]")[1].split("## Test run screenshots")[0]
        .trim().replace("(", "").replace(")", "");
    if (url.endsWith("/")) url = url.replace(/.$/, "");
    return url;
};
