export const numberWithCommas = (number: number | string) => {
    let numberParts = number.toString().split(".");
    return numberParts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (numberParts[1] ? "." + numberParts[1] : "");
};

export const cutDecimalPartToNumberOfDigits = (number: number | string, numberToCut = 2) => {
  if (!(typeof number === "number") || !(`${number}`.includes("."))) {
      throw new Error(`Parameter ${number} is not a number or is not decimal`);
  }
  let numberDigits = number.toString().split(".");
  let decimalPart = "";
  if (numberToCut === 0) {
      return Number(numberDigits[0]);
  }
  for (let i = 0; i < numberToCut; i++) {
      decimalPart += numberDigits[1].charAt(i);
  }
  return Number(`${numberDigits[0]}.${decimalPart}`);
};

export const isDecimal = (number): boolean => {
  return number.toString().includes(".");
};

export const isHasDecimalPartMoreNumberOfDigits = (number: number | string, digitsNumber = 2) => {
    if (!(typeof number === "number") || !isDecimal(number)) {
        return false;
    }
    let numberDigits = number.toString().split(".");
    return numberDigits[1].length > digitsNumber;
};

export const getNumberFromPercentNumberWithCommas = stringNumber => {
    return typeof stringNumber === "string" ? Number(stringNumber.replace("%", "")
        .replaceAll(",", "")) : stringNumber;
};

export const getNumberFromDollarNumberWithCommas = (stringNumber) => {
  return typeof stringNumber === "string" ? Number(stringNumber.replace("$", "")
      .replaceAll(",", "")) : stringNumber;
};

export const getNumberFromMinusDollarNumberWithCommas = (stringNumber) => {
    return Number(`${getNumberFromDollarNumberWithCommas(stringNumber)}`.replace("-", ""));
};

const getZerosString = (numberOfZeros) => {
    let stringToReturn = "";
    for (let i = 0; i < numberOfZeros; i++) {
        stringToReturn += "0";
    }
    return stringToReturn;
};

export const getNumberWithDecimalPart = (number, digitsToBe = 2) => {
    let splittedNumber = number.toString().split(".");
    if (splittedNumber.length === 1) {
        return `${number.toString()}.${getZerosString(digitsToBe)}`;
    }
    let decimalPart = splittedNumber[1];
    if (decimalPart.length < digitsToBe) {
        return `${splittedNumber[0]}.${getZerosString(digitsToBe - decimalPart.length)}`;
    }
    return `${splittedNumber[0]}.${decimalPart.slice(0, digitsToBe)}`;
};

export const isHalfDecimalPart = (number) => {
    return Number(number.toString().split(".")[1]) === 5;
};

export const isNumber = (value) => {
    return typeof value === "number";
};

export const cutDotFromNumber = (number: number) => {
    return Number(`${number}`.replace(".", ""));
};

export const getValueNotDecimalNotCommasInput = (number: number | string): string => {
    return isNumber(number) ? Number.isInteger(number) ? `${number}` : `${cutDotFromNumber(<number>number)}` : "";
};

export const getValueDecimalCommasInput = (number: number | string): string => {
    if (isNumber(number)) {
        if (Number.isInteger(number)) {
            return numberWithCommas(number);
        } else {
            if (isHasDecimalPartMoreNumberOfDigits(number)) {
                return `${numberWithCommas(`${cutDecimalPartToNumberOfDigits(number)}`)}`;
            } else {
                return numberWithCommas(number);
            }
        }
    } else {
        return "";
    }
};