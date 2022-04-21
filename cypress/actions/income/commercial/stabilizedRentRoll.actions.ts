import BaseActions from "../../base/base.actions";
import stabRenRollPage from "../../../pages/income/commercial/stabilizedRentRoll.page";
import { numberWithCommas } from "../../../../utils/numbers.utils";

class StabilizedRentRollActions extends BaseActions {

    verifyThatPageIsOpened(): this {
        stabRenRollPage.stabilizedRentRollheaderSection.should("be.visible");
        cy.url().then(url => {
            let urlObj = new URL(url);
            cy.log("Check whether current URL ends with '/commercial-projected-rent-roll'");
            cy.wrap(urlObj.pathname.endsWith("/commercial-projected-rent-roll")).should("be.true");
        });
        return this;
    }


    verifyIsInspectedChecked(rowNumber?: number = 0): StabilizedRentRollActions {
        stabRenRollPage.elementToVerifyIsInspected.eq(rowNumber).should("have.css", "background-color", "rgb(66, 96, 211)");
        return this;
    }

    verifyIsInspectedCheckedAll(isInspected: string): StabilizedRentRollActions {
        for (let i = 0; i < isInspected.length; i++) {
            if (isInspected[i] === "Inspected") {
                this.verifyIsInspectedChecked(i);
            }
        }
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

    verifyAnnualRentByRow(rentToBe: string, rowNumber: number): StabilizedRentRollActions {
        stabRenRollPage.annualRentCells.eq(rowNumber).should("contain.text", rentToBe);
        return this;
    }

    verifyMonthlyRentByRow(rentToBe: string, rowNumber: number): StabilizedRentRollActions {
        stabRenRollPage.monthlyRentCells.eq(rowNumber).should("contain.text", rentToBe);
        return this;
    }

    annualRentPsfCellsScroll() {
        cy.contains("Rent/SF").scrollIntoView();
        return this;
    }

    enterAnnualRentPerSFByRowNumber(rentToBe: string | number, rowNumber: number): StabilizedRentRollActions {
        this.annualRentPsfCellsScroll();
        stabRenRollPage.annualRentPsfCells.eq(rowNumber).dblclick({ force: true });
        stabRenRollPage.annualRentPsfCellsInputField.clear().type(`${rentToBe}`).type("{enter}");
        this.verifyAnnuallyRentPsf(rentToBe, rowNumber);
        return this;
    }

    enterListPerSF(leaseStatuses, rentToBe) {
        for (let i = 0; i < leaseStatuses.length; i++) {
            if (leaseStatuses[i] === "Vacant") {
                this.enterAnnualRentPerSFByRowNumber(rentToBe[i], i);
            }
        }
        return this;
    }

    verifyAnnuallyRentPsf(rentToBe: string | number, rowNumber: number): StabilizedRentRollActions {
        stabRenRollPage.annualRentPsfCellsScroll;
        stabRenRollPage.annualRentPsfCells.eq(rowNumber).should("contain.text", rentToBe);
        return this;
    }

    verifyAnnuallyRentPsfByRowNumber(leaseStatuses, rentToBe): StabilizedRentRollActions {
        stabRenRollPage.annualRentPsfCellsScroll;
        for (let i = 0; i < rentToBe.length; i++) {
            if (leaseStatuses[i] === "Vacant") {
                this.verifyAnnuallyRentPsf(rentToBe[i], i);
            }
        }
        return this;
    }

}

export default new StabilizedRentRollActions();