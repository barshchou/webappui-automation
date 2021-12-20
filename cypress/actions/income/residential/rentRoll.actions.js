import rentRollPage from "../../../pages/income/residential/rentRoll.page";
import BaseActions from "../../base/base.actions";
import {getNumberFromDollarNumberWithCommas, numberWithCommas} from "../../../../utils/numbers.utils";

class InPlaceRentRollActions extends BaseActions {
    verifyViaCSVExist() {
        rentRollPage.importViaCSVHeader.scrollIntoView().should("be.visible");
    }

    verifyUploadCSVRow(linkToBe) {
        rentRollPage.skipManualRentEntryRow.scrollIntoView().should("be.visible");
        rentRollPage.uploadCSVLink.should("be.visible").should("have.attr", "href", linkToBe);
    }

    /**
     *
     * @param {number, string} unitsNumber
     * @returns {InPlaceRentRollActions}
     */
    verifyNumberOfResidentialUnits(unitsNumber) {
        rentRollPage.numberOfResidentialUnitsField.should("be.disabled").should("have.value", unitsNumber);
        return this;
    }

    /**
     *
     * @param {string, number} unitsNumber
     * @returns {InPlaceRentRollActions}
     */
    verifyNumberOfIsInspectedRows(unitsNumber) {
        if (unitsNumber !== 0) {
            rentRollPage.isInspectedColumnCells.first().scrollIntoView({duration:2000});
            rentRollPage.isInspectedColumnCells.last().scrollIntoView({duration:2000});
        }
        rentRollPage.isInspectedColumnCells.should("have.length", unitsNumber);
        return this;
    }

    clickGoToPropSummaryButton() {
        rentRollPage.goToPropSummaryButton.should("be.visible").click();
    }

    goToPropSummaryWithSaveLeavingFirst() {
        this.clickGoToPropSummaryButton();
        this.clickYesButton();
    }

    goToPropSummaryWithSaveSaveClickFirst() {
        this.clickSaveButton();
        this.clickGoToPropSummaryButton();
    }

    goToPropSummaryWithoutSave() {
        this.clickGoToPropSummaryButton();
        this.clickNoButton();
    }

    verifyThatRentRollOptionsExist() {
        rentRollPage.rentRollOptionsField.should("be.visible");
    }

    verifyColumnExist(columnName, check = true) {
        if (check) {
            rentRollPage.getColumnHeader(columnName).should("exist");
        } else {
            rentRollPage.getColumnHeader(columnName).should("not.exist");
        }
    }

    verifyListColumnExist(columnNames, check = true) {
        for (let i = 0; i < columnNames.length; i++) {
            this.verifyColumnExist(columnNames[i], check);
        }
    }

    checkPerUnitSquareFootage(value = "true") {
        rentRollPage.getPerUnitSFRadio(value).scrollIntoView().should("be.enabled").click();
    }

    /**
     *
     * @param {string} label
     * @param {boolean} check
     * @returns {InPlaceRentRollActions}
     */
    checkCheckboxByLabel(label, check = true) {
        if (check) {
            rentRollPage.getCheckboxByLabel(label).scrollIntoView().should("be.enabled")
                .check().should("be.checked");
        } else {
            rentRollPage.getCheckboxByLabel(label).scrollIntoView().should("be.enabled")
                .uncheck().should("not.be.checked");
        }
        return this;
    }

    verifyCheckboxByLabelIsCheckedOrNot(label, check = true) {
        if (check) {
            rentRollPage.getCheckboxByLabel(label).should("be.checked");
        } else {
            rentRollPage.getCheckboxByLabel(label).should("not.be.checked");
        }
    }

    checkUncheckCheckbox(columnName, label) {
        this.checkCheckboxByLabel(label);
        this.verifyColumnExist(columnName);
        this.checkCheckboxByLabel(label, false);
        this.verifyColumnExist(columnName, false);
    }

    /**
     *
     * @param {string} label
     * @param {string} columnName
     * @returns {InPlaceRentRollActions}
     */
    checkCheckboxByLabelAndVerify(label, columnName) {
        this.checkCheckboxByLabel(label);
        this.verifyColumnExist(columnName);
        return this;
    }

    checkUncheckPerUnitSquareFootage(columnNames) {
        this.checkPerUnitSquareFootage();
        this.verifyListColumnExist(columnNames);
        this.checkPerUnitSquareFootage("false");
        this.verifyListColumnExist(columnNames, false);
    }

    isOptionalColumnExist() {
        rentRollPage.optionalColumnsElement.should("exist");
    }

    uploadFile(fileName, unitsToBe) {
        rentRollPage.uploadFileButton.should("be.visible");
        rentRollPage.uploadFileInput.should("exist").attachFile(fileName);
        rentRollPage.importDataButton.should("exist").should("be.enabled").click();
        this.verifyNumberOfResidentialUnits(unitsToBe);
        this.verifyNumberOfIsInspectedRows(unitsToBe);
    }

    /**
     *
     * @param {string} rentType
     * @returns {InPlaceRentRollActions}
     */
    fillAllRentTypeCellsWithEqualValue(rentType) {
        rentRollPage.rentTypeCells.each((cell, i) => {
            this.enterRentTypeCellByRowNumber(rentType, i)
                .verifyRentTypeCellByRowNumber(rentType, i);
        });
        return this;
    }

    /**
     *
     * @param {string} rentType
     * @param {number} rowNumber
     * @returns {InPlaceRentRollActions}
     */
    enterRentTypeCellByRowNumber(rentType, rowNumber = 0) {
        rentRollPage.rentTypeCells.eq(rowNumber).dblclick();
        rentRollPage.textAreaToInput.clear().type(rentType).type("{enter}");
        return this;
    }

    /**
     *
     * @param {string} rentTypeToBe
     * @param {number} rowNumber
     * @returns {InPlaceRentRollActions}
     */
    verifyRentTypeCellByRowNumber(rentTypeToBe, rowNumber = 0) {
        rentRollPage.rentTypeCells.eq(rowNumber).should("contain.text", rentTypeToBe);
        return this;
    }

    /**
     *
     * @param {string, number} number
     * @returns {InPlaceRentRollActions}
     */
    checkIsInspectedByRowNumber(number) {
        rentRollPage.getIsInspectedCheckboxByRowNumber(number).check();
        return this;
    }

    /**
     *
     * @param {Array<string | number>} numbers
     * @returns {InPlaceRentRollActions}
     */
    checkListIsInspectedByRowNumbers(numbers) {
        numbers.forEach(number => {
            this.checkIsInspectedByRowNumber(number);
        });
        return this;
    }

    /**
     *
     * @param {string, number} numberOfUnits
     * @returns {InPlaceRentRollActions}
     */
    enterUnitNumbersByOrderToAll(numberOfUnits) {
        for (let i = 0; i < numberOfUnits; i++) {
            rentRollPage.unitNumberCells.eq(i).dblclick();
            rentRollPage.textAreaToInput.clear().type(`${i + 1}`).type("{enter}");
            rentRollPage.unitNumberCells.eq(i).should("have.text", `${i + 1}`);
        }
        return this;
    }

    /**
     *
     * @param {string, number} value
     * @param {number} number
     * @returns {InPlaceRentRollActions}
     */
    enterRoomsNumberByRowNumber(value, number) {
        rentRollPage.roomsCells.eq(number).dblclick();
        rentRollPage.textAreaToInput.clear().type(value).type("{enter}");
        rentRollPage.roomsCells.eq(number).should("have.text", value);
        return this;
    }

    /**
     *
     * @param {string, number} roomsNumber
     * @param {number} numberOfUnits
     * @returns {InPlaceRentRollActions}
     */
    enterAllEqualRoomsNumber(roomsNumber, numberOfUnits) {
        for (let i = 0; i < numberOfUnits; i++) {
            this.enterRoomsNumberByRowNumber(roomsNumber, i);
        }
        return this;
    }

    /**
     *
     * @param {string, number} bedroomsNumber
     * @param {number} rowNumber
     * @returns {InPlaceRentRollActions}
     */
    enterBedroomsNumberByRowNumber(bedroomsNumber, rowNumber) {
        rentRollPage.bedroomsCells.eq(rowNumber).dblclick();
        rentRollPage.textAreaToInput.clear().type(bedroomsNumber).type("{enter}");
        rentRollPage.bedroomsCells.eq(rowNumber).should("have.text", bedroomsNumber);
        return this;
    }

    /**
     *
     * @param {string, number} bedroomsNumber
     * @param {number} numberOfUnits
     * @returns {InPlaceRentRollActions}
     */
    enterAllEqualBedroomsNumber(bedroomsNumber, numberOfUnits) {
        for (let i = 0; i < numberOfUnits; i++) {
            this.enterBedroomsNumberByRowNumber(bedroomsNumber, i);
        }
        return this;
    }

    /**
     *
     * @param {string} status
     * @param {number} number
     * @returns {InPlaceRentRollActions}
     */
    enterLeaseStatusByRowNumber(status, number) {
        rentRollPage.leaseStatusCells.eq(number).dblclick();
        rentRollPage.textAreaToInput.clear().type(status).type("{enter}");
        rentRollPage.leaseStatusCells.eq(number).should("contain.text", status);
        return this;
    }

    /**
     *
     * @param {string} leaseStatus
     * @param {number} numberOfUnits
     * @returns {InPlaceRentRollActions}
     */
    enterAllEqualLeaseStatuses(leaseStatus, numberOfUnits) {
        for (let i = 0; i < numberOfUnits; i++) {
            this.enterLeaseStatusByRowNumber(leaseStatus, i);
        }
        return this;
    }

    /**
     *
     * @param {number} forecastValue
     * @param {number} rowNumber
     * @returns {InPlaceRentRollActions}
     */
    enterForecastByRowNumber(forecastValue, rowNumber) {
        const forecastText = `$${numberWithCommas(forecastValue.toFixed(2))}`;
        rentRollPage.rentForecastCells.eq(rowNumber).dblclick();
        rentRollPage.textAreaToInput.clear().type(forecastValue).type("{enter}");
        rentRollPage.rentForecastCells.eq(rowNumber).should("have.text", forecastText);
        return this;
    }

    /**
     *
     * @param {string} forecastValue
     * @param {number} numberOfUnits
     */
    enterAllEqualForecast(forecastValue, numberOfUnits) {
        for (let i = 0; i < numberOfUnits; i++) {
            this.enterForecastByRowNumber(forecastValue, i);
        }
        return this;
    }

    /**
     *
     * @returns {InPlaceRentRollActions}
     */
    verifyMonthlyTotalForecastEqualValue() {
        rentRollPage.rentForecastCells.then(cells => {
            let totalToBe = 0;
            for (let i = 0; i < cells.length; i++) {
                let cellNumber = getNumberFromDollarNumberWithCommas(cells.eq(i).text());
                totalToBe += cellNumber;
            }
            const textToBe = `$${numberWithCommas(totalToBe.toFixed(2))}`;
            rentRollPage.monthlyTotalForecast.should("have.text", textToBe);
        });
        return this;
    }

    /**
     *
     * @returns {InPlaceRentRollActions}
     */
    verifyAnnuallyTotalForecastEqualValue() {
        rentRollPage.monthlyTotalForecast.then(monthly => {
            const monthlyNumber = getNumberFromDollarNumberWithCommas(monthly.text());
            const textToBe = `$${numberWithCommas((monthlyNumber * 12).toFixed(2))}`;
            rentRollPage.annualTotalForecast.should("have.text", textToBe);
        });
        return this;
    }

    /**
     *
     * @param {string} commentaryToBe
     * @returns {InPlaceRentRollActions}
     */
    verifyRentRollCommentary(commentaryToBe) {
        rentRollPage.rentRollCommentary.should("have.text", commentaryToBe);
        return this;
    }
}

export default new InPlaceRentRollActions();