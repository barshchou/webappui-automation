import addCompFormPage from "../../../../pages/income/residential/rent_comps/addCompForm.page";
import {getTodayDateString, getTodayDay, isDateHasCorrectFormat} from "../../../../../utils/date.utils";
import {isDecimal, numberWithCommas} from "../../../../../utils/numbers.utils";

class AddCompFormActions {

    /**
     *
     * @returns {AddCompFormActions}
     */
    clickCloseButton() {
        addCompFormPage.closeButton.should("be.enabled").click();
        return this;
    }

    /**
     *
     * @returns {AddCompFormActions}
     */
    verifyPropAddressExist() {
        addCompFormPage.propAddressField.should("be.visible").should("not.be.empty");
        return this;
    }

    /**
     *
     * @returns {AddCompFormActions}
     */
    verifyUnitNumbFieldName() {
        addCompFormPage.unitNumbFieldName.should("exist").should("have.text", "Unit Number");
        return this;
    }

    /**
     *
     * @param {string} unitNumber
     * @returns {AddCompFormActions}
     */
    enterUnitNumber(unitNumber) {
        addCompFormPage.unitNumbInput.clear().type(unitNumber).should("have.value", unitNumber);
        return this;
    }

    /**
     *
     * @returns {AddCompFormActions}
     */
    clickUnitTypeDropdown() {
        addCompFormPage.unitTypeDropdown.should("be.visible").click();
        return this;
    }

    /**
     *
     * @param {string} value
     * @returns {AddCompFormActions}
     */
    selectUnitTypeByValue(value) {
        addCompFormPage.getUnitTypeByValue(value).scrollIntoView().should("be.visible").click();
        return this;
    }

    /**
     *
     * @param {string} valueToBe
     * @returns {AddCompFormActions}
     */
    verifyUnitTypeValue(valueToBe) {
        addCompFormPage.unitTypeInputToCheck.should("have.value", valueToBe);
        return this;
    }

    /**
     *
     * @param {string} value
     * @returns {AddCompFormActions}
     */
    selectUnitTypeAndVerify(value) {
        this.clickUnitTypeDropdown()
            .selectUnitTypeByValue(value)
            .verifyUnitTypeValue(value);
        return this;
    }

    /**
     *
     * @param {Array<string>} values
     * @returns {AddCompFormActions}
     */
    selectListUnitTypes(values) {
        values.forEach(value => {
           this.selectUnitTypeAndVerify(value);
        });
        return this;
    }

    /**
     *
     * @returns {AddCompFormActions}
     */
    verifyMonthRentFieldName() {
        addCompFormPage.monthRentFieldName.should("exist").should("contain.text", "Monthly Rent");
        return this;
    }

    /**
     *
     * @param {string, number} rent
     * @returns {AddCompFormActions}
     */
    enterMonthlyRent(rent) {
        const textToBe = typeof rent === "string" ? rent : numberWithCommas(rent);
        addCompFormPage.monthRentInput.clear().type(rent).should("have.value", textToBe);
        return  this;
    }

    /**
     *
     * @returns {AddCompFormActions}
     */
    clearDateInput() {
        addCompFormPage.dateOfValueInput.clear();
        return this;
    }

    /**
     *
     * @param {string} [date]
     * @returns {AddCompFormActions}
     */
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
        return this;
    }

    /**
     *
     * @param {string} dateToBe
     * @returns {AddCompFormActions}
     */
    verifyEnteredDate(dateToBe) {
        dateToBe = dateToBe ?? getTodayDateString();
        addCompFormPage.dateInputValue.should("have.value", dateToBe);
        return this;
    }

    /**
     *
     * @param {string} [day]
     * @returns {AddCompFormActions}
     */
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
        return this;
    }

    /**
     *
     * @returns {AddCompFormActions}
     */
    verifySquareFootageFieldName() {
        addCompFormPage.squareFootageFieldName.should("exist")
            .should("have.text", "Unit Square Footage");
        return this;
    }

    /**
     *
     * @param {string, number} footage
     * @returns {AddCompFormActions}
     */
    enterSquareFootage(footage) {
        const textToBe = typeof footage === "string" ? footage : numberWithCommas(footage);
        addCompFormPage.squareFootageInput.clear().type(footage).should("have.value", textToBe);
        return this;
    }

    /**
     *
     * @returns {AddCompFormActions}
     */
    clickSourceOfInfoDropdown() {
        addCompFormPage.sourceOfInfoDropdown.click({force:true});
        return this;
    }

    /**
     *
     * @param {string} value
     * @returns {AddCompFormActions}
     */
    selectSourceOfInfoByValue(value) {
        addCompFormPage.getSourceOfInfoByValue(value).click({force:true});
        return this;
    }

    /**
     *
     * @param {string} valueToBe
     * @returns {AddCompFormActions}
     */
    verifySelectedSource(valueToBe) {
        addCompFormPage.sourceOfInfoInputToCheck.should("have.value", valueToBe);
        return this;
    }

    /**
     *
     * @param {string} value
     * @returns {AddCompFormActions}
     */
    selectSourceOfInfoAndVerify(value) {
        this.clickSourceOfInfoDropdown()
            .selectSourceOfInfoByValue(value)
            .verifySelectedSource(value);
        return this;
    }

    /**
     *
     * @param {Array<string>} values
     * @returns {AddCompFormActions}
     */
    selectListSourceOfInfoAndVerify(values) {
        values.forEach(value => {
            this.selectSourceOfInfoAndVerify(value);
        });
        return this;
    }

    /**
     *
     * @returns {AddCompFormActions}
     */
    verifyNumberOfBedroomsFiledName() {
        addCompFormPage.numberOfBedroomsFieldName.should("exist")
            .should("contain.text", "Number of Bedrooms");
        return this;
    }

    /**
     *
     * @param {number, string} number
     * @returns {AddCompFormActions}
     */
    enterNumberOfBedrooms(number) {
        addCompFormPage.bedroomsInput.clear().type(number).should("have.value", number);
        return this;
    }

    /**
     *
     * @param {string} name
     * @returns {AddCompFormActions}
     */
    enterSourceName(name) {
        addCompFormPage.sourceNameInput.should("exist").clear().type(name).should("have.value", name);
        return this;
    }

    /**
     *
     * @returns {AddCompFormActions}
     */
    verifySourceNameNotExist() {
        addCompFormPage.sourceNameInput.should("not.exist");
        return this;
    }

    /**
     *
     * @returns {AddCompFormActions}
     */
    verifySourceUrlNotExist() {
        addCompFormPage.sourceUrlInput.should("not.exist");
        return this;
    }

    /**
     *
     * @param {string} url
     * @returns {AddCompFormActions}
     */
    enterSourceUrl(url) {
        addCompFormPage.sourceUrlInput.should("exist").clear().type(url).should("have.value", url);
        return this;
    }

    /**
     *
     * @returns {AddCompFormActions}
     */
    verifyNumberOfRoomsFieldName() {
        addCompFormPage.numberOfRoomsFieldName.should("exist")
            .should("contain.text", "Number of Rooms");
        return this;
    }

    /**
     *
     * @param {number, string} numberOfRooms
     * @returns {AddCompFormActions}
     */
    enterNumberOfRooms(numberOfRooms) {
        addCompFormPage.numberOfRoomsInput.clear().type(numberOfRooms).should("have.value", numberOfRooms);
        return this;
    }

    /**
     *
     * @returns {AddCompFormActions}
     */
    verifyNumberOfBathFieldName() {
        addCompFormPage.numberOfBathFieldName.should("exist")
            .should("have.text", "Number of Bathrooms");
        return this;
    }

    /**
     *
     * @param {number, string} number
     * @returns {AddCompFormActions}
     */
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
        return this;
    }

    /**
     *
     * @param {string} notes
     * @returns {AddCompFormActions}
     */
    enterInternalNotes(notes) {
        addCompFormPage.internalNotesTextField.should("exist").should("have.attr", "placeholder",
            "Write internal notes that will not be exported.").clear().type(notes).should("have.text", notes);
        return this;
    }

    /**
     *
     * @returns {AddCompFormActions}
     */
    verifyUnitAmenitiesFieldName() {
        addCompFormPage.unitAmenitiesFieldName.should("exist").should("have.text", "Unit Amenities");
        return this;
    }

    /**
     *
     * @returns {AddCompFormActions}
     */
    clickUnitAmenitiesDropdown() {
        addCompFormPage.unitAmenitiesDropdown.should("be.visible").click();
        return this;
    }

    /**
     *
     * @param {string} attribute
     * @returns {AddCompFormActions}
     */
    checkCheckboxByQaAttr(attribute) {
        addCompFormPage.getCheckboxByDataQaAttr(attribute)
            .should("have.value", "false")
            .scrollIntoView().check({force:true}).should("have.value", "true");
        return this;
    }

    /**
     *
     * @param {string} attribute
     * @returns {AddCompFormActions}
     */
    uncheckCheckboxByQaAttr(attribute) {
        addCompFormPage.getCheckboxByDataQaAttr(attribute)
            .should("have.value", "true")
            .scrollIntoView().uncheck({force:true}).should("have.value", "false");
        return this;
    }

    /**
     *
     * @param {Array<string>} attributes
     * @returns {AddCompFormActions}
     */
    checkListOfCheckboxesByQa(attributes) {
        attributes.forEach(attr => {
            this.checkCheckboxByQaAttr(attr);
        });
        return this;
    }

    /**
     *
     * @param {Array<string>} attributes
     * @returns {AddCompFormActions}
     */
    uncheckListOfCheckboxesByQa(attributes) {
        attributes.forEach(attr => {
            this.uncheckCheckboxByQaAttr(attr);
        });
        return this;
    }

    /**
     *
     * @returns {AddCompFormActions}
     */
    clickCancelButton() {
        addCompFormPage.cancelButton.should("be.visible").click();
        return this;
    }

    /**
     *
     * @returns {AddCompFormActions}
     */
    clickSubmitCompButton() {
        addCompFormPage.submitCompButton.should("not.be.disabled").click();
        return this;
    }

    /**
     *
     * @param {Readonly<{monthly: number | string, date: string, footage: number, sourceInfo: string, bedrooms: number,
     * rooms: number, bathrooms: number}>} compData
     * @returns {AddCompFormActions}
     */
    fillNewRentCompWithoutNumbTypeSourceNameUrlNoteAmenities(compData) {
        this.enterMonthlyRent(compData.monthly)
            .enterDate(compData.date)
            .enterSquareFootage(compData.footage)
            .selectSourceOfInfoAndVerify(compData.sourceInfo)
            .enterNumberOfBedrooms(compData.bedrooms)
            .enterNumberOfRooms(compData.rooms)
            .enterNumberOfBathrooms(compData.bathrooms)
            .clickSubmitCompButton();
        return this;
    }
}

export default new AddCompFormActions();
