import stabRenRollPage from "../../../pages/income/commercial/stabilizedRentRoll.page";
import {numberWithCommas} from "../../../../utils/numbers.utils";
import BaseActionsExt from "../../base/base.actions.ext";

class StabilizedRentRollActions extends BaseActionsExt<typeof stabRenRollPage>{

    verifyIsInspectedChecked(rowNumber= 0): this {
        stabRenRollPage.elementToVerifyIsInspected.eq(rowNumber).should("have.css", "background-color", "rgb(66, 96, 211)");
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
        stabRenRollPage.leaseStatusCells.eq(rowNumber).should("contain.text", leaseStatus);
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
        stabRenRollPage.tenantNameCells.eq(rowNumber).should("have.text", textToBe);
        return this;
    }

    verifyTenantNames(names: Array<string>, leaseStatuses: Array<BoweryReports.LeaseStatus>): this {
        names.forEach((name, index) => {
            this.verifyTenantNameByRow(name, leaseStatuses[index], index);
        });
        return this;
    }

    verifyUseCellByRow(useText: BoweryReports.CommercialUnitsUseTexts, rowNumber = 0): this {
        stabRenRollPage.useCells.eq(rowNumber).should("have.text", useText);
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
        stabRenRollPage.sfCells.eq(rowNumber).should("have.text", textToBe);
        return this;
    }

    verifySFCells(squareFeetValues: Array<string | number>): this {
        squareFeetValues.forEach((value, index) => {
            this.verifySfCellByRow(value, index);
        });
        return this;
    }

    verifyAnnualRentByRow(rentToBe: string, rowNumber: number): this{
        stabRenRollPage.annualRentCells.eq(rowNumber).should("contain.text", rentToBe);
        return this;
    }

    verifyMonthlyRentByRow(rentToBe: string, rowNumber: number): this {
        stabRenRollPage.monthlyRentCells.eq(rowNumber).should("contain.text", rentToBe);
        return this;
    }

    annualRentPsfCellsScroll() {
        cy.contains("Rent/SF").scrollIntoView();
        return this;
    }

    enterAnnualRentPerSFByRowNumber(rentToBe: string | number, rowNumber: number): this {
        this.annualRentPsfCellsScroll();
        stabRenRollPage.annualRentPsfCells.eq(rowNumber).dblclick({ force: true });
        stabRenRollPage.textareaToInput.clear().type(`${rentToBe}`).type("{enter}");
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
        stabRenRollPage.annualRentPsfCells.eq(rowNumber).should("contain.text", rentToBe);
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
        stabRenRollPage.formEditBtn(0).click();
        return this;
    }

    typeStabilizedCommercialIncomeTextArea(value: string): StabilizedRentRollActions {
        stabRenRollPage.stabilizedCommercialIncomeTextArea.type(value);
        return this;
    }

    clickNarrativeSuggestions(verifyListValue: string): StabilizedRentRollActions {
        stabRenRollPage.narrativeSuggestionsList.contains(verifyListValue).click();
        return this;
    }

    verifyStabilizedCommercialIncomeTextArea(verifyAreaValue: string): StabilizedRentRollActions {
        stabRenRollPage.stabilizedCommercialIncomeTextArea.should("contain.text", verifyAreaValue);
        return this;
    }

}

export default new StabilizedRentRollActions(stabRenRollPage);