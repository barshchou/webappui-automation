import rentRollPage from "../../../pages/income/commercial/rentRoll.page";
import {isDateHasCorrectFormat} from "../../../../utils/date.utils";
import {numberWithCommas} from "../../../../utils/numbers.utils";
import BaseActionsExt from "../../base/base.actions.ext";
import commercialRentRollShared from "../../../shared_components/commercialRentRoll.shared";

class CommercialRentRollActions extends BaseActionsExt<typeof rentRollPage> {

    SharedComponent: typeof commercialRentRollShared;

    constructor(page: typeof rentRollPage, sharedComponent: typeof commercialRentRollShared) {
        super(page);
        this.SharedComponent = sharedComponent;
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
       rentRollPage.rentPerSfPerMonthColumnName.scrollIntoView().should("exist");
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
        this.verifyLeaseStatusCellTextByRow(status, rowNumber);
        if (status === "Vacant") {
            rentRollPage.getAllCellsByRowNumber(rowNumber).then(cells => {
                for (let i = 3; i < cells.length - 2; i++) {
                    cy.wrap(cells).eq(i).should("have.class", "readOnly");
                }
            });
        }
        return this;
    }

    verifyLeaseStatusCellTextByRow(textToBe: string, rowNumber = 0): this {
        rentRollPage.leaseStatusCells.eq(rowNumber).should("have.text", textToBe);
        return this;
    }

    pasteToLeaseStatusByRow(textToPaste: string, rowNumber = 0): this {
        rentRollPage.leaseStatusCells.eq(rowNumber).invoke("text", textToPaste)
            .should("have.text", textToPaste);
        return this;
    }

    pressDeleteLeaseStatusByRow(rowNumber = 0): this {
        rentRollPage.leaseStatusCells.eq(rowNumber).trigger("keydown", {keyCode: 46})
            .should("have.text", "");
        return this;
    }

    chooseLeaseStatusesByRowNumber(statuses: Array<BoweryReports.LeaseStatus>, rowNumber = 0): this {
        statuses.forEach(status => {
            this.chooseLeaseStatusByRowNumber(status, rowNumber);
        });
        return this;
    }

    checkIsInspectedCheckboxByRowNumber(rowNumber = 0): this {
        rentRollPage.pageHeader.should("be.visible");
        const backColor = "rgb(66, 96, 211)";
        rentRollPage.elementToVerifyIsInspected.should("not.have.css", "background-color", backColor);
        rentRollPage.isInspectedCheckboxes.eq(rowNumber).as("isInspectedCheckbox");
        cy.get("@isInspectedCheckbox").invoke("show");
        cy.get("@isInspectedCheckbox").check({ force: true });
        rentRollPage.elementToVerifyIsInspected.should("have.css", "background-color", backColor);
        return this;
    }

    chooseCheckBoxesIsInspectedFromList(isInspected: boolean[]): this {
        for (let i = 0; i < isInspected.length; i++) {
            if (isInspected[i]) {
                this.chooseCheckBoxesIsInspectedByRowNumber(i);
            }
        }
        return this;
    }

    chooseCheckBoxesIsInspectedByRowNumber(rowNumber: number): this {
        rentRollPage.isInspectedCheckboxes.eq(rowNumber).check({ force: true });
        const backColor = "rgb(66, 96, 211)";
        rentRollPage.elementToVerifyIsInspected.should("have.css", "background-color", backColor);
        return this;
    }


     verifyUnitNumberCells(unitNumber = 1): this {
        rentRollPage.unitNumberCells.each(cell => {
            cy.wrap(cell).should("exist").and("be.visible").and("have.class", "readOnly");
        });
        rentRollPage.unitNumberCells.should("have.length", unitNumber + 1);
        return this;
    }

    enterTenantNameByRowNumber(name: string, rowNumber = 0, leaseStatus?: BoweryReports.LeaseStatus): this {
        if (leaseStatus === "Vacant") {
            this.verifyTenantNameByRowNumber(leaseStatus, name, rowNumber);
        } else {
            rentRollPage.tenantNameCells.eq(rowNumber).dblclick({ force: true });
            rentRollPage.textareaToInput.clear().type(name).type("{enter}");
        }
        return this;
    }

    deleteTenantNameByRowNumber(rowNumber: number): this {
        rentRollPage.tenantNameCells.eq(rowNumber).dblclick();
        rentRollPage.textareaToInput.clear();
        return this;
    }

    enterTenantNames(names: Array<string>, leaseStatuses: Array<BoweryReports.LeaseStatus>): this {
        names.forEach((name, index) => {
            this.enterTenantNameByRowNumber(name, index, leaseStatuses[index]);
        });
        return this;
    }

    verifyTenantNameByRowNumber(leaseStatus: BoweryReports.LeaseStatus, nameToBe?: string, rowNumber = 0): this {
        let textToBe = leaseStatus === "Vacant" ? `Commercial Unit ${rowNumber + 1}` : nameToBe;
        rentRollPage.tenantNameCells.eq(rowNumber).should("have.text", textToBe);
        return this;
    }

    verifyUseCellTextByRowNumber(textToBe: BoweryReports.CommercialUnitsUseTexts, rowNumber = 0): this {
        rentRollPage.useCells.eq(rowNumber).should("have.text", textToBe).and("have.class", "readOnly");
        return this;
    }

    verifyUseCells(useTexts: Array<string>): this {
        useTexts.forEach((use, index) => {
            this.verifyUseCellTextByRowNumber(use, index);
        });
        return this;
    }

    enterLeaseDateByRowNumber(cellName: BoweryReports.LeaseDateName , date: string, rowNumber = 0): this {
        rentRollPage.getLeaseDateCellsByName(cellName).eq(rowNumber).dblclick({ force: true });
        rentRollPage.textareaToInput.clear().type(date).type("{enter}");
        return this;
    }

    verifyLeaseDateByRowNumber(cellName: BoweryReports.LeaseDateName, leaseStatus: BoweryReports.LeaseStatus,
                               dateToBe?: string, rowNumber = 0): this {
        dateToBe = dateToBe ?? "";
        if (!isDateHasCorrectFormat(dateToBe, "/")) {
            dateToBe = "";
        }
        let textToBe = leaseStatus === "Vacant" ? "-" : dateToBe;
        rentRollPage.getLeaseDateCellsByName(cellName).eq(rowNumber).should("have.text", textToBe);
        return this;
    }

    verifySquareFeetByRowNumber(sfToBe = 0, rowNumber = 0): this {
        let sfTextToBe = numberWithCommas(Math.round(sfToBe));
        rentRollPage.squareFeetCells.eq(rowNumber).should("have.text", sfTextToBe).and("have.class", "readOnly");
        return this;
    }

    enterAnnualRentPerSFByRowNumber(value: number, rowNumber = 0): this {
        rentRollPage.annualRentPerSFCells.eq(rowNumber).should("not.have.class", "readOnly").dblclick({force:true});
        rentRollPage.textareaToInput.clear().type(`${value}`).type("{enter}");
        const textToBe = `$${numberWithCommas(value.toFixed(2))}`;
        this.verifyRentPerSFAnnuallyByRowNumberCellText(textToBe, rowNumber);
        return this;
    }

    enterMonthlyRentPerSFByRowNumber(value: number, rowNumber = 0): this {
        rentRollPage.monthlyRentPerSFCells.eq(rowNumber).should("not.have.class", "readOnly").dblclick({force:true});
        rentRollPage.textareaToInput.clear().type(`${value}`).type("{enter}");
        const textToBe = `$${numberWithCommas(value.toFixed(2))}`;
        rentRollPage.monthlyRentPerSFCells.eq(rowNumber).should("have.text", textToBe);
        return this;
    }

    verifyAnnualRentCellPerSFBasisByRow(rentPerSF: number, squareFoot: number, calcMethod: string, rowNumber = 0): this {
        let numberToBe;
        if (calcMethod === "annually") {
            numberToBe = rentPerSF * squareFoot;
        } else {
            numberToBe = rentPerSF * squareFoot * 12;
        }
        rentRollPage.annualRentCells.eq(rowNumber)
            .should("have.text", `$${numberWithCommas(numberToBe.toFixed(2))}`);
        return this;
    }

    enterMonthlyRentByRowNumber(monthlyRent: number, rowNumber = 0): this {
        rentRollPage.monthlyRentCells.eq(rowNumber).should("not.have.class", "readOnly").dblclick({ force: true });
        rentRollPage.textareaToInput.clear().type(`${monthlyRent}`).type("{enter}");
        const textToBe = numberWithCommas(monthlyRent.toFixed(2));
        this.verifyMonthlyRentByRowCellText(textToBe, rowNumber);
        return this;
    }

    verifyMonthlyRentByRowCellText(textToBe = "0.00", rowNumber = 0): this {
        rentRollPage.monthlyRentCells.eq(rowNumber).should("have.text", `$${textToBe}`);
        return this;
    }

    verifyAnnualRentMonthlyByRowNumber(monthlyRent: number, rowNumber = 0): this {
        const textToBe = numberWithCommas((monthlyRent * 12).toFixed(2));
        rentRollPage.annualRentCells.eq(rowNumber).should("have.text", `$${textToBe}`);
        return this;
    }

    enterAnnualRentByRowNumber(annualRent: number, rowNumber = 0): this {
        rentRollPage.annualRentCells.eq(rowNumber).should("not.have.class", "readOnly").dblclick({ force: true });
        rentRollPage.textareaToInput.clear().type(`${annualRent}`).type("{enter}");
        const textToBe = numberWithCommas(annualRent.toFixed(2));
        this.verifyAnnualRentCellTextByRow(textToBe, rowNumber);
        return this;
    }

    verifyAnnualRentCellTextByRow(textToBe = "0.00", rowNumber = 0): this {
        rentRollPage.annualRentCells.eq(rowNumber).should("have.text", `$${textToBe}`);
        return this;
    }

    verifyMonthlyRentPerSFByRow(rentPerSF: number, squareFoot: number, calcMethod: string, rowNumber = 0): this {
        let numberToBe;
        if (calcMethod === "annually") {
            numberToBe = (rentPerSF * squareFoot) / 12;
        } else {
            numberToBe = rentPerSF * squareFoot;
        }
        rentRollPage.monthlyRentCells.eq(rowNumber)
            .should("have.text", `$${numberWithCommas(numberToBe.toFixed(2))}`);
        return this;
    }

    verifyMonthlyRentAnnuallyByRowNumber(annuallyRent: number, rowNumber = 0): this {
        const textToBe = numberWithCommas((annuallyRent / 12).toFixed(2));
        rentRollPage.monthlyRentCells.eq(rowNumber).should("have.text", `$${textToBe}`);
        return this;
    }

    verifyRentPerSFMonthlyByRowNumber(monthlyRent: number, squareFoot: number, rowNumber = 0): this {
        const textToBe = `$${numberWithCommas(((monthlyRent * 12) / squareFoot).toFixed(2))}`;
        this.verifyRentPerSFAnnuallyByRowNumberCellText(textToBe, rowNumber);
        return this;
    }

    verifyRentPerSFAnnuallyByRowNumberCellText(textToBe = "$0.00", rowNumber = 0): this {
        rentRollPage.annualRentPerSFCells.eq(rowNumber).should("have.text", textToBe);
        return this;
    }

    verifyRentPerSFAnnuallyByRowNumber(annualRent: number, squareFoot: number, rowNumber = 0): this {
        const textToBe = `$${numberWithCommas((annualRent / squareFoot).toFixed(2))}`;
        this.verifyRentPerSFAnnuallyByRowNumberCellText(textToBe, rowNumber);
        return this;
    }

    chooseListLeaseStatuses(statuses: Array<BoweryReports.LeaseStatus>, numberOfUnits: number): this {
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
        rentRollPage.squareFeetCells.last().should("have.text", `${textToBe}`);
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
        const textToBe = this.getTotalRentTextToBe(leaseStatuses, monthlyRents);
        rentRollPage.monthlyRentCells.last().should("have.text", `$${textToBe}`);
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

    private getTotalRentTextToBe(leaseStatuses: Array<BoweryReports.LeaseStatus>, rentsValues: Array<number>): string {
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
        const textToBe = this.getTotalRentTextToBe(leaseStatuses, annualRents);
        rentRollPage.annualRentCells.last().should("have.text", `$${textToBe}`);
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
        rentRollPage.annualRentPerSFCells.last().should("have.text", `$${textToBe}`);
        return this;
    }

    editDiscussion(newCommentary: string): this {
        rentRollPage.modifiedLabel.should("not.exist");
        this.clickEditDiscussionButton()
            .clearAndEnterNewCommentary(newCommentary)
            .clickSaveDiscussionButton()
            .verifyCommentarySavedText(newCommentary);
        rentRollPage.modifiedLabel.should("exist");
        return this;
    }

    clearAndEnterNewCommentary(commentary: string): this {
        rentRollPage.discussionTextInput.clear().type(commentary);
        return this;
    }

    clickSaveDiscussionButton(): this {
        rentRollPage.saveDiscussionChanges.click();
        return this;
    }

    clickEditDiscussionButton(): this {
        rentRollPage.editDiscussionButton.click({ force: true });
        return this;
    }

    clickRevertToOriginalButton(): this {
        rentRollPage.revertToOriginalButton.click();
        rentRollPage.changesLostModalHeader.should("exist");
        return this;
    }

    verifyCommentarySavedText(textToBe: string): this {
        rentRollPage.commentaryText.should("have.text", textToBe);
        return this;
    }

    verifyCommentaryTextNotContains(text: string): this {
        rentRollPage.commentaryText.should("not.contain.text", text);
        return this;
    }

    verifyCommentaryTextBoxText(textToBe: string): this {
        rentRollPage.discussionTextInput.should("have.text", textToBe);
        return this;
    }

    verifyCommentaryTextBoxNotHaveText(text: string): this {
        rentRollPage.discussionTextInput.should("not.have.text", text);
        return this;
    }

    clickCloseButton(): this {
        rentRollPage.closeButton.click();
        return this;
    }

    clickCancelRevertButton(): this {
        rentRollPage.cancelRevertButton.click();
        return this;
    }

    clickYesRevertButton(): this {
        rentRollPage.yesRevertButton.click();
        return this;
    }

    verifyEditDiscussionButtonsDisplayed(): this {
        rentRollPage.cancelDiscussionEdit.should("be.visible");
        rentRollPage.editDiscussionButton.should("not.exist");
        rentRollPage.revertToOriginalButton.should("be.visible");
        rentRollPage.saveDiscussionChanges.should("be.visible");
        return this;
    }

    clickCancelDiscussionEditButton(): this {
        rentRollPage.cancelDiscussionEdit.click();
        return this;
    }
}

export default new CommercialRentRollActions(rentRollPage, commercialRentRollShared);
