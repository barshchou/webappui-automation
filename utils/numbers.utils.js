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
  for (let i = 0; i < numberToCut; i++) {
      decimalPart += numberDigits[1].charAt(i);
  }
  return Number(`${numberDigits[0]}.${decimalPart}`);
};

export const isHasDecimalPartMoreNumberOfDigits = (number, digitsNumber = 2) => {
    if (!(typeof number === "number") || !(`${number}`.includes("."))) {
        return false;
    }
    let numberDigits = number.toString().split(".");
    return numberDigits[1].length > digitsNumber;
};