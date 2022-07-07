export const isProdEnv = () => {
    return Cypress.config().baseUrl?.includes(ENVS.prod);
};

export const ENVS = {
    dev: "https://bowery-development.herokuapp.com",
    staging: "https://bowery-staging.herokuapp.com",
    prod: "https://app.boweryvaluation.com"
};

const _validateUrl = (obj: object, key: string) => {
    return Object.keys(obj).includes(key) 
    ? ENVS[key]
    : new Error(`Key "${key}" in not defined in ENVS`);
};

export const evalUrl = (config: Cypress.PluginConfigOptions) => {
    if(config.env.url == "custom"){
        return config.env.customUrl;
    }
    else{
        return _validateUrl(ENVS, config.env.url);
    }
};