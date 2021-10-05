import addCompFormPage from "../../../../pages/income/residental/rent_comps/addCompForm.page";
import {getTodayDateString, getTodayDay, isDateHasCorrectFormat} from "../../../../../utils/date.utils";

class AddCompFormActions {
    clickCloseButton() {
        addCompFormPage.closeButton.should("be.enabled").click();
    }

    verifyPropAddressExist() {
        addCompFormPage.propAddressField.should("be.visible").should("not.be.empty");
    }

    verifyUnitNumbFieldName() {
        addCompFormPage.unitNumbFieldName.should("exist").should("have.text", "Unit Number");
    }

    enterUnitNumber(unitNumber) {
        addCompFormPage.unitNumbInput.clear().type(unitNumber).should("have.value", unitNumber);
    }

    clickUnitTypeDropdown() {
        addCompFormPage.unitTypeDropdown.should("be.visible").click();
    }

    selectUnitTypeByValue(value) {
        addCompFormPage.getUnitTypeByValue(value).scrollIntoView().should("be.visible").click();
    }

    verifyUnitTypeValue(valueToBe) {
        addCompFormPage.unitTypeInputToCheck.should("have.value", valueToBe);
    }

    selectUnitTypeAndVerify(value) {
        this.clickUnitTypeDropdown();
        this.selectUnitTypeByValue(value);
        this.verifyUnitTypeValue(value);
    }

    selectListUnitTypes(values) {
        values.forEach(value => {
           this.selectUnitTypeAndVerify(value);
        });
    }

    verifyMonthRentFieldName() {
        addCompFormPage.monthRentFieldName.should("exist").should("contain.text", "Monthly Rent");
    }

    enterMonthlyRent(rent) {
        addCompFormPage.monthRentInput.clear().type(rent).should("have.value", rent);
    }

    clearDateInput() {
        addCompFormPage.dateOfValueInput.clear();
    }

    enterDate(date) {
        this.clearDateInput();
        date = date ?? getTodayDateString();
        const isDateCorrect = isDateHasCorrectFormat(date);
        if (isDateCorrect) {
            addCompFormPage.dateOfValueInput.type(date);
        } else {
            addCompFormPage.errorMessage.should("exist");
        }
        this.verifyEnteredDate(date);
    }

    verifyEnteredDate(dateToBe) {
        dateToBe = dateToBe ?? getTodayDateString();
        addCompFormPage.dateInputValue.should("have.value", dateToBe);
    }

    chooseDayOfCurrentMonthInPicker(day) {
        day = day ?? Number(getTodayDay());
        let date = getTodayDateString();
        let dateArr = date.split("-");
        if (day < 10) {
            dateArr[1] = `0${day}`;
        } else {
            dateArr[1] = day;
        }
        date = `${dateArr[0]}-${dateArr[1]}-${dateArr[2]}`;
        addCompFormPage.datePickerButton.should("be.enabled").click();
        addCompFormPage.datePickerPopover.should("exist");
        addCompFormPage.getDayOfCurrentMonthInPicker(day).should("be.visible").click();
        this.verifyEnteredDate(date);
    }
}

export default new AddCompFormActions();