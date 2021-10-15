import rentRollPage from "../../../pages/income/residental/rentRoll.page";
import BaseActions from "../../base/base.actions";

class InPlaceRentRollActions extends BaseActions {
    verifyViaCSVExist() {
        rentRollPage.importViaCSVHeader.scrollIntoView().should("be.visible");
    }

    verifyUploadCSVRow(linkToBe) {
        rentRollPage.skipManualRentEntryRow.scrollIntoView().should("be.visible");
        rentRollPage.uploadCSVLink.should("be.visible").should("have.attr", "href", linkToBe);
    }

    verifyNumberOFResidentalUnits(unitsNumber) {
        rentRollPage.numberOfResidentalUnitsField.should("be.disabled").should("have.value", unitsNumber);
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
        this.verifyNumberOFResidentalUnits(unitsToBe);
        this.verifyNumberOfIsInspectedRows(unitsToBe);
    }

    fillAllRentTypeCells(rentType) {
        rentRollPage.rentTypeCells.then(cells => {
            const cellsToFill = cells.length - 2;
            for (let i = 0; i < cellsToFill; i++) {
                this.enterRentTypeCellByRowNumber(rentType);
                this.verifyRentTypeCellByRowNumber(rentType);
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
}

export default new InPlaceRentRollActions();