export const getUploadFixturesArrayFromFolder = (baseFolderPath, fixturesNames) => {
    let fixturesArray = [];
    fixturesNames.forEach(name => {
        fixturesArray.push(getUploadFixture(`${baseFolderPath}/${name}`));
    });
    return fixturesArray;
};

export const getUploadFixture = (filePath) => {
  return {filePath: filePath, encoding: "base64"};
};