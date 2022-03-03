import rentRollPage from "../../../pages/income/residential/rentRoll.page";
import BaseActions from "../../base/base.actions";
import {
    getNumberFromDollarNumberWithCommas,
    isDecimal,
    isHalfDecimalPart,
    numberWithCommas
} from "../../../../utils/numbers.utils";
import {isProdEnv} from "../../../../utils/env.utils";

class InPlaceRentRollActions extends BaseActions {

    verifyViaCSVExist() {
        rentRollPage.importViaCSVHeader.scrollIntoView().should("be.visible");
        return this;
    }

    /**
     * @param {Readonly<{prodLink: string, othersLink: string}>} links
     * @returns {InPlaceRentRollActions}
     */
    verifyUploadCSVRow(links) {
        let linkToBe;
        if (isProdEnv()) {
            linkToBe = links.prodLink;
        } else {
            linkToBe = links.othersLink;
        }
        rentRollPage.skipManualRentEntryRow.scrollIntoView().should("be.visible");
        rentRollPage.uploadCSVLink.should("be.visible").should("have.attr", "href", linkToBe);
        return this;
    }

    /**
     * @param {number | string} unitsNumber
     * @returns {InPlaceRentRollActions}
     */
    verifyNumberOfResidentialUnits(unitsNumber) {
        rentRollPage.numberOfResidentialUnitsField.should("be.disabled").should("have.value", unitsNumber);
        return this;
    }

    /**
     * @param {string | number} unitsNumber
     * @returns {InPlaceRentRollActions}
     */
    verifyNumberOfIsInspectedRows(unitsNumber) {
        if (unitsNumber !== 0) {
            rentRollPage.isInspectedColumnCells.first().scrollIntoView({duration: 2000});
            rentRollPage.isInspectedColumnCells.last().scrollIntoView({duration: 2000});
        }
        rentRollPage.isInspectedColumnCells.should("have.length", unitsNumber);
        return this;
    }

    clickGoToPropSummaryButton() {
        rentRollPage.goToPropSummaryButton.should("be.visible").click();
        return this;
    }

    goToPropSummaryWithSaveLeavingFirst() {
        this.clickGoToPropSummaryButton()
            .clickYesButton();
        return this;
    }

    goToPropSummaryWithSaveSaveClickFirst() {
        this.clickSaveButton();
        this.clickGoToPropSummaryButton();
        return this;
    }

    goToPropSummaryWithoutSave() {
        this.clickGoToPropSummaryButton()
            .clickNoButton();
        return this;
    }

    /**
     * @param {string} columnName
     * @returns {InPlaceRentRollActions}
     */
    verifyColumnExist(columnName) {
        rentRollPage.getColumnHeader(columnName).should("exist");
        return this;
    }

    /**
     * @param {string} columnName
     * @returns {InPlaceRentRollActions}
     */
    verifyColumnNotExist(columnName) {
        rentRollPage.getColumnHeader(columnName).should("not.exist");
        return this;
    }

    /**
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
     * @param {string} value
     * @returns {InPlaceRentRollActions}
     */
    checkPerUnitSquareFootage(value = "true") {
        rentRollPage.getPerUnitSFRadio(value).should("not.be.checked").scrollIntoView()
            .click().should("be.checked");
        return this;
    }

    /**
     * @param {string} label
     * @returns {InPlaceRentRollActions}
     */
    checkCheckboxByLabel(label) {
        rentRollPage.getCheckboxByLabel(label).scrollIntoView().should("have.value", "false")
            .check().should("have.value", "true");
        return this;
    }

    /**
     * @param {string} label
     * @returns {InPlaceRentRollActions}
     */
    uncheckCheckboxByLabel(label) {
        rentRollPage.getCheckboxByLabel(label).scrollIntoView().should("have.value", "true")
            .uncheck().should("have.value", "false");
        return this;
    }

    /**
     * @param {string} label
     * @returns {InPlaceRentRollActions}
     */
    verifyCheckboxIsChecked(label) {
        rentRollPage.getCheckboxByLabel(label).should("have.value", "true");
        return this;
    }

    /**
     * @param {string} label
     * @returns {InPlaceRentRollActions}
     */
    verifyCheckboxNotExist(label) {
        rentRollPage.getCheckboxByLabel(label).should("not.exist");
        return this;
    }

    /**
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
     * @param {string} filePath
     * @param {number} unitsToBe
     * @returns {InPlaceRentRollActions}
     */
    uploadFile(filePath, unitsToBe) {
        rentRollPage.uploadFileButton.should("be.visible");
        rentRollPage.uploadFileInput.should("exist").attachFile(filePath);
        rentRollPage.importDataButton.should("exist").should("be.enabled").click();
        this.verifyNumberOfResidentialUnits(unitsToBe);
        this.verifyNumberOfIsInspectedRows(unitsToBe);
        return this;
    }

    fillAllRentTypeCellsWithEqualValue(rentType: string): this {
        rentRollPage.rentTypeCells.each((cell, i) => {
            this.enterRentTypeCellByRowNumber(rentType, i)
                .verifyRentTypeCellByRowNumber(rentType, i);
        });
        return this;
    }

    enterRentTypeCellByRowNumber(rentType: string, rowNumber: number = 0): this {
        rentRollPage.rentTypeCells.eq(rowNumber).dblclick();
        this.enterTextToTextarea(rentType);
        return this;
    }

    verifyRentTypeCellByRowNumber(rentTypeToBe: string, rowNumber: number = 0): this {
        rentRollPage.rentTypeCells.eq(rowNumber).should("contain.text", rentTypeToBe);
        return this;
    }

    /**
     * @param {string | number} number
     * @returns {InPlaceRentRollActions}
     */
    checkIsInspectedByRowNumber(number) {
        rentRollPage.getIsInspectedCheckboxByRowNumber(number).check();
        return this;
    }

    /**
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
     * @param {string | number} numberOfUnits
     * @returns {InPlaceRentRollActions}
     */
    enterUnitNumbersByOrderToAll(numberOfUnits) {
        for (let i = 0; i < numberOfUnits; i++) {
            rentRollPage.unitNumberCells.eq(i).dblclick();
            this.enterTextToTextarea(`${i + 1}`);
            rentRollPage.unitNumberCells.eq(i).should("have.text", `${i + 1}`);
        }
        return this;
    }

    /**
     * @param {string | number} value
     * @param {number} number
     * @returns {InPlaceRentRollActions}
     */
    enterRoomsNumberByRowNumber(value, number) {
        rentRollPage.roomsCells.eq(number).dblclick();
        this.enterTextToTextarea(value);
        rentRollPage.roomsCells.eq(number).should("have.text", value);
        return this;
    }

    /**
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
     * @param {string | number} bedroomsNumber
     * @param {number} rowNumber
     * @returns {InPlaceRentRollActions}
     */
    enterBedroomsNumberByRowNumber(bedroomsNumber, rowNumber = 0) {
        rentRollPage.bedroomsCells.eq(rowNumber).dblclick();
        this.enterTextToTextarea(bedroomsNumber);
        rentRollPage.bedroomsCells.eq(rowNumber).should("have.text", bedroomsNumber);
        return this;
    }

    /**
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

    enterLeaseStatusByRowNumber(status: string, number: number = 0): this {
        rentRollPage.leaseStatusCells.eq(number).dblclick();
        this.enterTextToTextarea(status);
        rentRollPage.leaseStatusCells.eq(number).should("contain.text", status);
        return this;
    }

    enterAllEqualLeaseStatuses(leaseStatus: string, numberOfUnits: number): this {
        for (let i = 0; i < numberOfUnits; i++) {
            this.enterLeaseStatusByRowNumber(leaseStatus, i);
        }
        return this;
    }

    /**
     * @param {number | string} forecastValue
     * @param {number} rowNumber
     * @returns {InPlaceRentRollActions}
     */
    enterForecastByRowNumber(forecastValue, rowNumber = 0) {
        let forecastText;
        if (typeof forecastValue === "number") {
            forecastText = `$${numberWithCommas(forecastValue.toFixed(2))}`;
        } else {
            if ((Number(forecastValue)).toFixed && !isNaN(Number(forecastValue))) {
                forecastText = `$${numberWithCommas((Number(forecastValue)).toFixed(2))}`;
            } else {
                forecastText = "$0.00";
            }
        }
        rentRollPage.rentForecastCells.eq(rowNumber).dblclick();
        this.enterTextToTextarea(forecastValue);
        rentRollPage.rentForecastCells.eq(rowNumber).should("have.text", forecastText);
        return this;
    }

    enterMonthlyRentByRowNumber(value: string | number, rowNumber: number = 0): this {
        const textToBe = typeof value === "string" ? value : `$${numberWithCommas(value.toFixed(2))}`;
        rentRollPage.monthlyRentCells.eq(rowNumber).dblclick();
        this.enterTextToTextarea(`${value}`);
        rentRollPage.monthlyRentCells.eq(rowNumber).should("have.text", textToBe);
        return this;
    }

    enterAllEqualMonthlyRents(monthlyRent: string | number, numberOfUnits: number): this {
        for (let i = 0; i < numberOfUnits; i++) {
            this.enterMonthlyRentByRowNumber(monthlyRent, i);
        }
        return this;
    }

    /**
     * @param {string} forecastValue
     * @param {number} numberOfUnits
     */
    enterAllEqualForecast(forecastValue, numberOfUnits) {
        for (let i = 0; i < numberOfUnits; i++) {
            this.enterForecastByRowNumber(forecastValue, i);
        }
        return this;
    }

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

    verifyAnnuallyTotalForecastEqualValue() {
        rentRollPage.monthlyTotalForecast.then(monthly => {
            const monthlyNumber = getNumberFromDollarNumberWithCommas(monthly.text());
            const textToBe = `$${numberWithCommas((monthlyNumber * 12).toFixed(2))}`;
            rentRollPage.annualTotalForecast.should("have.text", textToBe);
        });
        return this;
    }

    /**
     * @param {string} commentaryToBe
     * @returns {InPlaceRentRollActions}
     */
    verifyRentRollCommentary(commentaryToBe) {
        rentRollPage.rentRollCommentary.should("have.text", commentaryToBe);
        return this;
    }

    clickCloseIcon() {
        rentRollPage.closeIcon.click();
        return this;
    }

    /**
     * @param {number} numberOfUnits
     * @returns {InPlaceRentRollActions}
     */
    verifyNumberOfUnitsNumberCells(numberOfUnits = 0) {
        if (numberOfUnits === 0) {
            rentRollPage.unitNumberCells.should("not.exist");
        } else {
            rentRollPage.unitNumberCells.should("have.length", numberOfUnits);
        }
        return this;
    }

    /**
     * @param {number} numberOfUnits
     * @returns {InPlaceRentRollActions}
     */
    verifyNumberOfNumberCells(numberOfUnits = 0) {
        if (numberOfUnits === 0) {
            rentRollPage.numberCells.should("not.exist");
        } else {
            rentRollPage.numberCells.should("have.length", numberOfUnits);
        }
        return this;
    }

    /**
     * @param {string} space
     * @param {number} rowNumber
     * @returns {InPlaceRentRollActions}
     */
    enterOutdoorSpaceByOptionByRow(space, rowNumber = 0) {
        rentRollPage.outdoorSpaceCells.eq(rowNumber).dblclick();
        this.chooseOptionFromTableListbox(space);
        rentRollPage.outdoorSpaceCells.should("contain.text", space);
        return this;
    }

    /**
     * @private
     * @param {string} option
     * @returns {InPlaceRentRollActions}
     */
    chooseOptionFromTableListbox(option) {
        rentRollPage.tableListboxOptions.contains(option).click();
        return this;
    }

    /**
     * @param {string | number} value
     * @param {number} rowNumber
     * @returns {InPlaceRentRollActions}
     */
    enterSquareFootageByRow(value, rowNumber = 0) {
        rentRollPage.squareFootageCells.eq(rowNumber).dblclick();
        this.enterTextToTextarea(value);
        let number = typeof value === "string" ? getNumberFromDollarNumberWithCommas(value) : value;
        let textToBe;
        if (number > (99 * Math.pow(10, 19))) {
            textToBe = "NaN";
        } else {
            textToBe = typeof value === "string" ? value : numberWithCommas(value.toFixed(2));
        }
        rentRollPage.squareFootageCells.eq(rowNumber).should("have.text", textToBe);
        return this;
    }

    /**
     * @param {number | string} value
     * @param rowNumber
     * @returns {InPlaceRentRollActions}
     */
    enterNumberBathroomsByRow(value, rowNumber = 0) {
        rentRollPage.bathroomsCells.eq(rowNumber).dblclick();
        this.enterTextToTextarea(value);
        rentRollPage.bathroomsCells.eq(rowNumber).should("have.text", value).as("checkedTextBathroom");
        if ((isDecimal(value) && !isHalfDecimalPart(value)) || Number(value) < 0) {
            cy.get("@checkedTextBathroom").should("have.class", "invalid");
        }
        return this;
    }

    private enterTextToTextarea(text: string): this {
        rentRollPage.textAreaToInput.clear().type(text).type("{enter}");
        return this;
    }

    /**
     * @param {string} type
     * @param {number} rowNumber
     * @returns {InPlaceRentRollActions}
     */
    chooseUnitTypeByRow(type, rowNumber = 0) {
        rentRollPage.unitTypeCells.eq(rowNumber).dblclick();
        this.chooseOptionFromTableListbox(type);
        rentRollPage.unitTypeCells.eq(rowNumber).should("contain.text", type);
        return this;
    }
}

export default new InPlaceRentRollActions();