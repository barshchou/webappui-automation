import {cutLastLetter} from "./string.utils";
import Enums from "../cypress/enums/enums";

export const getEnvUrl = () => {
    let envUrl;
    switch (Cypress.env("url")) {
        case "dev":
            envUrl = Enums.ENV_URLS.DEV;
            break;
        case "prod":
            envUrl = Enums.ENV_URLS.PROD;
            break;
        default:
            envUrl = Enums.ENV_URLS.DEV;
    }
    if (Cypress.env("customEnv")) {
        envUrl = Cypress.env("customEnv");
        if (!isCorrectLink(envUrl)) {
            envUrl = cutLastLetter(envUrl);
        }
    }
    return envUrl;
};

const isCorrectLink = (link) => {
    return !link.endsWith("/");
};

export const isProdEnv = () => {
    return getEnvUrl().includes(Enums.ENV_URLS.PROD);
};