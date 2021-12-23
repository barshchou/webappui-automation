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
    }
    return envUrl;
};