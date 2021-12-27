import {cutLastLetter} from "./string.utils";

export const getEnvUrl = () => {
    let envUrl;
    switch (Cypress.env("url")) {
        case "dev":
            envUrl = "https://bowery-development.herokuapp.com";
            break;
        case "prod":
            envUrl = "https://app.boweryvaluation.com";
            break;
        default:
            envUrl = "https://bowery-staging.herokuapp.com";
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
    return link.endsWith("/");
};