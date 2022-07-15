const _tokenFlag = "--token";
const _prNumberFlag = "--pr";
const _dataFlag = "--data";

exports.tokenFlag = _tokenFlag;
exports.prNumberFlag = _prNumberFlag;
exports.dataFlag = _dataFlag;

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

exports.verifyArguments = () => {
    const stringArguments = process.argv.toString();
    const isFlagsPresent = stringArguments.includes(_tokenFlag) && stringArguments.includes(_prNumberFlag)
        && stringArguments.includes(_dataFlag);
    if (!isFlagsPresent) throw new Error("You haven't entered all necessary flags!");
};

exports.verifyDataFlag = () => {
    const dataValue = _getFlagValue(_dataFlag);
    const isCorrectValue = dataValue === "env" || dataValue === "url" || dataValue === "customEnv";
    if (!isCorrectValue) throw new Error(`You've entered incorrect data flag value, only 'env' or 'url' values are acceptable`);
}
