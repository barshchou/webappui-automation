import BaseActions from "../base/base.actions";
import expenseHistoryPage from "../../pages/income/expenseHistory.page";
import {getNumberFromDollarNumberWithCommas, numberWithCommas} from "../../../utils/numbers.utils";

class ExpenseHistoryActions extends BaseActions{

    /**
     *
     * @param {string} value
     * @returns {ExpenseHistoryActions}
     */
    selectExpensePeriod(value: string): ExpenseHistoryActions {
        expenseHistoryPage.expensePeriodDropdown.click();
        expenseHistoryPage.getDropdownOptionByValue(value).click();
        return this;
    }

    /**
     *
     * @param {string | number} yearToBe
     * @returns {ExpenseHistoryActions}
     */
    verifyExpenseYear(yearToBe: string | number): ExpenseHistoryActions {
        expenseHistoryPage.expenseYearInput.should("have.value", yearToBe);
        return this;
    }

    /**
     *
     * @returns {ExpenseHistoryActions}
     */
    clickAddExpenseYearButton(): ExpenseHistoryActions {
        expenseHistoryPage.addExpenseYearButton.click();
        return this;
    }

    /**
     *
     * @param {number} index
     * @returns {ExpenseHistoryActions}
     */
    checkGrossRevenueCheckboxByColumnIndex(index: number = 0): ExpenseHistoryActions {
        expenseHistoryPage.grossRevenueCheckboxes.eq(index).check().should("have.value", "true");
        return this;
    }

    /**
     *
     * @param {number | string} revenue
     * @param {number} index
     * @returns {ExpenseHistoryActions}
     */
    enterGrossRevenueByColIndex(revenue: number | string, index: number = 0): ExpenseHistoryActions {
        const valueToBe = `$${numberWithCommas(revenue)}`;
        expenseHistoryPage.grossRevenueInputs.eq(index).clear().type(revenue).should("have.value", valueToBe);
        return this;
    }

    /**
     *
     * @param {number | string} taxes
     * @param {number} index
     * @returns {ExpenseHistoryActions}
     */
    enterRealEstateTaxesByColIndex(taxes: number | string, index: number = 0): ExpenseHistoryActions {
        expenseHistoryPage.realEstateTaxesInputs.eq(index).clear().type(taxes)
            .should("have.value", `$${numberWithCommas(taxes)}`);
        return this;
    }

    /**
     * @returns {ExpenseHistoryActions}
     */
    enterInsuranceByColIndex(insurance: string | number = 0, index: number = 0): ExpenseHistoryActions {
        //@ts-ignore
        if (insurance === "clear") {
            expenseHistoryPage.insuranceInputs.eq(index).clear();
        } else {
            //@ts-ignore
            expenseHistoryPage.insuranceInputs.eq(index).clear().type(insurance)
                .should("have.value", `$${numberWithCommas(insurance)}`);
        }
        return this;
    }

    /**
     *
     * @param {number | string} electricity
     * @param {number} index
     * @returns {ExpenseHistoryActions}
     */
    enterElectricityByColIndex(electricity: number | string, index: number = 0): ExpenseHistoryActions {
        expenseHistoryPage.electricityInputs.eq(index).clear().type(electricity)
            .should("have.value", `$${numberWithCommas(electricity)}`);
        return this;
    }

    /**
     *
     * @param {string | number} fuel
     * @param {number} index
     * @returns {ExpenseHistoryActions}
     */
    enterFuelByColIndex(fuel: string | number = 0, index: number = 0): ExpenseHistoryActions {
        if (fuel === "clear") {
            expenseHistoryPage.fuelInputs.eq(index).clear();
        } else {
            expenseHistoryPage.fuelInputs.eq(index).clear().type(fuel)
                .should("have.value", `$${numberWithCommas(fuel)}`);
        }
        return this;
    }

    /**
     *
     * @param {number} index
     * @returns {ExpenseHistoryActions}
     */
    uncheckFuelCheckboxByColIndex(index: number = 0): ExpenseHistoryActions {
        expenseHistoryPage.fuelCheckboxes.eq(index).uncheck().should("have.value", "false");
        return this;
    }

    /**
     *
     * @param {number} index
     * @returns {ExpenseHistoryActions}
     */
    uncheckWaterSewerCheckboxByColIndex(index: number = 0): ExpenseHistoryActions {
        expenseHistoryPage.waterSewerCheckboxes.eq(index).uncheck().should("have.value", "false");
        return this;
    }

    /**
     *
     * @param {number | string} value
     * @param {number} index
     * @returns {ExpenseHistoryActions}
     */
    enterPayrollBenefitsByColIndex(value: number | string, index: number = 0): ExpenseHistoryActions {
        expenseHistoryPage.payrollBenefitsInputs.eq(index).clear().type(value)
            .should("have.value", `$${numberWithCommas(value)}`);
        return this;
    }

    /**
     *
     * @param {string} textToBe
     * @param {number} index
     * @returns {ExpenseHistoryActions}
     */
    verifyTotalOpExpensesByColIndex(textToBe: string, index: number = 0): ExpenseHistoryActions {
        expenseHistoryPage.totalOpExpenseCells.eq(index).should("have.text", textToBe);
        return this;
    }

    /**
     *
     * @param {number} retValue
     * @param {number} index
     * @returns {ExpenseHistoryActions}
     */
    verifyTOEExcludingRETByIndex(retValue: number, index: number = 0): ExpenseHistoryActions {
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
    verifyNetOpIncomeByIndex(grossRevenue: number, index: number = 0): ExpenseHistoryActions {
        expenseHistoryPage.totalOpExpenseCells.eq(index).invoke("text").then(toeTotalText => {
            const toeTotalNumber = getNumberFromDollarNumberWithCommas(toeTotalText);
            const noeTextToBe = `$${numberWithCommas((grossRevenue - toeTotalNumber).toFixed(2))}`;
            expenseHistoryPage.netOpIncomeCells.eq(index).should("have.text", noeTextToBe);
        });
        return this;
    }

    /**
     *
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
            let elValue = jQueryElements[i].getAttribute("value");
            if (jQueryElements[i].hasAttribute("disabled") || elValue === "") {
                continue;
            }
            let elNumber = getNumberFromDollarNumberWithCommas(elValue);
            sum += elNumber;
            cellsCounter++;
        }
        if (cellsCounter === 0) cellsCounter = 1;
        return `$${numberWithCommas((sum / cellsCounter).toFixed(2))}`;
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
}

export default new ExpenseHistoryActions();
