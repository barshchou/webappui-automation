import rentRollPage from "../../../pages/income/commercial/rentRoll.page";
import { numberWithCommas } from "../../../../utils/numbers.utils";
import CommercialRentRollSharedComponent from "../../shared_components/commercialRentRoll.shared.actions";

class CommercialRentRollActions extends CommercialRentRollSharedComponent<typeof rentRollPage> {

    /**
     * @description Contains elements and actions, identical for In-Place Rent Roll and Stabilized Rent Roll pages
     */
    readonly _Shared: CommercialRentRollSharedComponent<typeof rentRollPage>;

    constructor(page: typeof rentRollPage, sharedComponent: CommercialRentRollSharedComponent<typeof rentRollPage>) {
        super(page);
        this._Shared = sharedComponent;
    }

    get Shared() {
        return this._Shared;
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
       this.Page.rentPerSfPerMonthColumnName.scrollIntoView().should("exist");
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
            this.Page.getAllCellsByRowNumber(rowNumber).then(cells => {
                for (let i = 3; i < cells.length - 2; i++) {
                    cy.wrap(cells).eq(i).should("have.class", "readOnly");
                }
            });
        }
        return this;
    }

    pasteToLeaseStatusByRow(textToPaste: string, rowNumber = 0): this {
        this.Page.leaseStatusCells.eq(rowNumber).invoke("text", textToPaste)
            .should("have.text", textToPaste);
        return this;
    }

    pressDeleteLeaseStatusByRow(rowNumber = 0): this {
        this.Page.leaseStatusCells.eq(rowNumber).trigger("keydown", { keyCode: 46 })
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
            this.Page.tenantNameCells.eq(rowNumber).dblclick({ force: true });
            this.Page.textareaToInput.clear().type(name).type("{enter}");
        }
        return this;
    }

    deleteTenantNameByRowNumber(rowNumber: number): this {
        this.Page.tenantNameCells.eq(rowNumber).dblclick();
        this.Page.textareaToInput.clear();
        return this;
    }

    enterTenantNames(names: Array<string>, leaseStatuses: Array<BoweryReports.LeaseStatus>): this {
        names.forEach((name, index) => {
            this.enterTenantNameByRowNumber(name, index, leaseStatuses[index]);
        });
        return this;
    }

    enterLeaseDateByRowNumber(cellName: BoweryReports.LeaseDateName, date: string, rowNumber = 0): this {
        this.Page.getLeaseDateCellsByName(cellName).eq(rowNumber).dblclick({ force: true });
        this.Page.textareaToInput.clear().type(date).type("{enter}");
        return this;
    }

    enterMonthlyRentByRowNumber(monthlyRent: number, rowNumber = 0): this {
        this.Page.monthlyRentCells.eq(rowNumber).should("not.have.class", "readOnly").dblclick({ force: true });
        this.Page.textareaToInput.clear().type(`${monthlyRent}`).type("{enter}");
        const textToBe = numberWithCommas(monthlyRent.toFixed(2));
        this.Shared.verifyMonthlyRentByRowCellText(textToBe, rowNumber);
        return this;
    }

    enterAnnualRentByRowNumber(annualRent: number, rowNumber = 0): this {
        this.Page.annualRentCells.eq(rowNumber).should("not.have.class", "readOnly").dblclick({ force: true });
        this.Page.textareaToInput.clear().type(`${annualRent}`).type("{enter}");
        const textToBe = numberWithCommas(annualRent.toFixed(2));
        this.Shared.verifyAnnualRentCellTextByRow(textToBe, rowNumber);
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
            this.Shared.enterRentPerSFAnnuallyByRowNumber(perSFList[i], i);
        }
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
        this.Page.monthlyRentTotal.should("have.text", `$${textToBe}`);
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
        this.Page.annualRentTotal.should("have.text", `$${textToBe}`);
        return this;
    }

    verifyPerSFAnnuallyTotal(leaseStatuses: Array<BoweryReports.LeaseStatus>, perSfRents: Array<number>, squareFootList: Array<number>): this {
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
        this.Page.rentPerSFAnnuallyTotal.should("have.text", `$${textToBe}`);
        return this;
    }

    editDiscussion(newCommentary: string, clearText = true): this {
        this.Page.modifiedLabel.should("not.exist");
        this.Shared.clickEditDiscussionButton()
            .editDiscussionTextArea(newCommentary, clearText);
        this.clickSaveDiscussionButton()
            .verifyCommentarySavedText(newCommentary);
        this.Page.modifiedLabel.should("exist");
        return this;
    }

    clickSaveDiscussionButton(): this {
        this.Page.saveDiscussionChanges.click();
        return this;
    }

    clickRevertToOriginalButton(): this {
        this.Page.revertToOriginalButton.click();
        this.Page.changesLostModalHeader.should("exist");
        return this;
    }

    verifyCommentarySavedText(textToBe: string): this {
        this.Page.commentaryText.should("have.text", textToBe);
        return this;
    }

    verifyCommentaryTextNotContains(text: string): this {
        this.Page.commentaryText.should("not.contain.text", text);
        return this;
    }

    verifyCommentaryTextBoxText(textToBe: string): this {
        this.Page.discussionTextInput.should("have.text", textToBe);
        return this;
    }

    verifyCommentaryTextBoxNotHaveText(text: string): this {
        this.Page.discussionTextInput.should("not.have.text", text);
        return this;
    }

    clickCloseButton(): this {
        this.Page.closeButton.click();
        return this;
    }

    clickCancelRevertButton(): this {
        this.Page.cancelRevertButton.click();
        return this;
    }

    clickYesRevertButton(): this {
        this.Page.yesRevertButton.click();
        return this;
    }

    verifyEditDiscussionButtonsDisplayed(): this {
        rentRollPage.cancelDiscussionEdit.should("be.visible");
        this.Page.editDiscussionButton.should("not.exist");
        this.Page.revertToOriginalButton.should("be.visible");
        this.Page.saveDiscussionChanges.should("be.visible");
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

export default new CommercialRentRollActions(rentRollPage, new CommercialRentRollSharedComponent(rentRollPage));
