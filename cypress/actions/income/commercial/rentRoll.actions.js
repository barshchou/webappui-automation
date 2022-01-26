import rentRollPage from "../../../pages/income/commercial/rentRoll.page";
import BaseActions from "../../base/base.actions";
import {isDateHasCorrectFormat} from "../../../../utils/date.utils";
import {numberWithCommas} from "../../../../utils/numbers.utils";

class CommercialRentRollActions extends BaseActions {

    verifyBasisOfRentTooltip() {
        rentRollPage.basisOfRentField.should("exist");
        rentRollPage.basisOfRentTooltip.should("exist").trigger("mouseover");
        rentRollPage.basisOfRentTooltip.should("be.visible");
        return this;
    }

    /**
     * @param {string} backColor
     * @returns {CommercialRentRollActions}
     */
    clickMonthlyBasisButton(backColor = "rgb(65, 96, 211)") {
        rentRollPage.monthlyBasisButton.should("not.have.css", "background-color", backColor)
            .click().should("have.css", "background-color", backColor);
        return this;
    }

    /**
     * @param {string} backColor
     * @returns {CommercialRentRollActions}
     */
    clickAnnuallyBasisButton(backColor = "rgb(65, 96, 211)") {
        rentRollPage.annuallyBasisButton.should("not.have.css", "background-color", backColor)
            .click().should("have.css", "background-color", backColor);
        return this;
    }

    /**
     * @param {boolean} isFirstTime
     * @param {string} backColor
     * @returns {CommercialRentRollActions}
     */
    clickPerSquareFootButton(isFirstTime, backColor = "rgb(65, 96, 211)") {
        if (isFirstTime) {
            rentRollPage.perSquareBasisButton.should("have.css", "background-color", backColor).click();
        } else {
            rentRollPage.perSquareBasisButton.should("not.have.css", "background-color", backColor)
                .click().should("have.css", "background-color", backColor);
        }
        return this;
    }


    clickPerSquareFootPerMonthButton(backColor = "rgb(65, 96, 211)") {
       rentRollPage.perSquareFootPerMonthButton.should("not.have.css", "background-color", backColor)
           .click().should("have.css", "background-color", backColor);
       rentRollPage.rentPerSfPerMonthColumnName.scrollIntoView().should("exist");
       return this;
    }

    /**
     * @param {string} backColor
     * @returns {CommercialRentRollActions}
     */
    verifyAllBasisButtons(backColor = "rgb(65, 96, 211)") {
        this.clickPerSquareFootButton(true, backColor)
            .clickMonthlyBasisButton(backColor)
            .clickAnnuallyBasisButton(backColor)
            .clickPerSquareFootButton(false, backColor);
        return this;
    }

    /**
     * @param {string} status
     * @param {number} rowNumber
     * @returns {CommercialRentRollActions}
     */
    chooseLeaseStatusByRowNumber(status, rowNumber = 0) {
        rentRollPage.pageHeader.should("be.visible");
        rentRollPage.leaseStatusArrows.eq(rowNumber).should("be.visible").as("arrow");
        cy.get("@arrow").click({force:true});
        rentRollPage.getLeaseStatusToChooseByValue(status).click();
        rentRollPage.leaseStatusCells.eq(rowNumber).should("have.text", status);
        if (status === "Vacant") {
            rentRollPage.getAllCellsByRowNumber(rowNumber).then(cells => {
                for (let i = 3; i < cells.length - 2; i++) {
                    cy.wrap(cells).eq(i).should("have.class", "readOnly");
                }
            });
        }
        return this;
    }

    /**
     * @param {Array<string>} statuses
     * @param {number} rowNumber
     * @returns {CommercialRentRollActions}
     */
    chooseLeaseStatusesByRowNumber(statuses, rowNumber = 0) {
        statuses.forEach(status => {
            this.chooseLeaseStatusByRowNumber(status, rowNumber);
        });
        return this;
    }

    /**
     * @param {number} rowNumber
     * @returns {CommercialRentRollActions}
     */
    checkIsInspectedCheckboxByRowNumber(rowNumber = 0) {
        rentRollPage.pageHeader.should("be.visible");
        const backColor = "rgb(65, 96, 211)";
        rentRollPage.elementToVerifyIsInspected.should("not.have.css", "background-color", backColor);
        rentRollPage.isInspectedCheckboxes.eq(rowNumber).as("isInspectedCheckbox");
        cy.get("@isInspectedCheckbox").invoke("show");
        cy.get("@isInspectedCheckbox").check({force:true});
        rentRollPage.elementToVerifyIsInspected.should("have.css", "background-color", backColor);
        return this;
    }

    /**
     * @param {number} unitNumber
     * @returns {CommercialRentRollActions}
     */
    verifyUnitNumberCells(unitNumber = 1) {
        rentRollPage.unitNumberCells.each(cell => {
            cy.wrap(cell).should("exist").should("be.visible");
        });
        rentRollPage.unitNumberCells.should("have.length", unitNumber + 1);
        return this;
    }

    /**
     * @param {string} name
     * @param {number} rowNumber
     * @returns {CommercialRentRollActions}
     */
    enterTenantNameByRowNumber(name, rowNumber = 0) {
        rentRollPage.tenantNameCells.eq(rowNumber).dblclick();
        rentRollPage.textareaToInput.clear().type(name).type("{enter}");
        return this;
    }

    /**
     * @param {string} leaseStatus
     * @param {string} [nameToBe]
     * @param {number} [rowNumber]
     * @returns {CommercialRentRollActions}
     */
    verifyTenantNameByRowNumber(leaseStatus, nameToBe, rowNumber = 0) {
        let textToBe = leaseStatus === "Vacant" ? `Commercial Unit ${rowNumber + 1}` : nameToBe;
        rentRollPage.tenantNameCells.eq(rowNumber).should("have.text", textToBe);
        return this;
    }

    /**
     * @param {string} textToBe
     * @param {number} rowNumber
     * @returns {CommercialRentRollActions}
     */
    verifyUseCellTextByRowNumber(textToBe, rowNumber = 0) {
        rentRollPage.useCells.eq(rowNumber).should("have.text", textToBe);
        return this;
    }

    /**
     * @param {string} cellName
     * @param {string} date
     * @param {number} rowNumber
     * @returns {CommercialRentRollActions}
     */
    enterLeaseDateByRowNumber(cellName, date, rowNumber = 0) {
        rentRollPage.getLeaseDateCellsByName(cellName).eq(rowNumber).dblclick();
        rentRollPage.textareaToInput.clear().type(date).type("{enter}");
        return this;
    }

    /**
     * @param {string} cellName
     * @param {string} leaseStatus
     * @param {string} [dateToBe]
     * @param {number} [rowNumber]
     * @returns {CommercialRentRollActions}
     */
    verifyLeaseDateByRowNumber(cellName, leaseStatus, dateToBe, rowNumber = 0) {
        dateToBe = dateToBe ?? "";
        if (!isDateHasCorrectFormat(dateToBe, "/") && cellName !== "Expiry") {
            dateToBe = "";
        }
        let textToBe = leaseStatus === "Vacant" ? "-" : dateToBe;
        rentRollPage.getLeaseDateCellsByName(cellName).eq(rowNumber).should("have.text", textToBe);
        return this;
    }

    /**
     * @param {number} sfToBe
     * @param {number} rowNumber
     * @returns {CommercialRentRollActions}
     */
    verifySquareFeetByRowNumber(sfToBe, rowNumber = 0) {
        let sfTextToBe = numberWithCommas(Math.round(sfToBe));
        rentRollPage.squareFeetCells.eq(rowNumber).should("have.text", sfTextToBe);
        return this;
    }

    /**
     * @param {number | string} value
     * @param {number} rowNumber
     * @returns {CommercialRentRollActions}
     */
    enterAnnualRentPerSFByRowNumber(value, rowNumber = 0) {
        rentRollPage.annualRentPerSFCells.eq(rowNumber).should("not.have.class", "readOnly").dblclick({force:true});
        rentRollPage.textareaToInput.clear().type(value).type("{enter}");
        const textToBe = `$${numberWithCommas(value.toFixed(2))}`;
        this.verifyRentPerSFAnnuallyByRowNumberCellText(textToBe, rowNumber);
        return this;
    }

    /**
     * @param {number | string} value
     * @param {number} rowNumber
     * @returns {CommercialRentRollActions}
     */
    enterMonthlyRentPerSFByRowNumber(value, rowNumber = 0) {
        rentRollPage.monthlyRentPerSFCells.eq(rowNumber).should("not.have.class", "readOnly").dblclick({force:true});
        rentRollPage.textareaToInput.clear().type(value).type("{enter}");
        const textToBe = `$${numberWithCommas(value.toFixed(2))}`;
        rentRollPage.monthlyRentPerSFCells.eq(rowNumber).should("have.text", textToBe);
        return this;
    }

    /**
     * @param {number} rentPerSF
     * @param {number} squareFoot
     * @param {number} rowNumber
     * @returns {CommercialRentRollActions}
     */
    verifyAnnualRentCellSquareFootByRowNumber(rentPerSF, squareFoot, rowNumber = 0) {
        const textToBe = numberWithCommas((rentPerSF * squareFoot).toFixed(2));
        rentRollPage.annualRentCells.eq(rowNumber).should("have.text", `$${textToBe}`);
        return this;
    }

    /**
     * @param {number} rowNumber
     * @returns {CommercialRentRollActions}
     */
    clearRentPerSFByRowNumber(rowNumber = 0) {
        rentRollPage.annualRentPerSFCells.eq(rowNumber).as("cell");
        cy.get("@cell").dblclick({force:true});
        rentRollPage.textareaToInput.clear().type("{enter}");
        return this;
    }

    /**
     * @param {number | string} monthlyRent
     * @param {number} rowNumber
     * @returns {CommercialRentRollActions}
     */
    enterMonthlyRentByRowNumber(monthlyRent, rowNumber = 0) {
        rentRollPage.monthlyRentCells.eq(rowNumber).should("not.have.class", "readOnly").dblclick();
        rentRollPage.textareaToInput.clear().type(monthlyRent).type("{enter}");
        const textToBe = numberWithCommas(monthlyRent.toFixed(2));
        rentRollPage.monthlyRentCells.eq(rowNumber).should("have.text", `$${textToBe}`);
        return this;
    }

    /**
     * @param monthlyRent
     * @param rowNumber
     * @returns {CommercialRentRollActions}
     */
    verifyAnnualRentMonthlyByRowNumber(monthlyRent, rowNumber = 0) {
        const textToBe = numberWithCommas((monthlyRent * 12).toFixed(2));
        rentRollPage.annualRentCells.eq(rowNumber).should("have.text", `$${textToBe}`);
        return this;
    }

    /**
     * @param {number} rowNumber
     * @returns {CommercialRentRollActions}
     */
    clearMonthlyRentByRowNumber(rowNumber = 0) {
        rentRollPage.monthlyRentCells.eq(rowNumber).dblclick();
        rentRollPage.textareaToInput.clear().type("{enter}");
        return this;
    }

    /**
     * @param {number | string} annualRent
     * @param {number} rowNumber
     * @returns {CommercialRentRollActions}
     */
    enterAnnualRentByRowNumber(annualRent, rowNumber = 0) {
        rentRollPage.annualRentCells.eq(rowNumber).should("not.have.class", "readOnly").dblclick();
        rentRollPage.textareaToInput.clear().type(annualRent).type("{enter}");
        const textToBe = numberWithCommas(annualRent.toFixed(2));
        rentRollPage.annualRentCells.eq(rowNumber).should("have.text", `$${textToBe}`);
        return this;
    }

    /**
     * @param {number} rowNumber
     * @returns {CommercialRentRollActions}
     */
    clearAnnualRentByRowNumber(rowNumber = 0) {
        rentRollPage.annualRentCells.eq(rowNumber).dblclick();
        rentRollPage.textareaToInput.clear().type("{enter}");
        return this;
    }

    /**
     * @param {number} rentPerSF
     * @param {number} squareFoot
     * @param {number} rowNumber
     * @returns {CommercialRentRollActions}
     */
    verifyMonthlyRentPerSFByRowNumber(rentPerSF, squareFoot, rowNumber = 0) {
        const textToBe = numberWithCommas(((rentPerSF * squareFoot) / 12).toFixed(2));
        rentRollPage.monthlyRentCells.eq(rowNumber).should("have.text", `$${textToBe}`);
        return this;
    }

    /**
     * @param {number} annuallyRent
     * @param {number} rowNumber
     * @returns {CommercialRentRollActions}
     */
    verifyMonthlyRentAnnuallyByRowNumber(annuallyRent, rowNumber = 0) {
        const textToBe = numberWithCommas((annuallyRent / 12).toFixed(2));
        rentRollPage.monthlyRentCells.eq(rowNumber).should("have.text", `$${textToBe}`);
        return this;
    }

    /**
     * @param {number} monthlyRent
     * @param {number} squareFoot
     * @param {number} rowNumber
     * @returns {CommercialRentRollActions}
     */
    verifyRentPerSFMonthlyByRowNumber(monthlyRent, squareFoot, rowNumber = 0) {
        const textToBe = `$${numberWithCommas(((monthlyRent * 12) / squareFoot).toFixed(2))}`;
        this.verifyRentPerSFAnnuallyByRowNumberCellText(textToBe, rowNumber);
        return this;
    }

    /**
     * @param {string} textToBe
     * @param {number} rowNumber
     * @returns {CommercialRentRollActions}
     */
    verifyRentPerSFAnnuallyByRowNumberCellText(textToBe = "$0.00", rowNumber = 0) {
        rentRollPage.annualRentPerSFCells.eq(rowNumber).should("have.text", textToBe);
        return this;
    }

    /**
     * @param {number} annualRent
     * @param {number} squareFoot
     * @param {number} rowNumber
     * @returns {CommercialRentRollActions}
     */
    verifyRentPerSFAnnuallyByRowNumber(annualRent, squareFoot, rowNumber = 0) {
        const textToBe = `$${numberWithCommas((annualRent / squareFoot).toFixed(2))}`;
        this.verifyRentPerSFAnnuallyByRowNumberCellText(textToBe, rowNumber);
        return this;
    }

    /**
     * @param {Array<string>} statuses
     * @param {number} numberOfUnits
     * @returns {CommercialRentRollActions}
     */
    chooseListLeaseStatuses(statuses, numberOfUnits) {
        for (let i = 0; i < numberOfUnits; i++) {
            this.chooseLeaseStatusByRowNumber(statuses[i], i);
        }
        return this;
    }

    /**
     * @param {Array<string>} leaseStatuses
     * @param {Array<number>} perSFList
     * @returns {CommercialRentRollActions}
     */
    enterListPerSF(leaseStatuses, perSFList) {
        for (let i = 0; i < leaseStatuses.length; i++) {
            if (leaseStatuses[i] === "Vacant") {
                continue;
            }
            this.enterAnnualRentPerSFByRowNumber(perSFList[i], i);
        }
        return this;
    }

    /**
     * @param {Array<number>} sfValues
     * @returns {CommercialRentRollActions}
     */
    verifySFTotal(sfValues) {
        let sfTotalToBe = 0;
        sfValues.forEach(value => sfTotalToBe += value);
        const textToBe = numberWithCommas(Math.round(sfTotalToBe));
        rentRollPage.squareFeetCells.last().should("have.text", `${textToBe}`);
        return this;
    }

    /**
     * @param {Array<string>} leaseStatuses
     * @param {Array<number>} monthlyRentList
     * @returns {CommercialRentRollActions}
     */
    enterListMonthlyRent(leaseStatuses, monthlyRentList) {
        for (let i = 0; i < leaseStatuses.length; i++) {
            if (leaseStatuses[i] === "Vacant") {
                continue;
            }
            this.enterMonthlyRentByRowNumber(monthlyRentList[i], i);
        }
        return this;
    }

    /**
     * @param {Array<string>} leaseStatuses
     * @param {Array<number>} monthlyRents
     * @returns {CommercialRentRollActions}
     */
    verifyMonthlyRentTotal(leaseStatuses, monthlyRents) {
        const textToBe = this.getTotalRentTextToBe(leaseStatuses, monthlyRents);
        rentRollPage.monthlyRentCells.last().should("have.text", `$${textToBe}`);
        return this;
    }

    /**
     * @param {Array<string>} leaseStatuses
     * @param {Array<number>} annuallyRents
     * @returns {CommercialRentRollActions}
     */
    enterListAnnuallyRent(leaseStatuses, annuallyRents) {
        for (let i = 0; i < leaseStatuses.length; i++) {
            if (leaseStatuses[i] === "Vacant") {
                continue;
            }
            this.enterAnnualRentByRowNumber(annuallyRents[i], i);
        }
        return this;
    }

    /**
     * @param {Array<string>} leaseStatuses
     * @param {Array<number>} rentsValues
     * @returns {string}
     */
    getTotalRentTextToBe(leaseStatuses, rentsValues) {
        let rentTotalToBe = 0;
        for (let i = 0; i < leaseStatuses.length; i++) {
            if (leaseStatuses[i] === "Vacant") {
                continue;
            }
            rentTotalToBe += rentsValues[i];
        }
        return numberWithCommas(rentTotalToBe.toFixed(2));
    }

    /**
     * @param {Array<string>} leaseStatuses
     * @param {Array<number>} annualRents
     * @returns {CommercialRentRollActions}
     */
    verifyAnnuallyRentTotal(leaseStatuses, annualRents) {
        const textToBe = this.getTotalRentTextToBe(leaseStatuses, annualRents);
        rentRollPage.annualRentCells.last().should("have.text", `$${textToBe}`);
        return this;
    }

    /**
     * @param {Array<string>} leaseStatuses
     * @param {string} columnName
     * @returns {CommercialRentRollActions}
     */
    clearRentCellsByName(leaseStatuses, columnName) {
        for (let i = 0; i < leaseStatuses.length; i++) {
            if (leaseStatuses[i] === "Vacant") {
                continue;
            }
            switch (columnName) {
                case "perSF":
                    this.clearRentPerSFByRowNumber(i);
                    break;
                case "annually":
                    this.clearAnnualRentByRowNumber(i);
                    break;
                default:
                    this.clearMonthlyRentByRowNumber(i);
            }
        }
        return this;
    }

    /**
     * @param {Array<string>} leaseStatuses
     * @param {Array<number>} perSfRents
     * @param {Array<number>} squareFootList
     * @returns {CommercialRentRollActions}
     */
    verifyPerSFTotal(leaseStatuses, perSfRents, squareFootList) {
        let totalAnnualRent = 0;
        let totalSF = 0;
        for (let i = 0; i < leaseStatuses.length; i++) {
            if (leaseStatuses[i] === "Vacant") {
                continue;
            }
            totalSF += squareFootList[i];
            totalAnnualRent += perSfRents[i] * squareFootList[i];
        }
        const textToBe = numberWithCommas((totalAnnualRent / totalSF).toFixed(2));
        rentRollPage.annualRentPerSFCells.last().should("have.text", `$${textToBe}`);
        return this;
    }

    /**
     * @param {string} newCommentary
     * @returns {CommercialRentRollActions}
     */
    editDiscussion(newCommentary) {
        rentRollPage.modifiedLabel.should("not.exist");
        this.clickEditDiscussionButton()
            .clearAndEnterNewCommentary(newCommentary)
            .clickSaveDiscussionButton()
            .verifyCommentarySavedText(newCommentary);
        rentRollPage.modifiedLabel.should("exist");
        return this;
    }

    /**
     * @param {string} commentary
     * @returns {CommercialRentRollActions}
     */
    clearAndEnterNewCommentary(commentary) {
        rentRollPage.discussionTextInput.clear().type(commentary);
        return this;
    }

    clickSaveDiscussionButton() {
        rentRollPage.saveDiscussionChanges.click();
        return this;
    }

    clickEditDiscussionButton() {
        rentRollPage.editDiscussionButton.click();
        return this;
    }

    clickRevertToOriginalButton() {
        rentRollPage.revertToOriginalButton.click();
        rentRollPage.changesLostModalHeader.should("exist");
        return this;
    }

    /**
     * @param {string} textToBe
     * @returns {CommercialRentRollActions}
     */
    verifyCommentarySavedText(textToBe) {
        rentRollPage.commentaryText.should("have.text", textToBe);
        return this;
    }

    /**
     * @param {string} text
     * @returns {CommercialRentRollActions}
     */
    verifyCommentaryTextNotContains(text) {
        rentRollPage.commentaryText.should("not.contain.text", text);
        return this;
    }

    /**
     * @param {string} textToBe
     * @returns {CommercialRentRollActions}
     */
    verifyCommentaryTextBoxText(textToBe) {
        rentRollPage.discussionTextInput.should("have.text", textToBe);
        return this;
    }

    /**
     * @param {string} text
     * @returns {CommercialRentRollActions}
     */
    verifyCommentaryTextBoxNotHaveText(text) {
        rentRollPage.discussionTextInput.should("not.have.text", text);
        return this;
    }

    clickCloseButton() {
        rentRollPage.closeButton.click();
        return this;
    }

    clickCancelRevertButton() {
        rentRollPage.cancelRevertButton.click();
        return this;
    }

    clickYesRevertButton() {
        rentRollPage.yesRevertButton.click();
        return this;
    }

    verifyEditDiscussionButtonsDisplayed() {
        rentRollPage.cancelDiscussionEdit.should("be.visible");
        rentRollPage.editDiscussionButton.should("not.exist");
        rentRollPage.revertToOriginalButton.should("be.visible");
        rentRollPage.saveDiscussionChanges.should("be.visible");
        return this;
    }

    clickCancelDiscussionEditButton() {
        rentRollPage.cancelDiscussionEdit.click();
        return this;
    }
}

export default new CommercialRentRollActions();
