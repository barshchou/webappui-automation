export const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const cutDecimalPartToTwoDigits = (number) => {
  if (!(typeof number === "number") || !(`${number}`.includes("."))) {
      throw new Error(`Parameter ${number} is not a number or is not decimal`);
  }
  let numberDigits = number.toString().split(".");
  let decimalPartTwoDigits = `${numberDigits[1].charAt(0)}${numberDigits[1].charAt(1)}`;
  return Number(`${numberDigits[0]}.${decimalPartTwoDigits}`);
};

export const isHasDecimalPartMoreTwoDigits = (number) => {
    if (!(typeof number === "number") || !(`${number}`.includes("."))) {
        throw new Error(`Parameter ${number} is not a number or is not decimal`);
    }
    let numberDigits = number.toString().split(".");
    return numberDigits.length > 2;
};