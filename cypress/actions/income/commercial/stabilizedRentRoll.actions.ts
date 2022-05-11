import stabRentRollPage from "../../../pages/income/commercial/stabilizedRentRoll.page";
import {numberWithCommas} from "../../../../utils/numbers.utils";
import BaseActionsExt from "../../base/base.actions.ext";

class StabilizedRentRollActions extends BaseActionsExt<typeof stabRentRollPage>{

    verifyIsInspectedChecked(rowNumber= 0): this {
        stabRentRollPage.elementToVerifyIsInspected.eq(rowNumber).should("have.css", "background-color", "rgb(66, 96, 211)");
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

    verifyThatPageIsOpened(): this {
        stabRentRollPage.stabilizedRentRollheaderSection.should("be.visible");
        cy.url().then(url => {
            let urlObj = new URL(url);
            cy.log("Check whether current URL ends with '/commercial-projected-rent-roll'");
            cy.wrap(urlObj.pathname.endsWith("/commercial-projected-rent-roll")).should("be.true");
        });
        return this;
    }

    verifyLeaseStatusByRow(leaseStatus: BoweryReports.LeaseStatus, rowNumber = 0): this {
        stabRentRollPage.leaseStatusCells.eq(rowNumber).should("contain.text", leaseStatus);
        return this;
    }

    verifyLeaseStatuses(statuses: Array<BoweryReports.LeaseStatus>): this {
        statuses.forEach((status, index) => {
            this.verifyLeaseStatusByRow(status, index);
        });
        return this;
    }

    verifyTenantNameByRow(name: string, leaseStatus: BoweryReports.LeaseStatus, rowNumber = 0): this {
        let textToBe = leaseStatus === "Vacant" ? `Commercial Unit ${rowNumber + 1}` : name;
        stabRentRollPage.tenantNameCells.eq(rowNumber).should("have.text", textToBe);
        return this;
    }

    verifyTenantNames(names: Array<string>, leaseStatuses: Array<BoweryReports.LeaseStatus>): this {
        names.forEach((name, index) => {
            this.verifyTenantNameByRow(name, leaseStatuses[index], index);
        });
        return this;
    }

    verifyUseCellByRow(useText: BoweryReports.CommercialUnitsUseTexts, rowNumber = 0): this {
        stabRentRollPage.useCells.eq(rowNumber).should("have.text", useText);
        return this;
    }

    verifyUseCells(useTexts: Array<BoweryReports.CommercialUnitsUseTexts>): this {
        useTexts.forEach((text, index) => {
            this.verifyUseCellByRow(text, index);
        });
        return this;
    }

    verifySfCellByRow(squareFeet: string | number, rowNumber = 0): this {
        const textToBe = typeof squareFeet === "string" ? squareFeet : numberWithCommas(squareFeet);
        stabRentRollPage.sfCells.eq(rowNumber).should("have.text", textToBe);
        return this;
    }

    verifySFCells(squareFeetValues: Array<string | number>): this {
        squareFeetValues.forEach((value, index) => {
            this.verifySfCellByRow(value, index);
        });
        return this;
    }

    verifyAnnualRentByRow(rentToBe: string, rowNumber: number): this{
        stabRentRollPage.annualRentCells.eq(rowNumber).should("contain.text", rentToBe);
        return this;
    }

    verifyMonthlyRentByRow(rentToBe: string, rowNumber: number): this {
        stabRentRollPage.monthlyRentCells.eq(rowNumber).should("contain.text", rentToBe);
        return this;
    }

    annualRentPsfCellsScroll() {
        cy.contains("Rent/SF").scrollIntoView();
        return this;
    }

    enterAnnualRentPerSFByRowNumber(rentToBe: string | number, rowNumber: number): this {
        this.annualRentPsfCellsScroll();
        stabRentRollPage.annualRentPsfCells.eq(rowNumber).dblclick({ force: true });
        stabRentRollPage.textareaToInput.clear().type(`${rentToBe}`).type("{enter}");
        this.verifyAnnuallyRentPsf(rentToBe, rowNumber);
        return this;
    }

    enterListPerSF(leaseStatuses: Array<BoweryReports.LeaseStatus>, rentToBe: Array<string | number>): this {
        for (let i = 0; i < leaseStatuses.length; i++) {
            if (leaseStatuses[i] === "Vacant") {
                this.enterAnnualRentPerSFByRowNumber(rentToBe[i], i);
            }
        }
        return this;
    }

    verifyAnnuallyRentPsf(rentToBe: string | number, rowNumber: number): this {
        this.annualRentPsfCellsScroll;
        stabRentRollPage.annualRentPsfCells.eq(rowNumber).should("contain.text", rentToBe);
        return this;
    }

    verifyAnnuallyRentPsfByRowNumber(leaseStatuses: Array<BoweryReports.LeaseStatus>, rentToBe: Array<string | number>): this {
        this.annualRentPsfCellsScroll;
        for (let i = 0; i < rentToBe.length; i++) {
            if (leaseStatuses[i] === "Vacant") {
                this.verifyAnnuallyRentPsf(rentToBe[i], i);
            }
        }
        return this;
    }

    clickEditStabilizedCommercialIncomeDiscussion(): StabilizedRentRollActions {
        stabRentRollPage.formEditBtn(0).click();
        return this;
    }

    typeStabilizedCommercialIncomeTextArea(value: string): StabilizedRentRollActions {
        stabRentRollPage.stabilizedCommercialIncomeTextArea.type(value);
        return this;
    }

    clickNarrativeSuggestions(verifyListValue: string): StabilizedRentRollActions {
        stabRentRollPage.narrativeSuggestionsList.contains(verifyListValue).click();
        return this;
    }

    verifyStabilizedCommercialIncomeTextArea(verifyAreaValue: string): StabilizedRentRollActions {
        stabRentRollPage.stabilizedCommercialIncomeTextArea.should("contain.text", verifyAreaValue);
        return this;
    }

    saveStabilizedRentRollCommentary(): StabilizedRentRollActions {
        this.Page.formSaveBtn(1);
        return this;
    }

    verifyModifiedLabelExist(): StabilizedRentRollActions {
        stabRentRollPage.stabilizedRentRollModifiedLabel.should('exist');
        return this;
    }

}

export default new StabilizedRentRollActions(stabRentRollPage);