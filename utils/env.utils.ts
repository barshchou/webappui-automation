export const isProdEnv = () => {
    return Cypress.config().baseUrl.includes("https://app.boweryvaluation.com");
};

/**
 * Skipping test suite from execution if current execution env is `prod`.
 * Necessary for tests where we manipulate with sensetive data
 */
export const conditionalDescribe: Mocha.PendingSuiteFunction | Mocha.SuiteFunction = isProdEnv() ? describe.skip : describe;