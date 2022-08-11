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

export const getYearFromDate = (date: string = getTodayDateString()): string => {
    return date.split("-")[2];
};

/**
 * @description This function returns a quarter for Quarter field on Property -> 
 * Market page. If no parameter other than date
 * is passed, it will return quarter previous from current as needed documents always will be FINAL for previous quarter
 * for example for current Q1 of current year it will be Q4 of previous year.
 * @param dateString Date for which we will return quarter
 * @param isPlusQuarter If we need any quarter above previous, we pass this parameter
 * @param numberOfQuartersToPlus Here we pass number for as many quarters above we want to return, this will always
 * return 1 or 2 quarters above, because we won't need more, it was just for 1 test
 */
export const getQuarter = (dateString: string, isPlusQuarter = false, numberOfQuartersToPlus = 2) => {
    const currentMonthNumber = Number(getMonthFromDate(dateString));
    if (currentMonthNumber >= 1 && currentMonthNumber < 4) {
        return isPlusQuarter ? numberOfQuartersToPlus === 1 ? "Q1" : "Q2" : "Q4";
    } else if (currentMonthNumber >= 4 && currentMonthNumber < 7) {
        return isPlusQuarter ? numberOfQuartersToPlus === 1 ? "Q2" : "Q3" : "Q1";
    } else if (currentMonthNumber >= 7 && currentMonthNumber < 10) {
        return isPlusQuarter ? numberOfQuartersToPlus === 1 ? "Q3" : "Q4" : "Q2";
    } else if (currentMonthNumber >= 10 && currentMonthNumber <= 12) {
        return isPlusQuarter ? numberOfQuartersToPlus === 1 ? "Q4" : "Q1" : "Q3";
    }
};

export const getPreviousQuarterFromQuarter = (quarter: string) => {
    if (isCorrectQuarter(quarter)) {
        switch (quarter) {
            case "Q1":
                return "Q4";
            case "Q2":
                return "Q1";
            case "Q3":
                return "Q2";
            case "Q4":
                return "Q3";
            default:
                cy.log('Not correct quarter');
                return null;
        }
    } else {
        throw new Error("You've entered incorrect quarter");
    }
};

export const getCurrentMonthName = (): string => {
    const date = new Date();
    let month = date.toLocaleString('default', { month: 'long' } );
    return month;
};

export const isCorrectQuarter = (quarter) => {
    return quarter === "Q1" || quarter === "Q2" || quarter === "Q3" || quarter === "Q4";
};


/**
 * @description This function returns random date (from 01-01-1970 to now) in view MM-DD-YYYY
 */
export const getRandomDate = (): string => {
    let startDateLong = Date.parse('01-01-1970');
    let todayDateLong = Date.parse(new Date().toDateString());
    let randomDate = new Date(Math.random() * (todayDateLong - startDateLong));
    let randomDateString = (`${("0" + (randomDate.getMonth() + 1)).slice(-2)}` + '-'
        + `${("0" + randomDate.getDate()).slice(-2)}` + '-' + `${randomDate.getFullYear()}`);
    return randomDateString;
};