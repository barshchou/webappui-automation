export const getTodayDateString = (delimiter = "-") => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0");
    let yyyy = today.getFullYear();
    return `${mm}${delimiter}${dd}${delimiter}${yyyy}`;
};

export const getTodayDay = (delimiter = "-") => {
    return getTodayDateString().split(delimiter)[1];
};

const isLeapYear = (yearNumber) => {
    if (yearNumber % 4 === 0) {
        if (yearNumber % 100 === 0) {
            return yearNumber % 400 === 0;
        } else {
            return true;
        }
    } else {
        return false;
    }
};

export const isDateHasCorrectFormat = (dateString, delimiter = "-") => {
    const dateValuesArray = dateString.split(delimiter);
    const isMonthCorrect = dateValuesArray[0] > 0 && dateValuesArray[0] <= 12;
    let isDayCorrect;
    if (dateValuesArray[0] === "02") {
        if (isLeapYear(dateValuesArray[2])) {
            isDayCorrect = dateValuesArray[1] > 0 && dateValuesArray[1] <= 29;
        } else {
            isDayCorrect = dateValuesArray[1] > 0 && dateValuesArray[1] <= 28;
        }
    } else {
        isDayCorrect = dateValuesArray[1] > 0 && dateValuesArray[1] <= 31;
    }
    const isYearCorrect = dateValuesArray[2] >= 1900 && dateValuesArray[2] < 2100;
    return isMonthCorrect && isDayCorrect && isYearCorrect;
};

export const getMonthFromDate = (date) => {
    date = date ?? getTodayDateString();
    return date.split("-")[0];
};

export const getYearFromDate = (date) => {
    date = date ?? getTodayDateString();
    return date.split("-")[2];
};

export const getQuarter = (dateString) => {
    const currentMonthNumber = Number(getMonthFromDate(dateString));
    if (currentMonthNumber >= 1 && currentMonthNumber < 4) {
        return "Q4";
    } else if (currentMonthNumber >= 4 && currentMonthNumber < 7) {
        return "Q1";
    } else if (currentMonthNumber >= 7 && currentMonthNumber < 10) {
        return "Q2";
    } else if (currentMonthNumber >= 10 && currentMonthNumber <= 12) {
        return "Q3";
    }
};

export const isCorrectQuarter = (quarter) => {
    return quarter === "Q1" || quarter === "Q2" || quarter === "Q3" || quarter === "Q4";
};