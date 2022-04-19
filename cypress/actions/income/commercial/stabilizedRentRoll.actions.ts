import stabRenRollPage from "../../../pages/income/commercial/stabilizedRentRoll.page";
import {numberWithCommas} from "../../../../utils/numbers.utils";
import BaseActionsExt from "../../base/base.actions.ext";

class StabilizedRentRollActions extends BaseActionsExt<typeof stabRenRollPage>{

    verifyIsInspectedChecked(): StabilizedRentRollActions {
        stabRenRollPage.elementToVerifyIsInspected.should("have.css", "background-color", "rgb(66, 96, 211)");
        return this;
    }

    verifyLeaseStatusByRow(leaseStatus: string, rowNumber: number = 0): StabilizedRentRollActions {
        stabRenRollPage.leaseStatusCells.eq(rowNumber).should("contain.text", leaseStatus);
        return this;
    }

    verifyLeaseStatuses(statuses: Array<string>): StabilizedRentRollActions {
        statuses.forEach((status, index) => {
            this.verifyLeaseStatusByRow(status, index);
        });
        return this;
    }

    verifyTenantNameByRow(name: string, leaseStatus: string, rowNumber: number = 0): StabilizedRentRollActions {
        let textToBe = leaseStatus === "Vacant" ? `Commercial Unit ${rowNumber + 1}` : name;
        stabRenRollPage.tenantNameCells.eq(rowNumber).should("have.text", textToBe);
        return this;
    }

    verifyTenantNames(names: Array<string>, leaseStatuses: Array<string>): StabilizedRentRollActions {
        names.forEach((name, index) => {
            this.verifyTenantNameByRow(name, leaseStatuses[index], index);
        });
        return this;
    }

    verifyUseCellByRow(useText: string, rowNumber: number = 0): StabilizedRentRollActions {
        stabRenRollPage.useCells.eq(rowNumber).should("have.text", useText);
        return this;
    }

    verifyUseCells(useTexts: Array<string>): StabilizedRentRollActions {
        useTexts.forEach((text, index) => {
            this.verifyUseCellByRow(text, index);
        });
        return this;
    }

    verifySfCellByRow(squareFeet: string | number, rowNumber: number = 0): StabilizedRentRollActions {
        const textToBe = typeof squareFeet === "string" ? squareFeet : numberWithCommas(squareFeet);
        stabRenRollPage.sfCells.eq(rowNumber).should("have.text", textToBe);
        return this;
    }

    verifySFCells(squareFeetValues: Array<string | number>): StabilizedRentRollActions {
        squareFeetValues.forEach((value, index) => {
            this.verifySfCellByRow(value, index);
        });
        return this;
    }

    verifyAnnualRentByRow(rentToBe: string, rowNumber: number): StabilizedRentRollActions{
        stabRenRollPage.annualRentCells.eq(rowNumber).should("contain.text", rentToBe);
        return this;
    }

    verifyMonthlyRentByRow(rentToBe: string, rowNumber: number): StabilizedRentRollActions {
        stabRenRollPage.monthlyRentCells.eq(rowNumber).should("contain.text", rentToBe);
        return this;
    }

    verifyAnnuallyRentPsf(rentToBe: string | number, rowNumber: number): StabilizedRentRollActions {
        stabRenRollPage.annualRentPsfCells.eq(rowNumber).should("contain.text", rentToBe);
        return this;
    }

    clickEditStabilizedCommercialIncomeDiscussion(): StabilizedRentRollActions {
        stabRenRollPage.editStabilizedCommercialIncomeDiscussion.click();
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