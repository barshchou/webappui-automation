import rentRollPage from "../../../pages/income/residential/rentRoll.page";
import BaseActions from "../../base/base.actions";
import {getNumberFromDollarNumberWithCommas, numberWithCommas} from "../../../../utils/numbers.utils";

class InPlaceRentRollActions extends BaseActions {

    /**
     *
     * @returns {InPlaceRentRollActions}
     */
    verifyViaCSVExist() {
        rentRollPage.importViaCSVHeader.scrollIntoView().should("be.visible");
        return this;
    }

    /**
     *
     * @param {Readonly<{prodLink: string, othersLink: string}>} links
     * @returns {InPlaceRentRollActions}
     */
    verifyUploadCSVRow(links) {
        let linkToBe;
        if (Cypress.env("url") === "prod") {
            linkToBe = links.prodLink;
        } else {
            linkToBe = links.othersLink;
        }
        rentRollPage.skipManualRentEntryRow.scrollIntoView().should("be.visible");
        rentRollPage.uploadCSVLink.should("be.visible").should("have.attr", "href", linkToBe);
        return this;
    }

    /**
     *
     * @param {number | string} unitsNumber
     * @returns {InPlaceRentRollActions}
     */
    verifyNumberOfResidentialUnits(unitsNumber) {
        rentRollPage.numberOfResidentialUnitsField.should("be.disabled").should("have.value", unitsNumber);
        return this;
    }

    /**
     *
     * @param {string | number} unitsNumber
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

    /**
     *
     * @returns {InPlaceRentRollActions}
     */
    clickGoToPropSummaryButton() {
        rentRollPage.goToPropSummaryButton.should("be.visible").click();
        return this;
    }

    /**
     *
     * @returns {InPlaceRentRollActions}
     */
    goToPropSummaryWithSaveLeavingFirst() {
        this.clickGoToPropSummaryButton()
            .clickYesButton();
        return this;
    }

    /**
     *
     * @returns {InPlaceRentRollActions}
     */
    goToPropSummaryWithSaveSaveClickFirst() {
        this.clickSaveButton();
        this.clickGoToPropSummaryButton();
        return this;
    }

    /**
     *
     * @returns {InPlaceRentRollActions}
     */
    goToPropSummaryWithoutSave() {
        this.clickGoToPropSummaryButton()
            .clickNoButton();
        return this;
    }

    /**
     *
     * @returns {InPlaceRentRollActions}
     */
    verifyThatRentRollOptionsExist() {
        rentRollPage.rentRollOptionsField.should("be.visible");
        return this;
    }

    /**
     *
     * @param {string} columnName
     * @returns {InPlaceRentRollActions}
     */
    verifyColumnExist(columnName) {
        rentRollPage.getColumnHeader(columnName).should("exist");
        return this;
    }

    /**
     *
     * @param {string} columnName
     * @returns {InPlaceRentRollActions}
     */
    verifyColumnNotExist(columnName) {
        rentRollPage.getColumnHeader(columnName).should("not.exist");
        return this;
    }

    /**
     *
     * @param {Array<string>} columnNames
     * @returns {InPlaceRentRollActions}
     */
    verifyListColumnExist(columnNames) {
        columnNames.forEach(column => {
            this.verifyColumnExist(column);
        });
        return this;
    }

    /**
     *
     * @param {Array<string>} columnNames
     * @returns {InPlaceRentRollActions}
     */
    verifyListColumnNotExist(columnNames) {
        columnNames.forEach(column => {
            this.verifyColumnNotExist(column);
        });
        return this;
    }

    /**
     *
     * @param {string} value
     * @returns {InPlaceRentRollActions}
     */
    checkPerUnitSquareFootage(value = "true") {
        rentRollPage.getPerUnitSFRadio(value).scrollIntoView().should("be.enabled").click();
        return this;
    }

    /**
     *
     * @param {string} label
     * @returns {InPlaceRentRollActions}
     */
    checkCheckboxByLabel(label) {
        rentRollPage.getCheckboxByLabel(label).scrollIntoView().should("be.enabled")
            .check().should("have.value", "true");
        return this;
    }

    /**
     *
     * @param {string} label
     * @returns {InPlaceRentRollActions}
     */
    uncheckCheckboxByLabel(label) {
        rentRollPage.getCheckboxByLabel(label).scrollIntoView().should("be.enabled")
            .uncheck().should("have.value", "false");
        return this;
    }

    /**
     *
     * @param {string} label
     * @returns {InPlaceRentRollActions}
     */
    verifyCheckboxIsChecked(label) {
        rentRollPage.getCheckboxByLabel(label).should("be.checked");
        return this;
    }

    /**
     *
     * @param {string} label
     * @returns {InPlaceRentRollActions}
     */
    verifyCheckboxIsNotChecked(label) {
        rentRollPage.getCheckboxByLabel(label).should("not.be.checked");
        return this;
    }

    /**
     *
     * @param {string} columnName
     * @param {string} label
     * @returns {InPlaceRentRollActions}
     */
    checkUncheckCheckboxForColumn(columnName, label) {
        this.checkCheckboxByLabelAndVerify(label, columnName)
            .uncheckCheckboxByLabel(label)
            .verifyColumnNotExist(columnName);
        return this;
    }

    /**
     *
     * @param {string} label
     * @param {string} columnName
     * @returns {InPlaceRentRollActions}
     */
    checkCheckboxByLabelAndVerify(label, columnName) {
        this.checkCheckboxByLabel(label)
            .verifyColumnExist(columnName);
        return this;
    }

    /**
     *
     * @param columnNames
     * @returns {InPlaceRentRollActions}
     */
    checkUncheckPerUnitSquareFootage(columnNames) {
        this.checkPerUnitSquareFootage()
            .verifyListColumnExist(columnNames)
            .checkPerUnitSquareFootage("false")
            .verifyListColumnNotExist(columnNames);
        return this;
    }

    /**
     *
     * @returns {InPlaceRentRollActions}
     */
    isOptionalColumnExist() {
        rentRollPage.optionalColumnsElement.should("exist");
        return this;
    }

    /**
     *
     * @param {string} fileName
     * @param {number} unitsToBe
     * @returns {InPlaceRentRollActions}
     */
    uploadFile(fileName, unitsToBe) {
        rentRollPage.uploadFileButton.should("be.visible");
        rentRollPage.uploadFileInput.should("exist").attachFile(fileName);
        rentRollPage.importDataButton.should("exist").should("be.enabled").click();
        this.verifyNumberOfResidentialUnits(unitsToBe);
        this.verifyNumberOfIsInspectedRows(unitsToBe);
        return this;
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
     * @param {string | number} number
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
     * @param {string | number} numberOfUnits
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
     * @param {string | number} value
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
     * @param {string | number} roomsNumber
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
     * @param {string | number} bedroomsNumber
     * @param {number} rowNumber
     * @returns {InPlaceRentRollActions}
     */
    enterBedroomsNumberByRowNumber(bedroomsNumber, rowNumber = 0) {
        rentRollPage.bedroomsCells.eq(rowNumber).dblclick();
        rentRollPage.textAreaToInput.clear().type(bedroomsNumber).type("{enter}");
        rentRollPage.bedroomsCells.eq(rowNumber).should("have.text", bedroomsNumber);
        return this;
    }

    /**
     *
     * @param {string | number} bedroomsNumber
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
    enterLeaseStatusByRowNumber(status, number = 0) {
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
     * @param {number | string} forecastValue
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
     * @param {string | number} value
     * @param {number} rowNumber
     * @returns {InPlaceRentRollActions}
     */
    enterMonthlyRentByRowNumber(value, rowNumber = 0) {
        const textToBe = typeof value === "string" ? value : `$${numberWithCommas(value.toFixed(2))}`;
        rentRollPage.monthlyRentCells.eq(rowNumber).dblclick();
        rentRollPage.textAreaToInput.clear().type(value).type("{enter}");
        rentRollPage.monthlyRentCells.eq(rowNumber).should("have.text", textToBe);
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