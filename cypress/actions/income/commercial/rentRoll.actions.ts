import rentRollPage from "../../../pages/income/commercial/rentRoll.page";
import { numberWithCommas } from "../../../../utils/numbers.utils";
import BaseActionsExt from "../../base/base.actions.ext";
import CommercialRentRollSharedComponent from "../../../shared_components/commercialRentRoll.shared";

class CommercialRentRollActions extends BaseActionsExt<typeof rentRollPage> {

    /**
     * @description Contains elements and actions, identical for In-Place Rent Roll and Stabilized Rent Roll pages
     */
    Shared: CommercialRentRollSharedComponent;

    constructor(page: typeof rentRollPage, sharedComponent: CommercialRentRollSharedComponent) {
        super(page);
        this.Shared = sharedComponent;
    }

    verifyBasisOfRentTooltip() {
        rentRollPage.basisOfRentField.should("exist");
        rentRollPage.basisOfRentTooltip.should("exist").trigger("mouseover");
        rentRollPage.basisOfRentTooltip.should("be.visible");
        return this;
    }

    clickMonthlyBasisButton(backColor = "rgb(46, 67, 147)"): this {
        rentRollPage.monthlyBasisButton.should("not.have.css", "background-color", backColor)
            .click().should("have.css", "background-color", backColor);
        return this;
    }

    clickAnnuallyBasisButton(backColor = "rgb(46, 67, 147)"): this {
        rentRollPage.annuallyBasisButton.should("not.have.css", "background-color", backColor)
            .click().should("have.css", "background-color", backColor);
        return this;
    }

    clickPerSquareFootButton(isFirstTime: boolean, backColor = "rgb(46, 67, 147)"): this {
        if (isFirstTime) {
            rentRollPage.perSquareBasisButton.should("have.css", "background-color", backColor).click();
        } else {
            rentRollPage.perSquareBasisButton.should("not.have.css", "background-color", backColor)
                .click().should("have.css", "background-color", backColor);
        }
        return this;
    }

    clickPerSquareFootPerMonthButton(backColor = "rgb(46, 67, 147)"): this {
       rentRollPage.perSquareFootPerMonthButton.should("not.have.css", "background-color", backColor)
           .click().should("have.css", "background-color", backColor);
       this.Shared.rentPerSfPerMonthColumnName.scrollIntoView().should("exist");
       return this;
    }

    verifyAllBasisButtons(backColor = "rgb(46, 67, 147)"): this {
        this.clickPerSquareFootButton(true, backColor)
            .clickMonthlyBasisButton(backColor)
            .clickAnnuallyBasisButton(backColor)
            .clickPerSquareFootPerMonthButton(backColor)
            .clickPerSquareFootButton(false, backColor);
        return this;
    }

    chooseLeaseStatusByRowNumber(status: BoweryReports.LeaseStatus, rowNumber = 0): this {
        rentRollPage.pageHeader.should("be.visible");
        rentRollPage.leaseStatusArrows.eq(rowNumber).should("be.visible").as("arrow");
        cy.get("@arrow").click({ force: true });
        rentRollPage.getLeaseStatusToChooseByValue(status).click();
        this.Shared.verifyLeaseStatusByRow(status, rowNumber);
        if (status === "Vacant") {
            this.Shared.getAllCellsByRowNumber(rowNumber).then(cells => {
                for (let i = 3; i < cells.length - 2; i++) {
                    cy.wrap(cells).eq(i).should("have.class", "readOnly");
                }
            });
        }
        return this;
    }

    pasteToLeaseStatusByRow(textToPaste: string, rowNumber = 0): this {
        this.Shared.leaseStatusCells.eq(rowNumber).invoke("text", textToPaste)
            .should("have.text", textToPaste);
        return this;
    }

    pressDeleteLeaseStatusByRow(rowNumber = 0): this {
        this.Shared.leaseStatusCells.eq(rowNumber).trigger("keydown", { keyCode: 46 })
            .should("have.text", "");
        return this;
    }

    chooseLeaseStatusesByRowNumber(statuses: BoweryReports.LeaseStatus[], rowNumber = 0): this {
        statuses.forEach(status => {
            this.chooseLeaseStatusByRowNumber(status, rowNumber);
        });
        return this;
    }

    checkIsInspectedCheckboxByRowNumber(rowNumber = 0): this {
        rentRollPage.pageHeader.should("be.visible");
        this.Shared.verifyIsInspectedNotChecked(rowNumber);
        rentRollPage.isInspectedCheckboxes.eq(rowNumber).check({ force: true });
        this.Shared.verifyIsInspectedChecked(rowNumber);
        return this;
    }

    chooseCheckBoxesIsInspectedFromList(isInspected: boolean[]): this {
        for (let i = 0; i < isInspected.length; i++) {
            if (isInspected[i]) {
                this.checkIsInspectedCheckboxByRowNumber(i);
            }
        }
        return this;
    }

    enterTenantNameByRowNumber(name: string, rowNumber = 0, leaseStatus?: BoweryReports.LeaseStatus): this {
        if (leaseStatus === "Vacant") {
            this.Shared.verifyTenantNameByRow(leaseStatus, name, rowNumber);
        } else {
            this.Shared.tenantNameCells.eq(rowNumber).dblclick({ force: true });
            this.Shared.textareaToInput.clear().type(name).type("{enter}");
        }
        return this;
    }

    deleteTenantNameByRowNumber(rowNumber: number): this {
        this.Shared.tenantNameCells.eq(rowNumber).dblclick();
        this.Shared.textareaToInput.clear();
        return this;
    }

    enterTenantNames(names: Array<string>, leaseStatuses: Array<BoweryReports.LeaseStatus>): this {
        names.forEach((name, index) => {
            this.enterTenantNameByRowNumber(name, index, leaseStatuses[index]);
        });
        return this;
    }

    enterLeaseDateByRowNumber(cellName: BoweryReports.LeaseDateName, date: string, rowNumber = 0): this {
        this.Shared.getLeaseDateCellsByName(cellName).eq(rowNumber).dblclick({ force: true });
        this.Shared.textareaToInput.clear().type(date).type("{enter}");
        return this;
    }

    enterAnnualRentPerSFByRowNumber(value: number, rowNumber = 0): this {
        this.Shared.annualRentPerSFCells.eq(rowNumber).should("not.have.class", "readOnly").dblclick({ force:true });
        this.Shared.textareaToInput.clear().type(`${value}`).type("{enter}");
        const textToBe = `$${numberWithCommas(value.toFixed(2))}`;
        this.verifyRentPerSFAnnuallyByRowNumberCellText(textToBe, rowNumber);
        return this;
    }

    enterMonthlyRentPerSFByRowNumber(value: number, rowNumber = 0): this {
        this.Shared.monthlyRentPerSFCells.eq(rowNumber).should("not.have.class", "readOnly").dblclick({ force:true });
        this.Shared.textareaToInput.clear().type(`${value}`).type("{enter}");
        const textToBe = `$${numberWithCommas(value.toFixed(2))}`;
        this.Shared.monthlyRentPerSFCells.eq(rowNumber).should("have.text", textToBe);
        return this;
    }

    enterMonthlyRentByRowNumber(monthlyRent: number, rowNumber = 0): this {
        this.Shared.monthlyRentCells.eq(rowNumber).should("not.have.class", "readOnly").dblclick({ force: true });
        this.Shared.textareaToInput.clear().type(`${monthlyRent}`).type("{enter}");
        const textToBe = numberWithCommas(monthlyRent.toFixed(2));
        this.Shared.verifyMonthlyRentByRowCellText(textToBe, rowNumber);
        return this;
    }

    enterAnnualRentByRowNumber(annualRent: number, rowNumber = 0): this {
        this.Shared.annualRentCells.eq(rowNumber).should("not.have.class", "readOnly").dblclick({ force: true });
        this.Shared.textareaToInput.clear().type(`${annualRent}`).type("{enter}");
        const textToBe = numberWithCommas(annualRent.toFixed(2));
        this.Shared.verifyAnnualRentCellTextByRow(textToBe, rowNumber);
        return this;
    }

    verifyMonthlyRentPerSFByRow(rentPerSF: number, squareFoot: number, calcMethod: string, rowNumber = 0): this {
        let numberToBe;
        if (calcMethod === "annually") {
            numberToBe = (rentPerSF * squareFoot) / 12;
        } else {
            numberToBe = rentPerSF * squareFoot;
        }
        this.Shared.monthlyRentCells.eq(rowNumber)
            .should("have.text", `$${numberWithCommas(numberToBe.toFixed(2))}`);
        return this;
    }

    verifyMonthlyRentAnnuallyByRowNumber(annuallyRent: number, rowNumber = 0): this {
        const textToBe = numberWithCommas((annuallyRent / 12).toFixed(2));
        this.Shared.monthlyRentCells.eq(rowNumber).should("have.text", `$${textToBe}`);
        return this;
    }

    verifyRentPerSFMonthlyByRowNumber(monthlyRent: number, squareFoot: number, rowNumber = 0): this {
        const textToBe = `$${numberWithCommas(((monthlyRent * 12) / squareFoot).toFixed(2))}`;
        this.verifyRentPerSFAnnuallyByRowNumberCellText(textToBe, rowNumber);
        return this;
    }

    verifyRentPerSFAnnuallyByRowNumberCellText(textToBe = "$0.00", rowNumber = 0): this {
        this.Shared.annualRentPerSFCells.eq(rowNumber).should("have.text", textToBe);
        return this;
    }

    verifyRentPerSFAnnuallyByRowNumber(annualRent: number, squareFoot: number, rowNumber = 0): this {
        const textToBe = `$${numberWithCommas((annualRent / squareFoot).toFixed(2))}`;
        this.verifyRentPerSFAnnuallyByRowNumberCellText(textToBe, rowNumber);
        return this;
    }

    chooseListLeaseStatuses(statuses: BoweryReports.LeaseStatus[], numberOfUnits: number): this {
        for (let i = 0; i < numberOfUnits; i++) {
            this.chooseLeaseStatusByRowNumber(statuses[i], i);
        }
        return this;
    }

    enterListPerSF(leaseStatuses: Array<BoweryReports.LeaseStatus>, perSFList: Array<number>): this {
        for (let i = 0; i < leaseStatuses.length; i++) {
            if (leaseStatuses[i] === "Vacant") {
                continue;
            }
            this.enterAnnualRentPerSFByRowNumber(perSFList[i], i);
        }
        return this;
    }

    verifySFTotal(sfValues: Array<number>): this {
        let sfTotalToBe = 0;
        sfValues.forEach(value => sfTotalToBe += value);
        const textToBe = numberWithCommas(Math.round(sfTotalToBe));
        this.Shared.squareFeetTotal.should("have.text", `${textToBe}`);
        return this;
    }

    enterListMonthlyRent(leaseStatuses: Array<BoweryReports.LeaseStatus>, monthlyRentList: Array<number>): this {
        for (let i = 0; i < leaseStatuses.length; i++) {
            if (leaseStatuses[i] === "Vacant") {
                continue;
            }
            this.enterMonthlyRentByRowNumber(monthlyRentList[i], i);
        }
        return this;
    }

    verifyMonthlyRentTotal(leaseStatuses: Array<BoweryReports.LeaseStatus>, monthlyRents: Array<number>): this {
        const textToBe = CommercialRentRollActions.getTotalRentTextToBe(leaseStatuses, monthlyRents);
        this.Shared.monthlyRentTotal.should("have.text", `$${textToBe}`);
        return this;
    }

    enterListAnnuallyRent(leaseStatuses: Array<BoweryReports.LeaseStatus>, annuallyRents: Array<number>): this {
        for (let i = 0; i < leaseStatuses.length; i++) {
            if (leaseStatuses[i] === "Vacant") {
                continue;
            }
            this.enterAnnualRentByRowNumber(annuallyRents[i], i);
        }
        return this;
    }

    private static getTotalRentTextToBe(leaseStatuses: Array<BoweryReports.LeaseStatus>, rentsValues: Array<number>): string {
        let rentTotalToBe = 0;
        for (let i = 0; i < leaseStatuses.length; i++) {
            if (leaseStatuses[i] === "Vacant") {
                continue;
            }
            rentTotalToBe += rentsValues[i];
        }
        return numberWithCommas(rentTotalToBe.toFixed(2));
    }

    verifyAnnuallyRentTotal(leaseStatuses: Array<BoweryReports.LeaseStatus>, annualRents: Array<number>): this {
        const textToBe = CommercialRentRollActions.getTotalRentTextToBe(leaseStatuses, annualRents);
        this.Shared.annualRentTotal.should("have.text", `$${textToBe}`);
        return this;
    }

    verifyPerSFTotal(leaseStatuses: Array<BoweryReports.LeaseStatus>, perSfRents: Array<number>, squareFootList: Array<number>): this {
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
        this.Shared.annualRentPerSFTotal.should("have.text", `$${textToBe}`);
        return this;
    }

    editDiscussion(newCommentary: string): this {
        this.Shared.modifiedLabel.should("not.exist");
        this.clickEditDiscussionButton()
            .clearAndEnterNewCommentary(newCommentary)
            .clickSaveDiscussionButton()
            .verifyCommentarySavedText(newCommentary);
        this.Shared.modifiedLabel.should("exist");
        return this;
    }

    clearAndEnterNewCommentary(commentary: string): this {
        this.Shared.discussionTextInput.clear().type(commentary);
        return this;
    }

    clickSaveDiscussionButton(): this {
        this.Shared.saveDiscussionChanges.click();
        return this;
    }

    clickEditDiscussionButton(): this {
        this.Shared.editDiscussionButton.click({ force: true });
        return this;
    }

    clickRevertToOriginalButton(): this {
        this.Shared.revertToOriginalButton.click();
        this.Shared.changesLostModalHeader.should("exist");
        return this;
    }

    verifyCommentarySavedText(textToBe: string): this {
        this.Shared.commentaryText.should("have.text", textToBe);
        return this;
    }

    verifyCommentaryTextNotContains(text: string): this {
        this.Shared.commentaryText.should("not.contain.text", text);
        return this;
    }

    verifyCommentaryTextBoxText(textToBe: string): this {
        this.Shared.discussionTextInput.should("have.text", textToBe);
        return this;
    }

    verifyCommentaryTextBoxNotHaveText(text: string): this {
        this.Shared.discussionTextInput.should("not.have.text", text);
        return this;
    }

    clickCloseButton(): this {
        this.Shared.closeButton.click();
        return this;
    }

    clickCancelRevertButton(): this {
        this.Shared.cancelRevertButton.click();
        return this;
    }

    clickYesRevertButton(): this {
        this.Shared.yesRevertButton.click();
        return this;
    }

    verifyEditDiscussionButtonsDisplayed(): this {
        rentRollPage.cancelDiscussionEdit.should("be.visible");
        this.Shared.editDiscussionButton.should("not.exist");
        this.Shared.revertToOriginalButton.should("be.visible");
        this.Shared.saveDiscussionChanges.should("be.visible");
        return this;
    }

    clickCancelDiscussionEditButton(): this {
        rentRollPage.cancelDiscussionEdit.click();
        return this;
    }

    verifyInPlaceCommercialIncomeTextArea(verifyAreaValue: string): CommercialRentRollActions {
        rentRollPage.inPlaceCommercialIncomeTextArea.should("contain.text", verifyAreaValue);
        return this;
    }
}

export default new CommercialRentRollActions(rentRollPage, new CommercialRentRollSharedComponent());
