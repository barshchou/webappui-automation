import addCompFormPage from "../../../../pages/income/residential/rent_comps/addCompForm.page";
import {getTodayDateString, getTodayDay, isDateHasCorrectFormat} from "../../../../../utils/date.utils";
import {isDecimal, numberWithCommas} from "../../../../../utils/numbers.utils";

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
        const textToBe = typeof rent === "string" ? rent : numberWithCommas(rent);
        addCompFormPage.monthRentInput.clear().type(rent).should("have.value", textToBe);
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

    verifySquareFootageFieldName() {
        addCompFormPage.squareFootageFieldName.should("exist")
            .should("have.text", "Unit Square Footage");
    }

    enterSquareFootage(footage) {
        const textToBe = typeof footage === "string" ? footage : numberWithCommas(footage);
        addCompFormPage.squareFootageInput.clear().type(footage).should("have.value", textToBe);
    }

    clickSourceOfInfoDropdown() {
        addCompFormPage.sourceOfInfoDropdown.click({force:true});
    }

    selectSourceOfInfoByValue(value) {
        addCompFormPage.getSourceOfInfoByValue(value).click({force:true});
    }

    verifySelectedSource(valueToBe) {
        addCompFormPage.sourceOfInfoInputToCheck.should("have.value", valueToBe);
    }

    selectSourceOfInfoAndVerify(value) {
        this.clickSourceOfInfoDropdown();
        this.selectSourceOfInfoByValue(value);
        this.verifySelectedSource(value);
    }

    selectListSourceOfInfoAndVerify(values) {
        values.forEach(value => {
            this.selectSourceOfInfoAndVerify(value);
        });
    }

    verifyNumberOfBedroomsFiledName() {
        addCompFormPage.numberOfBedroomsFieldName.should("exist")
            .should("contain.text", "Number of Bedrooms");
    }

    enterNumberOfBedrooms(number) {
        addCompFormPage.bedroomsInput.clear().type(number).should("have.value", number);
    }

    enterSourceName(name) {
        addCompFormPage.sourceNameInput.should("exist").clear().type(name).should("have.value", name);
    }

    verifySourceNameNotExist() {
        addCompFormPage.sourceNameInput.should("not.exist");
    }

    verifySourceUrlNotExist() {
        addCompFormPage.sourceUrlInput.should("not.exist");
    }

    enterSourceUrl(url) {
        addCompFormPage.sourceUrlInput.should("exist").clear().type(url).should("have.value", url);
    }

    verifyNumberOfRoomsFieldName() {
        addCompFormPage.numberOfRoomsFieldName.should("exist")
            .should("contain.text", "Number of Rooms");
    }

    enterNumberOfRooms(numberOfRooms) {
        addCompFormPage.numberOfRoomsInput.clear().type(numberOfRooms).should("have.value", numberOfRooms);
    }

    verifyNumberOfBathFieldName() {
        addCompFormPage.numberOfBathFieldName.should("exist")
            .should("have.text", "Number of Bathrooms");
    }

    enterNumberOfBathrooms(number = 0) {
        if (isDecimal(number)) {
            number = number.toFixed(1);
            number = `${number}`;
            let numberDigits = number.split(".");
            addCompFormPage.numberOfBathInput.clear().type(number).type("{enter}").should("have.value", number);
            if (numberDigits[1] !== "5") {
                addCompFormPage.numberOfRoomsInput.click();
                addCompFormPage.numberOfBathInput.click();
                addCompFormPage.bathNumbErrorMessage.should("exist");
            }
        } else {
            addCompFormPage.numberOfBathInput.clear().type(number).type("{enter}").should("have.value", number);
        }
    }

    enterInternalNotes(notes) {
        addCompFormPage.internalNotesTextField.should("exist").should("have.attr", "placeholder",
            "Write internal notes that will not be exported.").clear().type(notes).should("have.text", notes);
    }

    verifyUnitAmenitiesFieldName() {
        addCompFormPage.unitAmenitiesFieldName.should("exist").should("have.text", "Unit Amenities");
    }

    clickUnitAmenitiesDropdown() {
        addCompFormPage.unitAmenitiesDropdown.should("be.visible").click();
    }

    checkUncheckCheckboxByQaAttr(attribute, check = true) {
        if (check) {
            addCompFormPage.getCheckboxByDataQaAttr(attribute)
                .should("have.value", "false")
                .scrollIntoView().check({force:true}).should("have.value", "true");
        } else {
            addCompFormPage.getCheckboxByDataQaAttr(attribute)
                .should("have.value", "true")
                .scrollIntoView().uncheck({force:true}).should("have.value", "false");
        }
    }

    checkUncheckListOfCheckboxesByQa(attributes, check = true) {
        attributes.forEach(attr => {
            this.checkUncheckCheckboxByQaAttr(attr, check);
        });
    }

    clickCancelButton() {
        addCompFormPage.cancelButton.should("be.visible").click();
    }

    clickSubmitCompButton() {
        addCompFormPage.submitCompButton.should("not.be.disabled").click();
    }

    fillNewRentCompWithoutNumbTypeSourceNameUrlNoteAmenities(compData) {
        this.enterMonthlyRent(compData.monthly);
        this.enterDate(compData.date);
        this.enterSquareFootage(compData.footage);
        this.selectSourceOfInfoAndVerify(compData.sourceInfo);
        this.enterNumberOfBedrooms(compData.bedrooms);
        this.enterNumberOfRooms(compData.rooms);
        this.enterNumberOfBathrooms(compData.bathrooms);
        this.clickSubmitCompButton();
    }
}

export default new AddCompFormActions();
