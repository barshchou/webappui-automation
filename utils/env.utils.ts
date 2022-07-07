export const isProdEnv = () => {
    return Cypress.config().baseUrl?.includes(ENVS.prod);
};

export const ENVS = {
    dev: "https://bowery-development.herokuapp.com",
    staging: "https://bowery-staging.herokuapp.com",
    prod: "https://app.boweryvaluation.com"
};

export const evalUrl = (config: Cypress.PluginConfigOptions): string => {
    if(config.env.url == "custom"){
        return _validateCustomUrl(config.env.customUrl);
    }
    else{
        return _validateUrl(ENVS, config.env.url);
    }
};

const _validateUrl = (obj: object, key: string): string => {
    if(Object.keys(obj).includes(key)){
        return obj[key];
    }
    else {
        throw new Error(`Key "${key}" in not defined in ENVS`);
    }
};

const _validateCustomUrl = (customUrl: string): string => {
    if(customUrl != undefined && (customUrl.indexOf("http://") == 0 || customUrl.indexOf("https://") == 0)){
        return customUrl;
    }
    else {
        throw new Error(
            `Your customUrl ("${customUrl}") is invaild (or undefined). 
            Set 'customUrl' correctly (with 'http://' or 'https://') and re-run Cypress.`
        );
    }
};