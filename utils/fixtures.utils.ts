export const getUploadFixturesArrayFromFolder = (baseFolderPath: string, fixturesNames: Array<string>): Cypress.FixtureData[] => {
    let fixturesArray = [];
    fixturesNames.forEach(name => {
        fixturesArray.push(getUploadFixture(`${baseFolderPath}/${name}`));
    });
    return fixturesArray;
};

export const getUploadFixture = (filePath: string): Cypress.FixtureData => {
  return { filePath: filePath, encoding: "base64" };
};