import BaseActions from "../../base/base.actions";
import stabRenRollPage from "../../../pages/income/commercial/stabilizedRentRoll.page";
import {numberWithCommas} from "../../../../utils/numbers.utils";

class StabilizedRentRollActions extends BaseActions{

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


    enterAnnualRentPerSFByRowNumber(rentToBe: string | number, rowNumber: number ): StabilizedRentRollActions {
      
       // stabRenRollPage.annualRentPsfCells2.eq(rowNumber).should("not.have.class", "readOnly").dblclick({ force: true });
       stabRenRollPage.annualRentPsfCells2.eq(rowNumber).should("not.have.class", "readOnly").click({ force: true }).dblclick({ force: true }).clear().type(`${rentToBe}`).type("{enter}");
      //  stabRenRollPage.annualRentPsfCells.type(`${rentToBe}`).type("{enter}");      //clear() { force: true }
        //const textToBe = `$${numberWithCommas(value.toFixed(2))}`;
     //   this.verifyAnnuallyRentPsf(rentToBe, rowNumber);
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

    verifyAnnuallyRentPsf(rentToBe: string | number, rowNumber: number): StabilizedRentRollActions {
        stabRenRollPage.annualRentPsfCells.eq(rowNumber).should("contain.text", rentToBe);
        return this;
    }


}

export default new StabilizedRentRollActions();