import stabRenRollPage from "../../../pages/income/commercial/stabilizedRentRoll.page";
import {numberWithCommas} from "../../../../utils/numbers.utils";
import BaseActionsExt from "../../base/base.actions.ext";

class StabilizedRentRollActions extends BaseActionsExt<typeof stabRenRollPage>{

    verifyIsInspectedChecked(): this {
        stabRenRollPage.elementToVerifyIsInspected.should("have.css", "background-color", "rgb(66, 96, 211)");
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

    verifyAnnuallyRentPsf(rentToBe: string | number, rowNumber: number): this {
        stabRenRollPage.annualRentPsfCells.eq(rowNumber).should("contain.text", rentToBe);
        return this;
    }

    clickEditDiscussionButton(): this {
        stabRenRollPage.editDiscussionButton.scrollIntoView().click();
        return this;
    }

    clickCancelEditDiscussionButton(): this {
        stabRenRollPage.cancelEditDiscussionButton.scrollIntoView().click();
        return this;
    }
}

export default new StabilizedRentRollActions(stabRenRollPage);