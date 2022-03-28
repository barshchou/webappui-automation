import BaseActions from "../base/base.actions";
import compExpensesPage from "../../pages/income/comparableExpenses.page";
import {getNumberFromDollarNumberWithCommas, numberWithCommas} from "../../../utils/numbers.utils";

class ComparableExpensesActions extends BaseActions {

    get Page() {
        return compExpensesPage;
    }

    clickAddBlankColumnButton(): ComparableExpensesActions {
        compExpensesPage.addBlankColumnButton.click();
        return this;
    }

    enterAddressByColumnIndex(address: string, index: number = 0): ComparableExpensesActions {
        compExpensesPage.compAddressCells.eq(index).as("address");
        cy.get("@address").scrollIntoView();
        cy.get("@address").type(address, {force:true}).should("have.value", address);
        return this;
    }

    enterLocationByColumnIndex(location: string, index: number = 0): ComparableExpensesActions {
        compExpensesPage.compLocationCells.eq(index).as("location");
        cy.get("@location").scrollIntoView();
        cy.get("@location").clear({force:true});
        cy.get("@location").type(location, {force:true}).should("have.value", location);
        return this;
    }

    chooseExpensePeriodByColumnIndex(periodValue: string, index: number = 0): ComparableExpensesActions {
        compExpensesPage.expensePeriodDropdowns.eq(index).as("period");
        cy.get("@period").scrollIntoView().click();
        compExpensesPage.getDropdownOptionByValue(periodValue).scrollIntoView().click();
        return this;
    }

    enterSquareFeetByColumnIndex(value: number, index: number = 0): ComparableExpensesActions {
        compExpensesPage.squareFeetCells.eq(index).as("squareFeet");
        cy.get("@squareFeet").scrollIntoView();
        cy.get("@squareFeet").clear({force:true});
        cy.get("@squareFeet").type(`${value}`, {force:true}).should("have.value", `${numberWithCommas(value)}`);
        return this;
    }

    enterResidentialUnitsByColumnIndex(value: number, index: number = 0): ComparableExpensesActions {
        compExpensesPage.residentialUnitsCells.eq(index).as("units");
        cy.get("@units").scrollIntoView();
        cy.get("@units").clear({force:true});
        cy.get("@units").type(`${value}`, {force:true}).should("have.value", value);
        return this;
    }

    enterCellDollarValueByColumnIndex(cellsElements: Cypress.Chainable, value: number, index: number = 0): ComparableExpensesActions {
        const valueToBe = `$${numberWithCommas(value)}`;
        cellsElements.eq(index).as("cellToEnter");
        cy.get("@cellToEnter").scrollIntoView();
        cy.get("@cellToEnter").clear({force: true});
        cy.get("@cellToEnter").type(`${value}`, {force: true}).should("have.value", valueToBe);
        return this;
    }

    verifyTOEByColumnIndex(textToBe: string, index: number = 0): ComparableExpensesActions {
        compExpensesPage.totalOpExpensesCells.eq(index).should("have.text", textToBe);
        return this;
    }

    verifyTOEPerSFByColumnIndex(index: number = 0): ComparableExpensesActions {
        compExpensesPage.totalOpExpensesCells.eq(index).then(el => {
           const toeNumber = getNumberFromDollarNumberWithCommas(el.text());
           compExpensesPage.squareFeetCells.eq(index).invoke("attr", "value").then(sfVal => {
              const sfNumber = getNumberFromDollarNumberWithCommas(sfVal);
              const toePerSFTextToBe = `$${numberWithCommas((toeNumber / sfNumber).toFixed(2))}`;
              compExpensesPage.toePerSFCells.eq(index).should("have.text", toePerSFTextToBe);
           });
        });
        return this;
    }

    verifyToePerUnitByColumnIndex(index: number = 0): ComparableExpensesActions {
        compExpensesPage.totalOpExpensesCells.eq(index).invoke("text").then(toe => {
            const toeNumber = getNumberFromDollarNumberWithCommas(toe);
            compExpensesPage.residentialUnitsCells.eq(index).invoke("attr", "value").then(units => {
                const unitsNumber = getNumberFromDollarNumberWithCommas(units);
                const toePerUnitTextToBe = `$${numberWithCommas((toeNumber / unitsNumber).toFixed(2))}`;
                compExpensesPage.toePerUnitCells.eq(index).should("have.text", toePerUnitTextToBe);
            });
        });
        return this;
    }

    verifySquareFeetAverage(): ComparableExpensesActions {
        compExpensesPage.squareFeetCells.then(elements => {
           const averageTextToBe = numberWithCommas(Math.round(this.getAverageValueFromInputs(elements)));
           compExpensesPage.squareFeetAverage.should("have.text", averageTextToBe);
        });
        return this;
    }

    verifyUnitsNumberAverage(): ComparableExpensesActions {
        compExpensesPage.residentialUnitsCells.then(elements => {
            const averageTextToBe = numberWithCommas(Math.round(this.getAverageValueFromInputs(elements)));
            compExpensesPage.residentialUnitsAverage.should("have.text", averageTextToBe);
        });
        return this;
    }

    /**
     * @private
     * @param {JQuery<HTMLElement>} elements
     * @returns {number}
     */
    getAverageValueFromInputs(elements) {
        let sum = 0;
        let counterOfElements = 0;
        for (let i = 0; i < elements.length; i++) {
            let elValue = elements[i].getAttribute("value");
            if (elValue === "") {
                continue;
            }
            let valueNumber = getNumberFromDollarNumberWithCommas(elValue);
            sum += valueNumber;
            counterOfElements++;
        }
        if (counterOfElements === 0) {
            return 0;
        }
        return sum / counterOfElements;
    }

    verifyEGIAverage(): ComparableExpensesActions {
        compExpensesPage.egiCells.then(elements => {
            const averageNumber = this.getAverageValueFromInputs(elements);
            const textToBe = averageNumber === 0 ? "-" : `$${numberWithCommas(averageNumber.toFixed(2))}`;
            compExpensesPage.egiAverage.should("have.text", textToBe);
        });
        return this;
    }

    verifyInsuranceAverage(): ComparableExpensesActions {
        compExpensesPage.insuranceCells.then(elements => {
            const averageNumber = this.getAverageValueFromInputs(elements);
            const textToBe = this.getCellTextForNumberCells(averageNumber);
            compExpensesPage.insuranceAverage.should("have.text", textToBe);
        });
        return this;
    }

    private getCellTextForNumberCells(averageNumber: number): string {
        return averageNumber === 0 ? "$0.00" : `$${numberWithCommas(averageNumber.toFixed(2))}`;
    }

    verifyElectricityAverage(): ComparableExpensesActions {
        compExpensesPage.electricityCells.then(elements => {
            const averageNumber = this.getAverageValueFromInputs(elements);
            const textToBe = this.getCellTextForNumberCells(averageNumber);
            compExpensesPage.electricityAverage.should("have.text", textToBe);
        });
        return this;
    }

    verifyFuelAverage(): ComparableExpensesActions {
        compExpensesPage.fuelCells.then(elements => {
            const averageNumber = this.getAverageValueFromInputs(elements);
            const textToBe = this.getCellTextForNumberCells(averageNumber);
            compExpensesPage.fuelAverage.should("have.text", textToBe);
        });
        return this;
    }

    verifyWaterSewerAverage(): ComparableExpensesActions {
        compExpensesPage.waterSewerCells.then(elements => {
            const averageNumber = this.getAverageValueFromInputs(elements);
            const textToBe = this.getCellTextForNumberCells(averageNumber);
            compExpensesPage.waterSewerAverage.should("have.text", textToBe);
        });
        return this;
    }

    verifyRepairsMaintenanceAverage(): ComparableExpensesActions {
        compExpensesPage.repairsCells.then(elements => {
            const averageNumber = this.getAverageValueFromInputs(elements);
            const textToBe = this.getCellTextForNumberCells(averageNumber);
            compExpensesPage.repairsAverage.should("have.text", textToBe);
        });
        return this;
    }

    verifyPayrollBenefitsAverage(): ComparableExpensesActions {
        compExpensesPage.payrollCells.then(elements => {
            const averageNumber = this.getAverageValueFromInputs(elements);
            const textToBe = this.getCellTextForNumberCells(averageNumber);
            compExpensesPage.payrollBenefitsAverage.should("have.text", textToBe);
        });
        return this;
    }

    verifyGeneralAdministrativeAverage(): ComparableExpensesActions {
        compExpensesPage.generalCells.then(elements => {
            const averageNumber = this.getAverageValueFromInputs(elements);
            const textToBe = this.getCellTextForNumberCells(averageNumber);
            compExpensesPage.generalAdministrativeAverage.should("have.text", textToBe);
        });
        return this;
    }

    verifyLegalProFeesAverage(): ComparableExpensesActions {
        compExpensesPage.legalProFeesCells.then(elements => {
            const averageNumber = this.getAverageValueFromInputs(elements);
            const textToBe = this.getCellTextForNumberCells(averageNumber);
            compExpensesPage.legalProFeesAverage.should("have.text", textToBe);
        });
        return this;
    }

    verifyMiscellaneousAverage(): ComparableExpensesActions {
        compExpensesPage.miscellaneousCells.then(elements => {
            const averageNumber = this.getAverageValueFromInputs(elements);
            const textToBe = this.getCellTextForNumberCells(averageNumber);
            compExpensesPage.miscellaneousAverage.should("have.text", textToBe);
        });
        return this;
    }

    verifyManagementAverage(): ComparableExpensesActions {
        compExpensesPage.managementFeesCells.then(elements => {
            const averageNumber = this.getAverageValueFromInputs(elements);
            const textToBe = this.getCellTextForNumberCells(averageNumber);
            compExpensesPage.managementAverage.should("have.text", textToBe);
        });
        return this;
    }

    verifyReservesAverage(): ComparableExpensesActions {
        compExpensesPage.reservesCells.then(elements => {
           const averageNumber = this.getAverageValueFromInputs(elements);
           const textToBe = this.getCellTextForNumberCells(averageNumber);
           compExpensesPage.reservesAverage.should("have.text", textToBe);
        });
        return this;
    }

    verifyDollarCellsAverage(cellsElements: Cypress.Chainable, averageCell: Cypress.Chainable): ComparableExpensesActions {
        cellsElements.then(elements => {
            const averageNumber = this.getAverageValueFromInputs(elements);
            const textToBe = this.getCellTextForNumberCells(averageNumber);
            averageCell.should("have.text", textToBe);
        });
        return this;
    }

    verifyTableAverageValues(): ComparableExpensesActions {
        this.verifySquareFeetAverage()
            .verifyUnitsNumberAverage()
            .verifyEGIAverage()
            // .verifyDollarCellsAverage(compExpensesPage.insuranceCells, compExpensesPage.insuranceAverage)
            // .verifyDollarCellsAverage(compExpensesPage.electricityCells, compExpensesPage.electricityAverage)
            // .verifyDollarCellsAverage(compExpensesPage.fuelCells, compExpensesPage.fuelAverage)
            // .verifyDollarCellsAverage(compExpensesPage.waterSewerCells, compExpensesPage.waterSewerAverage)
            // .verifyDollarCellsAverage(compExpensesPage.repairsCells, compExpensesPage.repairsAverage)
            // .verifyDollarCellsAverage(compExpensesPage.payrollCells, compExpensesPage.payrollBenefitsAverage)
            // .verifyDollarCellsAverage(compExpensesPage.generalCells, compExpensesPage.generalAdministrativeAverage)
            // .verifyDollarCellsAverage(compExpensesPage.legalProFeesCells, compExpensesPage.legalProFeesAverage)
            // .verifyDollarCellsAverage(compExpensesPage.miscellaneousCells, compExpensesPage.miscellaneousAverage)
            // .verifyDollarCellsAverage(compExpensesPage.managementFeesCells, compExpensesPage.managementAverage)
            // .verifyDollarCellsAverage(compExpensesPage.reservesCells, compExpensesPage.repairsAverage);
            .verifyInsuranceAverage()
            .verifyElectricityAverage()
            .verifyFuelAverage()
            .verifyWaterSewerAverage()
            .verifyRepairsMaintenanceAverage()
            .verifyPayrollBenefitsAverage()
            .verifyGeneralAdministrativeAverage()
            .verifyLegalProFeesAverage()
            .verifyMiscellaneousAverage()
            .verifyManagementAverage()
            .verifyReservesAverage();
        return this;
    }
}

export default new ComparableExpensesActions();
