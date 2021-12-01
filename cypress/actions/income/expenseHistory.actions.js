import BaseActions from "../base/base.actions";
import expenseHistoryPage from "../../pages/income/expenseHistory.page";
import {getNumberFromDollarNumberWithCommas, numberWithCommas} from "../../../utils/numbers.utils";

class ExpenseHistoryActions extends BaseActions{

    selectExpensePeriod(value) {
        expenseHistoryPage.expensePeriodDropdown.click();
        expenseHistoryPage.getDropdownOptionByValue(value).click();
    }

    verifyExpenseYear(yearToBe) {
        expenseHistoryPage.expenseYearInput.should("have.value", yearToBe);
    }

    clickAddExpenseYearButton() {
        expenseHistoryPage.addExpenseYearButton.click();
    }

    checkGrossRevenueCheckboxByColumnIndex(index = 0) {
        expenseHistoryPage.grossRevenueCheckboxes.eq(index).check().should("have.value", "true");
    }

    enterGrossRevenueByColIndex(revenue, index = 0) {
        const valueToBe = `$${numberWithCommas(revenue)}`;
        expenseHistoryPage.grossRevenueInputs.eq(index).clear().type(revenue).should("have.value", valueToBe);
    }

    enterRealEstateTaxesByColIndex(taxes, index = 0) {
        expenseHistoryPage.realEstateTaxesInputs.eq(index).clear().type(taxes)
            .should("have.value", `$${numberWithCommas(taxes)}`);
    }

    enterInsuranceByColIndex(insurance = 0, index = 0) {
        if (insurance === "clear") {
            expenseHistoryPage.insuranceInputs.eq(index).clear();
        } else {
            expenseHistoryPage.insuranceInputs.eq(index).clear().type(insurance)
                .should("have.value", `$${numberWithCommas(insurance)}`);
        }
    }

    enterElectricityByColIndex(electricity, index = 0) {
        expenseHistoryPage.electricityInputs.eq(index).clear().type(electricity)
            .should("have.value", `$${numberWithCommas(electricity)}`);
    }

    enterFuelByColIndex(fuel = 0, index = 0) {
        if (fuel === "clear") {
            expenseHistoryPage.fuelInputs.eq(index).clear();
        } else {
            expenseHistoryPage.fuelInputs.eq(index).clear().type(fuel)
                .should("have.value", `$${numberWithCommas(fuel)}`);
        }
    }

    uncheckFuelCheckboxByColIndex(index = 0) {
        expenseHistoryPage.fuelCheckboxes.eq(index).uncheck().should("have.value", "false");
    }

    uncheckWaterSewerCheckboxByColIndex(index = 0) {
        expenseHistoryPage.waterSewerCheckboxes.eq(index).uncheck().should("have.value", "false");
    }

    enterPayrollBenefitsByColIndex(value, index = 0) {
        expenseHistoryPage.payrollBenefitsInputs.eq(index).clear().type(value)
            .should("have.value", `$${numberWithCommas(value)}`);
    }

    verifyTotalOpExpensesByColIndex(textToBe, index = 0) {
        expenseHistoryPage.totalOpExpenseCells.eq(index).should("have.text", textToBe);
    }

    verifyTOEExcludingRETByIndex(retValue, index = 0) {
        expenseHistoryPage.totalOpExpenseCells.eq(index).invoke("text").then(toeTotalText => {
            const toeTotalNumber = getNumberFromDollarNumberWithCommas(toeTotalText);
            const excludingTextToBe = `$${numberWithCommas((toeTotalNumber - retValue).toFixed(2))}`;
            expenseHistoryPage.toeExclRealEstTaxesCells.eq(index).should("have.text", excludingTextToBe);
        });
    }

    verifyNetOpIncomeByIndex(grossRevenue, index = 0) {
        expenseHistoryPage.totalOpExpenseCells.eq(index).invoke("text").then(toeTotalText => {
            const toeTotalNumber = getNumberFromDollarNumberWithCommas(toeTotalText);
            const noeTextToBe = `$${numberWithCommas((grossRevenue - toeTotalNumber).toFixed(2))}`;
            expenseHistoryPage.netOpIncomeCells.eq(index).should("have.text", noeTextToBe);
        });
    }

    verifyAverageTable() {
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
    }

    getAverageTextFromCells(jQueryEls) {
        let sum = 0;
        for (let i = 0; i < jQueryEls.length; i++) {
            cy.log(`Get text as content ${jQueryEls[i].textContent}`);
            let elNumber = getNumberFromDollarNumberWithCommas(jQueryEls[i].textContent);
            sum += elNumber;
        }
        return `$${numberWithCommas((sum / jQueryEls.length).toFixed(2))}`;
    }


    getAverageValueFromInputs(jQueryElements) {
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

    verifyExpenseHistoryCommentary(commToBe) {
        expenseHistoryPage.expenseHistoryCommentary.should("have.text", commToBe);
    }
}

export default new ExpenseHistoryActions();
