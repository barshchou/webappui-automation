export const cutLastLetter = (stringToChange) => {
  return stringToChange.replace(/.$/,"");
};

export const uppercaseFirstLetterEachWord = (string) => {
  return string.replace(/(^\w|\s\w)/g, m => m.toUpperCase());
};