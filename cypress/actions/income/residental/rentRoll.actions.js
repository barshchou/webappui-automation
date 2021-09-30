import rentRollPage from "../../../pages/income/residental/rentRoll.page";
import BaseActions from "../../base/base.actions";

class InPlaceRentRollActions extends BaseActions {
    verifyViaCSVExist() {
        rentRollPage.importViaCSVHeader.scrollIntoView().should("be.visible");
    }

    verifyUploadCSVRow(linkToCSV) {
        rentRollPage.skipManualRentEntryRow.scrollIntoView().should("be.visible");
        rentRollPage.uploadCSVLink.should("be.visible").should("have.attr", "href", linkToCSV);
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

    fillRentTypeCells(value) {
        rentRollPage.rentTypeCellsWithoutAddColumns.first().click();
        rentRollPage.rentTypeCellsWithoutAddColumns.each($el => {
            cy.wrap($el).should("have.class", "highlight").dblclick();
            rentRollPage.textAreaToInput.type("{del}").type(value).type("{enter}");
            if (!(($el.text()).includes(value))) {
                cy.wrap($el).dblclick();
                rentRollPage.textAreaToInput.type("{del}").type(value).type("{enter}");
            }
            cy.wrap($el).should("contain.text", value);
        });
    }
}

export default new InPlaceRentRollActions();