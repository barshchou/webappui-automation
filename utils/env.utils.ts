export const isProdEnv = () => {
    return Cypress.config().baseUrl.includes("https://app.boweryvaluation.com");
};

export const conditionalDescribe = isProdEnv() ? describe.skip : describe;