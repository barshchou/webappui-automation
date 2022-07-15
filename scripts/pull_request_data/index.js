const { getFlagValue, tokenFlag, prNumberFlag, dataFlag,
    verifyArguments, verifyDataFlag} = require("./processFunctions");
const {makeRequestPrintData} = require("./printData");

verifyArguments();

verifyDataFlag();

const receivedToken = getFlagValue(tokenFlag);
const receivedPRNumber = getFlagValue(prNumberFlag);
const receivedDataFlagValue = getFlagValue(dataFlag);

makeRequestPrintData(receivedToken, receivedPRNumber, receivedDataFlagValue);




