export const cutLastLetter = (stringToChange: string) => {
    return stringToChange.replace(/.$/, "");
};

export const uppercaseFirstLetterEachWord = (string: string) => {
    return string.replace(/(^\w|\s\w)/g, m => m.toUpperCase());
};

export const replaceEntersWithLineBreak = (stringToChange: { replaceAll: (arg0: string, arg1: string) => string; }) => {
    return stringToChange.replaceAll("{enter}", "\n");
};

export const replaceEntersWithSpaces = (stringToChange: string) => {
    return stringToChange.replaceAll("{enter}", " ");
};

export const isStringContainSubstring = (originString: string, stringToFind: string) => {
    return originString.includes(stringToFind);
};

export const normalizeText = (textToNormalize: string): string => {
    return textToNormalize.replaceAll('﻿', '').trim();
};

export const toLowerCaseFirstLetterInString = (string: string): string => {
    return string.charAt(0).toLowerCase() + string.slice(1);
};

export const toCamelCase = (stringToChange: string): string => {
    const capitalizedAll = uppercaseFirstLetterEachWord(stringToChange).trim().replaceAll(" ", "").replaceAll(",", "");
    return toLowerCaseFirstLetterInString(capitalizedAll);
};
