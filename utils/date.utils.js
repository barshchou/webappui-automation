export const getTodayDateString = () => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0");
    let yyyy = today.getFullYear();
    return `${mm}-${dd}-${yyyy}`;
};

export const getTodayDay = () => {
    return getTodayDateString().split("-")[1];
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

export const isDateHasCorrectFormat = (dateString) => {
    const dateValuesArray = dateString.split("-");
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