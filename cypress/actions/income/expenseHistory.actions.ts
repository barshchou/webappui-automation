import expenseHistoryPage from "../../pages/income/expenseHistory.page";
import {getNumberFromDollarNumberWithCommas, numberWithCommas} from "../../../utils/numbers.utils";
import BaseActionsExt from "../base/base.actions.ext";

class ExpenseHistoryActions extends BaseActionsExt<typeof expenseHistoryPage>{

    selectExpensePeriod(value: string): ExpenseHistoryActions {
        expenseHistoryPage.expensePeriodDropdown.click();
        expenseHistoryPage.getDropdownOptionByValue(value).click();
        return this;
    }

    verifyExpenseYear(yearToBe: number | string): ExpenseHistoryActions {
        expenseHistoryPage.expenseYearInput.should("have.value", yearToBe);
        return this;
    }

    enterExpenseYear(year: number | string): ExpenseHistoryActions {
        expenseHistoryPage.expenseYearInput.clear().type(`${year}`);
        this.verifyExpenseYear(year);
        return this;
    }

    clickAddExpenseYearButton(): ExpenseHistoryActions {
        expenseHistoryPage.addExpenseYearButton.click();
        return this;
    }

    enterRepairsAndMaintenanceByColIndex(repairsAndMaintenance: number | string, index = 0): ExpenseHistoryActions {
        if (repairsAndMaintenance === "clear") {
            expenseHistoryPage.repairsInputs.eq(index).clear();
        } else {
            expenseHistoryPage.repairsInputs.eq(index).dblclick().scrollIntoView().clear().realType(`${repairsAndMaintenance}{enter}`);
            expenseHistoryPage.repairsInputs.eq(index).should("have.text", `$${numberWithCommas(repairsAndMaintenance)}.00`);
        }
        return this;
    }

    /**
     *
     * @param {number} index
     * @returns {ExpenseHistoryActions}
     */
    checkGrossRevenueCheckboxByColumnIndex(index = 0): ExpenseHistoryActions {
        expenseHistoryPage.grossRevenueCheckboxes.eq(index).check().should("have.value", "true");
        return this;
    }

    enterGrossRevenueByColIndex(revenue: number | string, index = 0): ExpenseHistoryActions {
        const valueToBe = `$${numberWithCommas(revenue)}`;
        expenseHistoryPage.grossRevenueInputs.eq(index).clear().type(`${revenue}`).should("have.value", valueToBe);
        return this;
    }

    enterRealEstateTaxesByColIndex(taxes: number | string, index = 0): ExpenseHistoryActions {
        expenseHistoryPage.realEstateTaxesInputs.eq(index).clear().type(`${taxes}`)
            .should("have.value", `$${numberWithCommas(taxes)}`);
        return this;
    }

    enterInsuranceByColIndex(insurance: string | number = 0, index = 0): ExpenseHistoryActions {
        if (insurance === "clear") {
            expenseHistoryPage.insuranceInputs.eq(index).clear();
        } else {
            expenseHistoryPage.insuranceInputs.eq(index).clear().type(`${insurance}`)
                .should("have.value", `$${numberWithCommas(insurance)}`);
        }
        return this;
    }

    enterElectricityByColIndex(electricity: number | string, index = 0): ExpenseHistoryActions {
        expenseHistoryPage.electricityInputs.eq(index).dblclick().scrollIntoView().clear().realType(`${electricity}{enter}`);
        expenseHistoryPage.electricityInputs.eq(index).should("have.text", `$${numberWithCommas(electricity)}.00`);
        return this;
    }

    enterFuelByColIndex(fuel: string | number = 0, index = 0): ExpenseHistoryActions {
        if (fuel === "clear") {
            expenseHistoryPage.fuelInputs.eq(index).clear();
        } else {
            expenseHistoryPage.fuelInputs.eq(index).dblclick().scrollIntoView().clear().realType(`${fuel}{enter}`);
            expenseHistoryPage.fuelInputs.eq(index).should("have.text", `$${numberWithCommas(fuel)}.00`);
        }
        return this;
    }

    /**
     *
     * @param {number} index
     * @returns {ExpenseHistoryActions}
     */
    uncheckFuelCheckboxByColIndex(index = 0): ExpenseHistoryActions {
        expenseHistoryPage.fuelCheckboxes.eq(index).uncheck().should("have.value", "false");
        return this;
    }

    /**
     *
     * @param {number} index
     * @returns {ExpenseHistoryActions}
     */
    uncheckWaterSewerCheckboxByColIndex(index = 0): ExpenseHistoryActions {
        expenseHistoryPage.waterSewerCheckboxes.eq(index).uncheck().should("have.value", "false");
        return this;
    }

    enterPayrollBenefitsByColIndex(value: number | string, index = 0): ExpenseHistoryActions {
        expenseHistoryPage.payrollBenefitsInputs.eq(index).clear().type(`${value}`)
            .should("have.value", `$${numberWithCommas(value)}`);
        return this;
    }

    /**
     *
     * @param {string} textToBe
     * @param {number} index
     * @returns {ExpenseHistoryActions}
     */
    verifyTotalOpExpensesByColIndex(textToBe: string, index = 0): ExpenseHistoryActions {
        expenseHistoryPage.totalOpExpenseCells.eq(index).should("have.text", textToBe);
        return this;
    }

    /**
     *
     * @param {number} retValue
     * @param {number} index
     * @returns {ExpenseHistoryActions}
     */
    verifyTOEExcludingRETByIndex(retValue: number, index = 0): ExpenseHistoryActions {
        expenseHistoryPage.totalOpExpenseCells.eq(index).invoke("text").then(toeTotalText => {
            const toeTotalNumber = getNumberFromDollarNumberWithCommas(toeTotalText);
            const excludingTextToBe = `$${numberWithCommas((toeTotalNumber - retValue).toFixed(2))}`;
            expenseHistoryPage.toeExclRealEstTaxesCells.eq(index).should("have.text", excludingTextToBe);
        });
        return this;
    }

    /**
     *
     * @param {number} grossRevenue
     * @param {number} index
     * @returns {ExpenseHistoryActions}
     */
    verifyNetOpIncomeByIndex(grossRevenue: number, index = 0): ExpenseHistoryActions {
        expenseHistoryPage.totalOpExpenseCells.eq(index).invoke("text").then(toeTotalText => {
            const toeTotalNumber = getNumberFromDollarNumberWithCommas(toeTotalText);
            const noeTextToBe = `$${numberWithCommas((grossRevenue - toeTotalNumber).toFixed(2))}`;
            expenseHistoryPage.netOpIncomeCells.eq(index).should("have.text", noeTextToBe);
        });
        return this;
    }

    /**
     * NOTE: please see QA-5202 for more details
     * @returns {ExpenseHistoryActions}
     */
    verifyAverageTable(): ExpenseHistoryActions {
        expenseHistoryPage.grossRevenueInputs.then(els => {
            const grossRevAverageToBe = this.getAverageValueFromInputs(els);
            expenseHistoryPage.averageGrossRevenueCell.should("have.text", grossRevAverageToBe);
        });
        expenseHistoryPage.realEstateTaxesInputs.then(els => {
            const realEstateAverageToBe = this.getAverageValueFromInputs(els);
            expenseHistoryPage.averageRealEstateCell.should("have.text", realEstateAverageToBe);
        });
        expenseHistoryPage.insuranceInputs.then(els => {
            const insuranceAverageToBe = this.getAverageValueFromInputs(els);
            expenseHistoryPage.averageInsuranceCell.should("have.text", insuranceAverageToBe);
        });
        expenseHistoryPage.electricityInputs.then(els => {
            const electricityAverageToBe = this.getAverageValueFromInputs(els);
            expenseHistoryPage.averageElectricity.should("have.text", electricityAverageToBe);
        });
        expenseHistoryPage.fuelInputs.then(els => {
            const fuelAverageToBe = this.getAverageValueFromInputs(els);
            expenseHistoryPage.averageFuelCell.should("have.text", fuelAverageToBe);
        });
        expenseHistoryPage.waterSewerInputs.then(els => {
            const waterSewerAvrgToBe = this.getAverageValueFromInputs(els);
            expenseHistoryPage.averageWaterSewerCell.should("have.text", waterSewerAvrgToBe);
        });
        expenseHistoryPage.repairsInputs.then(els => {
            const repairsAvrgToBe = this.getAverageValueFromInputs(els);
            expenseHistoryPage.averageRepairsCell.should("have.text", repairsAvrgToBe);
        });
        expenseHistoryPage.payrollBenefitsInputs.then(els => {
            const payrollAvrgToBe = this.getAverageValueFromInputs(els);
            expenseHistoryPage.averagePayrollCell.should("have.text", payrollAvrgToBe);
        });
        expenseHistoryPage.administrativeInputs.then(els => {
            const administrativeAvrgToBe = this.getAverageValueFromInputs(els);
            expenseHistoryPage.averageAdministrativeCell.should("have.text", administrativeAvrgToBe);
        });
        expenseHistoryPage.professionalInputs.then(els => {
            const professionalAvrgToBe = this.getAverageValueFromInputs(els);
            expenseHistoryPage.averageProfessionalCell.should("have.text", professionalAvrgToBe);
        });
        expenseHistoryPage.miscellaneousInputs.then(els => {
            const miscellaneousAvrgToBe = this.getAverageValueFromInputs(els);
            expenseHistoryPage.averageMiscellaneousCell.should("have.text", miscellaneousAvrgToBe);
        });
        expenseHistoryPage.managementInputs.then(els => {
            const managementAvrgToBe = this.getAverageValueFromInputs(els);
            expenseHistoryPage.averageManagementCell.should("have.text", managementAvrgToBe);
        });
        expenseHistoryPage.replacementInputs.then(els => {
            const reservesAvrgToBe = this.getAverageValueFromInputs(els);
            expenseHistoryPage.averageReplacementCell.should("have.text", reservesAvrgToBe);
        });
        expenseHistoryPage.totalOpExpenseCells.then(els => {
            const toeAvrgToBe = this.getAverageTextFromCells(els);
            expenseHistoryPage.toeAverageCell.should("have.text", toeAvrgToBe);
        });
        expenseHistoryPage.toeExclRealEstTaxesCells.then(els => {
            const toeExclRETAvrgToBe = this.getAverageTextFromCells(els);
            expenseHistoryPage.toeExclRETAverageCell.should("have.text", toeExclRETAvrgToBe);
        });
        expenseHistoryPage.netOpIncomeCells.then(els => {
            const noeAvrgToBe = this.getAverageTextFromCells(els);
            expenseHistoryPage.noeAverageCell.should("have.text", noeAvrgToBe);
        });
        return this;
    }

    /**
     * @private
     * @param {JQuery<HTMLElement>} jQueryEls
     * @returns {string}
     */
    getAverageTextFromCells(jQueryEls: JQuery<HTMLElement>): string {
        let sum = 0;
        for (let i = 0; i < jQueryEls.length; i++) {
            let elNumber = getNumberFromDollarNumberWithCommas(jQueryEls[i].textContent);
            sum += elNumber;
        }
        const firstChar = numberWithCommas((sum / jQueryEls.length).toFixed(2)).charAt(0);
          if (firstChar === "-") {
            return `-$${numberWithCommas((sum / jQueryEls.length).toFixed(2)).substring(1)}`;
          }
          return `$${numberWithCommas((sum / jQueryEls.length).toFixed(2))}`;
    }


    /**
     * @private
     * @param {JQuery<HTMLElement>} jQueryElements
     * @returns {string}
     */
    getAverageValueFromInputs(jQueryElements: JQuery<HTMLElement>): string {
        let cellsCounter = 0;
        let sum = 0;
        for (let i = 0; i < jQueryElements.length; i++) {
            let elValue = jQueryElements[i].textContent;
            cy.log(`Element value ${i} = ${elValue}`);
            if (elValue === null || elValue === "") {
                continue;
            }
            let elNumber = getNumberFromDollarNumberWithCommas(elValue);
            sum += elNumber;
            cellsCounter++;
        }
        cy.log(`Cells counter = ${cellsCounter}`);
        if (cellsCounter === 0) {
            return "";
        } else {
            return `$${numberWithCommas((sum / cellsCounter).toFixed(2))}`;
        }
    }

    /**
     *
     * @param {string} commToBe
     * @returns {ExpenseHistoryActions}
     */
    verifyExpenseHistoryCommentary(commToBe: string): ExpenseHistoryActions {
        expenseHistoryPage.expenseHistoryCommentary.should("have.text", commToBe);
        return this;
    }

    enterExpenseMonth(month: string): ExpenseHistoryActions {
        expenseHistoryPage.expenseMonth.clear().type(month);
        this.verifyExpenseMonth(month);
        return this;
    }

    verifyExpenseMonth(monthToBe: string, expensePeriodValue?: string): ExpenseHistoryActions {
        if (expensePeriodValue === "Projection" || expensePeriodValue === "Actual") {
            expenseHistoryPage.expenseMonthProjection.should("be.disabled").and("have.value", monthToBe);
        } else {
            expenseHistoryPage.expenseMonth.should("have.value", monthToBe);
        }
        return this;
    }
}

export default new ExpenseHistoryActions(expenseHistoryPage);
