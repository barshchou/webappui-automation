import { ENVS } from "../utils/env.utils";

export const isProdEnv = () => {
    return Cypress.config().baseUrl.includes(ENVS.prod);
};

/**
 * Skipping test suite from execution if current execution env is `prod`.
 * Necessary for tests where we manipulate with sensetive data
 */
export const conditionalDescribe = isProdEnv() ? describe.skip : describe;
