/*
 * export const isProdEnv = () => {
 *     return Cypress.config().baseUrl.includes(ENVS.prod);
 * };
 */

export const ENVS = {
    dev: "https://bowery-development.herokuapp.com",
    staging: "https://bowery-staging.herokuapp.com",
    prod: "https://app.boweryvaluation.com"
};

/**
 * Evaluates Cypress' `baseUrl` with validators.
 *
 * If you want to get `baseUrl` during test run - call `Cypress.config().baseUrl`
 * @returns
 */
export const evalUrl = (config: Cypress.PluginConfigOptions): string => {
    if (config.env.url == "custom") {
        return _validateCustomUrl(config.env.customUrl);
    } else if (config.env.url == undefined) {
        return ENVS.staging;
    } else {
        return _validateUrl(ENVS, config.env.url);
    }
};

/**
 * Validates url according to available properties in ENVS object.
 */
const _validateUrl = (obj: object, key: string): string => {
    if (Object.keys(obj).includes(key)) {
        return _trimSlash(obj[key]);
    } else {
        throw new Error(`Key "${key}" in not defined in ENVS.`);
    }
};

/**
 * Validates customUrl when `config.env.url` is `custom`.
 */
const _validateCustomUrl = (customUrl: string): string => {
    if (customUrl != undefined && (customUrl.indexOf("http://") == 0 || customUrl.indexOf("https://") == 0)) {
        return _trimSlash(customUrl);
    } else {
        throw new Error(
            `Your customUrl ("${customUrl}") is invalid (or undefined). 
            Set 'customUrl' correctly (with 'http://' or 'https://') and re-run Cypress.`
        );
    }
};

/**
 * Trims `pathname` in link and return clear link.
 *
 * Example: from `https://bowery-development.herokuapp.com/` -> to `https://bowery-development.herokuapp.com`
 * @param str Url string
 */
const _trimSlash = (str: string) => new URL(str).origin;

// /**
//  * Skipping test suite from execution if current execution env is `prod`.
//  * Necessary for tests where we manipulate with sensitive data
//  */
// export const conditionalDescribe = isProdEnv() ? describe.skip : describe;