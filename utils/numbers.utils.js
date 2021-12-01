export const numberWithCommas = (number) => {
    let numberParts = number.toString().split(".");
    return numberParts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (numberParts[1] ? "." + numberParts[1] : "");
};

export const cutDecimalPartToNumberOfDigits = (number, numberToCut = 2) => {
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

export const isDecimal = (number) => {
  return number.toString().includes(".");
};

export const isHasDecimalPartMoreNumberOfDigits = (number, digitsNumber = 2) => {
    if (!(typeof number === "number") || !isDecimal(number)) {
        return false;
    }
    let numberDigits = number.toString().split(".");
    return numberDigits[1].length > digitsNumber;
};

export const getNumberFromDollarNumberWithCommas = (stringNumber) => {
  return typeof stringNumber === "string" ? Number(stringNumber.replace("$", "")
      .replace(",", "")) : stringNumber;
};
