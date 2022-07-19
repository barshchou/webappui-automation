const _tokenFlag = "--token";
const _prNumberFlag = "--pr";
const _dataFlag = "--data";

exports.tokenFlag = _tokenFlag;
exports.prNumberFlag = _prNumberFlag;
exports.dataFlag = _dataFlag;

/**
 * @param {string} flag flag, that is passed to command line
 * @returns {string} Value of passed flag
 */
const _getFlagValue = (flag) => {
    let flagIndex;
    for (let i = 0; i < process.argv.length; i++) {
        if (process.argv[i] === flag) {
            flagIndex = i;
            break;
        }
    }
    return process.argv[flagIndex + 1];
};

exports.getFlagValue = _getFlagValue;

/**
 * @description This function checks, that all necessary flags for script are passed to command line, throws Error, if not
 */
exports.verifyArguments = () => {
    const stringArguments = process.argv.toString();
    const isFlagsPresent = stringArguments.includes(_tokenFlag) && stringArguments.includes(_prNumberFlag)
        && stringArguments.includes(_dataFlag);
    if (!isFlagsPresent) throw new Error("You haven't entered all necessary flags!");
};

/**
 * @description This function verifies --data flag value, only 'env' || 'url' || 'customEnv' are allowed
 */
exports.verifyDataFlag = () => {
    const dataValue = _getFlagValue(_dataFlag);
    const isCorrectValue = dataValue === "env" || dataValue === "url" || dataValue === "customEnv";
    if (!isCorrectValue) {
        throw new Error(`You've entered incorrect data flag value, only 'env', 'url' or 'customEnv' values are acceptable`);
    }
}
