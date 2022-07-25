export const getUploadFixturesArrayFromFolder = 
    (baseFolderPath: string, fixturesNames: Array<string>): Cypress.FixtureData[] => {
        let fixturesArray = [];
        fixturesNames.forEach(name => {
            fixturesArray.push(getUploadFixture(`${baseFolderPath}/${name}`));
        });
        return fixturesArray;
    };

export const getUploadFixture = (filePath: string): Cypress.FixtureData => {
    return { filePath: filePath, encoding: "base64" };
};

/**
 * Path to `spec_data` folder where we store test data which need to be persistent across test cases in suite
 * @returns Path to folder related to specific test (example, `./cypress/spec_data/QA-1234.spec/`)
 */
export const pathSpecData = () => `./cypress/spec_data/${Cypress.spec.name}/`;
