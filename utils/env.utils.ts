import Enums from "../cypress/enums/enums";

export const isProdEnv = () => {
    return Cypress.config().baseUrl.includes(Enums.ENV_URLS.PROD);
};