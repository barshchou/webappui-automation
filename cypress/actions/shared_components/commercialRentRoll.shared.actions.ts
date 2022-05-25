import { numberWithCommas } from "../../../utils/numbers.utils";
import { isDateHasCorrectFormat } from "../../../utils/date.utils";
import BaseActions from "../base/base.actions";
import CommercialRentRollSharedComponentPage from "../../pages/shared_components/commercialRentRoll.shared.page";

class CommercialRentRollSharedComponent<T extends CommercialRentRollSharedComponentPage> extends BaseActions {

    Page: T;

    constructor(page: T) {
        super();
        this.Page = page;
    }

    verifyIsInspectedChecked(rowNumber = 0): this {
        this.Page.elementToVerifyIsInspected.eq(rowNumber).should("have.css", "background-color", "rgb(66, 96, 211)");
        return this;
    }

    verifyIsInspectedNotChecked(rowNumber = 0): this {
        this.Page.elementToVerifyIsInspected.eq(rowNumber).should("not.have.css", "background-color", "rgb(66, 96, 211)");
        return this;
    }

    verifyIsInspectedCheckedAll(isInspected: boolean[]): this {
        for (let i = 0; i < isInspected.length; i++) {
            if (isInspected[i]) {
                this.verifyIsInspectedChecked(i);
            }
        }
        return this;
    }

    verifyLeaseStatusByRow(leaseStatus: BoweryReports.LeaseStatus, rowNumber = 0): this {
        this.Page.leaseStatusCells.eq(rowNumber).should("contain.text", leaseStatus);
        return this;
    }

    verifyLeaseStatuses(statuses: Array<BoweryReports.LeaseStatus>): this {
        statuses.forEach((status, index) => {
            this.verifyLeaseStatusByRow(status, index);
        });
        return this;
    }

    verifyTenantNameByRow(leaseStatus: BoweryReports.LeaseStatus, name?: string, rowNumber = 0): this {
        let textToBe = leaseStatus === "Vacant" ? `Commercial Unit ${rowNumber + 1}` : name;
        this.Page.tenantNameCells.eq(rowNumber).should("have.text", textToBe);
        return this;
    }

    verifyTenantNames(names: Array<string>, leaseStatuses: Array<BoweryReports.LeaseStatus>): this {
        names.forEach((name, index) => {
            this.verifyTenantNameByRow(leaseStatuses[index], name, index);
        });
        return this;
    }

    verifyUseCellByRow(useText: BoweryReports.CommercialUnitsUseTexts, rowNumber = 0): this {
        this.Page.useCells.eq(rowNumber).should("have.text", useText).and("have.class", "readOnly");
        return this;
    }

    verifyUseCells(useTexts: Array<BoweryReports.CommercialUnitsUseTexts>): this {
        useTexts.forEach((text, index) => {
            this.verifyUseCellByRow(text, index);
        });
        return this;
    }

    verifySfCellByRow(squareFeet: string | number = 0, rowNumber = 0): this {
        const textToBe = typeof squareFeet === "string" ? squareFeet : numberWithCommas(Math.round(squareFeet));
        this.Page.squareFeetCells.eq(rowNumber).should("have.text", textToBe).and("have.class", "readOnly");
        return this;
    }

    verifySFCells(squareFeetValues: Array<string | number>): this {
        squareFeetValues.forEach((value, index) => {
            this.verifySfCellByRow(value, index);
        });
        return this;
    }

    verifyLeaseDateByRowNumber(cellName: BoweryReports.LeaseDateName, leaseStatus: BoweryReports.LeaseStatus,
                               rentRoll: "stabilized" | "in-place", dateToBe?: string, rowNumber = 0): this {
        dateToBe = dateToBe ?? "";
        if (!isDateHasCorrectFormat(dateToBe, "/")) {
            dateToBe = "";
        }
        let textToBe = leaseStatus === "Vacant" ? rentRoll === "stabilized" ? "" : "-" : dateToBe;
        this.Page.getLeaseDateCellsByName(cellName).eq(rowNumber).should("have.text", textToBe);
        return this;
    }

    verifyUnitNumberCells(unitNumber = 1): this {
        if (unitNumber === 0) {
            this.Page.unitNumberCells.should("not.exist");
        } else {
            this.Page.unitNumberCells.each(cell => {
                cy.wrap(cell).should("exist").and("be.visible").and("have.class", "readOnly");
            });
            this.Page.unitNumberCells.should("have.length", unitNumber);
        }
        return this;
    }

    verifyAnnualRentCellPerSFBasisByRow(rentPerSF: number, squareFoot: number, calcMethod: "annually" | "monthly",
                                        rowNumber = 0): this {
        let numberToBe;
        if (calcMethod === "annually") {
            numberToBe = rentPerSF * squareFoot;
        } else {
            numberToBe = rentPerSF * squareFoot * 12;
        }
        const textToBe = `${numberWithCommas(numberToBe.toFixed(2))}`;
        this.verifyAnnualRentCellTextByRow(textToBe, rowNumber);
        return this;
    }

    clickNarrativeSuggestions(verifyListValue: string): this {
        this.Page.narrativeSuggestionsList.contains(verifyListValue).click();
        this.Page.commentaryText.click();
        return this;
    }

    verifyAnnualRentCellTextByRow(textToBe = "0.00", rowNumber = 0): this {
        this.Page.annualRentCells.eq(rowNumber).should("have.text", `$${textToBe}`);
        return this;
    }

    verifyMonthlyRentByRowCellText(textToBe = "0.00", rowNumber = 0): this {
        this.Page.monthlyRentCells.eq(rowNumber).should("have.text", `$${textToBe}`);
        return this;
    }

    verifyAnnualRentMonthlyByRowNumber(monthlyRent: number, rowNumber = 0): this {
        const textToBe = numberWithCommas((monthlyRent * 12).toFixed(2));
        this.verifyAnnualRentCellTextByRow(textToBe, rowNumber);
        return this;
    }

    verifyMonthlyRentPerSFByRow(rentPerSF: number, squareFoot: number, calcMethod: "annually" | "monthly",
                                rowNumber = 0): this {
        let numberToBe;
        if (calcMethod === "annually") {
            numberToBe = (rentPerSF * squareFoot) / 12;
        } else {
            numberToBe = rentPerSF * squareFoot;
        }
        const textToBe = `${numberWithCommas(numberToBe.toFixed(2))}`;
        this.verifyMonthlyRentByRowCellText(textToBe, rowNumber);
        return this;
    }

    verifyMonthlyRentAnnuallyByRowNumber(annuallyRent: number, rowNumber = 0): this {
        const textToBe = numberWithCommas((annuallyRent / 12).toFixed(2));
        this.verifyMonthlyRentByRowCellText(textToBe, rowNumber);
        return this;
    }

    verifyRentPerSFAnnuallyCellTextByRow(textToBe = "$0.00", rowNumber = 0): this {
        this.Page.rentPerSFAnnuallyCells.eq(rowNumber).should("have.text", textToBe);
        return this;
    }

    verifyRentPerSFAnnuallyMonthlyCalcByRowNumber(monthlyRent: number, squareFoot: number, rowNumber = 0): this {
        const textToBe = `$${numberWithCommas(((monthlyRent * 12) / squareFoot).toFixed(2))}`;
        this.verifyRentPerSFAnnuallyCellTextByRow(textToBe, rowNumber);
        return this;
    }

    verifyRentPerSFAnnuallyAnnuallyCalcByRow(annualRent: number, squareFoot: number, rowNumber = 0): this {
        const textToBe = `$${numberWithCommas((annualRent / squareFoot).toFixed(2))}`;
        this.verifyRentPerSFAnnuallyCellTextByRow(textToBe, rowNumber);
        return this;
    }

    annualRentPsfCellsScroll() {
        cy.contains("Rent/SF").scrollIntoView();
        return this;
    }

    verifyRentPsfAnnuallyByRow(rentToBe: number, rowNumber: number): this {
        this.annualRentPsfCellsScroll();
        const textToBe = `$${numberWithCommas(rentToBe.toFixed(2))}`;
        this.verifyRentPerSFAnnuallyCellTextByRow(textToBe, rowNumber);
        return this;
    }

    enterRentPerSFAnnuallyByRowNumber(rentToBe: number, rowNumber = 0): this {
        this.annualRentPsfCellsScroll();
        this.Page.rentPerSFAnnuallyCells.eq(rowNumber).should("not.have.class", "readOnly").dblclick({ force: true });
        this.Page.textareaToInput.clear().type(`${rentToBe}`).type("{enter}");
        this.verifyRentPsfAnnuallyByRow(rentToBe, rowNumber);
        return this;
    }

    verifyRentPerSFMonthlyCellTextByRow(textToBe = "$0.00", rowNumber = 0): this {
        this.Page.rentPerSFMonthlyCells.eq(rowNumber).should("have.text", textToBe);
        return this;
    }

    verifyRentPsfMonthlyByRow(rentToBe: number, rowNumber: number): this {
        const textToBe = `$${numberWithCommas(rentToBe.toFixed(2))}`;
        this.verifyRentPerSFMonthlyCellTextByRow(textToBe, rowNumber);
        return this;
    }

    enterRentPerSFMonthlyByRowNumber(value: number, rowNumber = 0): this {
        this.Page.rentPerSFMonthlyCells.eq(rowNumber).should("not.have.class", "readOnly").dblclick({ force:true });
        this.Page.textareaToInput.clear().type(`${value}`).type("{enter}");
        this.verifyRentPsfMonthlyByRow(value, rowNumber);
        return this;
    }

    verifySFTotal(sfValues: Array<number>): this {
        let sfTotalToBe = 0;
        sfValues.forEach(value => sfTotalToBe += value);
        const textToBe = numberWithCommas(Math.round(sfTotalToBe));
        this.Page.squareFeetTotal.should("have.text", `${textToBe}`);
        return this;
    }

    clickEditDiscussionButton(): this {
        this.Page.formEditBtn(0).click({ force: true });
        return this;
    }

    editDiscussionTextArea(value: string, clearText = true): this {
        clearText ? this.Page.commentaryText.clear().type(value) :
            this.Page.commentaryText.type(value);
        return this;
    }

    clickSaveDiscussionButton(): this {
        this.Page.formSaveBtn(0).click();
        return this;
    }

    verifyCommentaryFullText(textToBe: string): this {
        this.Page.commentaryText.should("have.text", textToBe);
        return this;
    }

    verifyCommentaryContainsText(verifyAreaValue: string): this {
        this.Page.commentaryText.should("contain.text", verifyAreaValue);
        return this;
    }

    editDiscussion(newCommentary: string, clearText = true, isFullTextVerification = true): this {
        this.Page.modifiedLabel(false).should("not.exist");
        this.clickEditDiscussionButton()
            .editDiscussionTextArea(newCommentary, clearText)
            .clickSaveDiscussionButton();
        if (isFullTextVerification) {
            this.verifyCommentaryFullText(newCommentary);
        } else {
            this.verifyCommentaryContainsText(newCommentary);
        }
        this.Page.modifiedLabel().should("exist");
        return this;
    }

    clickRevertToOriginalButton(): this {
        this.Page.formRevertToOriginalBtn(0).click();
        this.Page.changesLostModalHeader.should("exist");
        return this;
    }

    verifyCommentaryTextNotContains(text: string): this {
        this.Page.commentaryText.should("not.contain.text", text);
        return this;
    }

    verifyCommentaryTextBoxNotHaveText(text: string): this {
        this.Page.commentaryText.should("not.have.text", text);
        return this;
    }

    clickYesRevertButton(): this {
        this.Page.formYesRevertBtn.click();
        return this;
    }

    clickCloseButton(): this {
        this.Page.CloseIcon.click();
        return this;
    }

    clickCancelRevertButton(): this {
        this.Page.cancelRevertButton.click();
        return this;
    }

    verifyEditDiscussionButtonsDisplayed(): this {
        this.Page.formCancelButton(0).should("be.visible");
        this.Page.editDiscussionButton.should("not.exist");
        this.Page.formRevertToOriginalBtn(0).should("be.visible");
        this.Page.formSaveBtn(0).should("be.visible");
        return this;
    }

    clickCancelDiscussionEditButton(): this {
        this.Page.formCancelButton(0).click();
        return this;
    }

    revertToOriginalCommentary(): this {
        this.clickEditDiscussionButton()
            .clickRevertToOriginalButton()
            .verifyProgressBarNotExist()
            .clickYesRevertButton()
            .clickSaveDiscussionButton();
        return this;
    }

    verifyModifiedLabelExist(): this {
        this.Page.modifiedLabel().should('exist');
        return this;
    }
}

export default CommercialRentRollSharedComponent;