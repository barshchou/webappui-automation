export const cutLastLetter = (stringToChange) => {
  return stringToChange.replace(/.$/, "");
};

export const uppercaseFirstLetterEachWord = (string) => {
  return string.replace(/(^\w|\s\w)/g, m => m.toUpperCase());
};

export const replaceEntersWithLineBreak = (stringToChange) => {
  return stringToChange.replaceAll("{enter}", "\n");
};

export const replaceEntersWithSpaces = (stringToChange) => {
  return stringToChange.replaceAll("{enter}", " ");
};

export const _normalize = (textToNormalize: string): string => {
  return textToNormalize.replaceAll('﻿', '').trim();
};

export const isStringContainSubstring = (originString: string, stringToFind: string) => {
  return originString.includes(stringToFind);
};