import rentRollPage from "../../../pages/income/residential/rentRoll.page";
import BaseActions from "../../base/base.actions";
import {numberWithCommas} from "../../../../utils/numbers.utils";

class InPlaceRentRollActions extends BaseActions {
    verifyViaCSVExist() {
        rentRollPage.importViaCSVHeader.scrollIntoView().should("be.visible");
    }

    verifyUploadCSVRow(linkToBe) {
        rentRollPage.skipManualRentEntryRow.scrollIntoView().should("be.visible");
        rentRollPage.uploadCSVLink.should("be.visible").should("have.attr", "href", linkToBe);
    }

    verifyNumberOFResidentialUnits(unitsNumber) {
        rentRollPage.numberOfResidentialUnitsField.should("be.disabled").should("have.value", unitsNumber);
    }

    verifyNumberOfIsInspectedRows(unitsNumber) {
        if (unitsNumber !== 0) {
            rentRollPage.isInspectedColumnCells.first().scrollIntoView({duration:2000});
            rentRollPage.isInspectedColumnCells.last().scrollIntoView({duration:2000});
        }
        rentRollPage.isInspectedColumnCells.should("have.length", unitsNumber);
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

    checkCheckboxByLabel(label, check = true) {
        if (check) {
            rentRollPage.getCheckboxByLabel(label).scrollIntoView().should("be.enabled")
                .check().should("be.checked");
        } else {
            rentRollPage.getCheckboxByLabel(label).scrollIntoView().should("be.enabled")
                .uncheck().should("not.be.checked");
        }
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

    checkCheckboxByLabelAndVerify(label, columnName) {
        this.checkCheckboxByLabel(label);
        this.verifyColumnExist(columnName);
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
        this.verifyNumberOFResidentialUnits(unitsToBe);
        this.verifyNumberOfIsInspectedRows(unitsToBe);
    }

    fillAllRentTypeCellsWithEqualValue(rentType) {
        rentRollPage.rentTypeCells.then(cells => {
            for (let i = 0; i < cells.length; i++) {
                this.enterRentTypeCellByRowNumber(rentType, i);
                this.verifyRentTypeCellByRowNumber(rentType, i);
            }
        });
    }

    enterRentTypeCellByRowNumber(rentType, rowNumber = 0) {
        rentRollPage.rentTypeCells.eq(rowNumber).dblclick();
        rentRollPage.textAreaToInput.clear().type(rentType).type("{enter}");
    }

    verifyRentTypeCellByRowNumber(rentTypeToBe, rowNumber = 0) {
        rentRollPage.rentTypeCells.eq(rowNumber).should("contain.text", rentTypeToBe);
    }

    checkIsInspectedByRowNumber(number) {
        rentRollPage.getIsInspectedCheckboxByRowNumber(number).check();
    }

    checkListIsInspectedByRowNumbers(numbers) {
        numbers.forEach(number => {
            this.checkIsInspectedByRowNumber(number);
        });
    }

    enterUnitNumbersByOrderToAll(numberOfUnits) {
        for (let i = 0; i < numberOfUnits; i++) {
            rentRollPage.unitNumberCells.eq(i).dblclick();
            rentRollPage.textAreaToInput.clear().type(`${i + 1}`).type("{enter}");
            rentRollPage.unitNumberCells.eq(i).should("have.text", `${i + 1}`);
        }
    }

    enterRoomsNumberByRowNumber(value, number) {
        rentRollPage.roomsCells.eq(number).dblclick();
        rentRollPage.textAreaToInput.clear().type(value).type("{enter}");
        rentRollPage.roomsCells.eq(number).should("have.text", value);
    }

    enterAllEqualRoomsNumber(roomsNumber, numberOfUnits) {
        for (let i = 0; i < numberOfUnits; i++) {
            this.enterRoomsNumberByRowNumber(roomsNumber, i);
        }
    }

    enterBedroomsNumberByRowNumber(bedroomsNumber, rowNumber) {
        rentRollPage.bedroomsCells.eq(rowNumber).dblclick();
        rentRollPage.textAreaToInput.clear().type(bedroomsNumber).type("{enter}");
        rentRollPage.bedroomsCells.eq(rowNumber).should("have.text", bedroomsNumber);
    }

    enterAllEqualBedroomsNumber(bedroomsNumber, numberOfUnits) {
        for (let i = 0; i < numberOfUnits; i++) {
            this.enterBedroomsNumberByRowNumber(bedroomsNumber, i);
        }
    }

    enterLeaseStatusByRowNumber(status, number) {
        rentRollPage.leaseStatusCells.eq(number).dblclick();
        rentRollPage.textAreaToInput.clear().type(status).type("{enter}");
        rentRollPage.leaseStatusCells.eq(number).should("contain.text", status);
    }

    enterAllEqualLeaseStatuses(leaseStatus, numberOfUnits) {
        for (let i = 0; i < numberOfUnits; i++) {
            this.enterLeaseStatusByRowNumber(leaseStatus, i);
        }
    }

    enterForecastByRowNumber(forecastValue, rowNumber) {
        const forecastText = `$${numberWithCommas(forecastValue.toFixed(2))}`;
        rentRollPage.rentForecastCells.eq(rowNumber).dblclick();
        rentRollPage.textAreaToInput.clear().type(forecastValue).type("{enter}");
        rentRollPage.rentForecastCells.eq(rowNumber).should("have.text", forecastText);
    }

    enterAllEqualForecast(forecastValue, numberOfUnits) {
        for (let i = 0; i < numberOfUnits; i++) {
            this.enterForecastByRowNumber(forecastValue, i);
        }
    }

    verifyMonthlyTotalForecastEqualValue(forecast, numberOfUnits) {
        const textToBe = `$${numberWithCommas((forecast * numberOfUnits).toFixed(2))}`;
        rentRollPage.monthlyTotalForecast.should("have.text", textToBe);
    }

    verifyAnnuallyTotalForecastEqualValue(forecast, numberOfUnits) {
        const textToBe = `$${numberWithCommas((forecast * numberOfUnits * 12).toFixed(2))}`;
        rentRollPage.annualTotalForecast.should("have.text", textToBe);
    }

    verifyRentRollCommentary(commentaryToBe) {
        rentRollPage.rentRollCommentary.should("have.text", commentaryToBe);
    }
}

export default new InPlaceRentRollActions();