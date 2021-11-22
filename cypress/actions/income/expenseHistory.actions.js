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

    async getToeNumberValueByIndex(index = 0) {
        const toeTotalText = await expenseHistoryPage.totalOpExpenseCells.eq(index).then(el => el.text()).promisify();
        return getNumberFromDollarNumberWithCommas(toeTotalText);
    }

    async verifyTOEExcludingRETByIndex(retValue, index = 0) {
        const toeTotalNumber = await this.getToeNumberValueByIndex(index);
        const excludingTextToBe = `$${numberWithCommas((toeTotalNumber - retValue).toFixed(2))}`;
        expenseHistoryPage.toeExclRealEstTaxesCells.eq(index).should("have.text", excludingTextToBe);
    }

    async verifyNetOpIncomeByIndex(grossRevenue, index = 0) {
        const toeTotalNumber = await this.getToeNumberValueByIndex(index);
        const noeTextToBe = `$${numberWithCommas((grossRevenue - toeTotalNumber).toFixed(2))}`;
        expenseHistoryPage.netOpIncomeCells.eq(index).should("have.text", noeTextToBe);
    }

    async verifyAverageTable() {
        const grossRevAverageToBe = await expenseHistoryPage.grossRevenueInputs
            .then(els => this.getAverageValueFromInputs(els)).promisify();
        expenseHistoryPage.averageGrossRevenueCell.should("have.text", grossRevAverageToBe);
        const realEstateAverageToBe = await expenseHistoryPage.realEstateTaxesInputs
            .then(els => this.getAverageValueFromInputs(els)).promisify();
        expenseHistoryPage.averageRealEstateCell.should("have.text", realEstateAverageToBe);
        const insuranceAverageToBe = await expenseHistoryPage.insuranceInputs
            .then(els => this.getAverageValueFromInputs(els)).promisify();
        expenseHistoryPage.averageInsuranceCell.should("have.text", insuranceAverageToBe);
        const electricityAverageToBe = await expenseHistoryPage.electricityInputs
            .then(els => this.getAverageValueFromInputs(els)).promisify();
        expenseHistoryPage.averageElectricity.should("have.text", electricityAverageToBe);
        const fuelAverageToBe = await expenseHistoryPage.fuelInputs
            .then(els => this.getAverageValueFromInputs(els)).promisify();
        expenseHistoryPage.averageFuelCell.should("have.text", fuelAverageToBe);
        const waterSewerAvrgToBe = await expenseHistoryPage.waterSewerInputs
            .then(els => this.getAverageValueFromInputs(els)).promisify();
        expenseHistoryPage.averageWaterSewerCell.should("have.text", waterSewerAvrgToBe);
        const repairsAvrgToBe = await expenseHistoryPage.repairsInputs
            .then(els => this.getAverageValueFromInputs(els)).promisify();
        expenseHistoryPage.averageRepairsCell.should("have.text", repairsAvrgToBe);
        const payrollAvrgToBe = await expenseHistoryPage.payrollBenefitsInputs
            .then(els => this.getAverageValueFromInputs(els)).promisify();
        expenseHistoryPage.averagePayrollCell.should("have.text", payrollAvrgToBe);
        const administrativeAvrgToBe = await expenseHistoryPage.administrativeInputs
            .then(els => this.getAverageValueFromInputs(els)).promisify();
        expenseHistoryPage.averageAdministrativeCell.should("have.text", administrativeAvrgToBe);
        const professionalAvrgToBe = await expenseHistoryPage.professionalInputs
            .then(els => this.getAverageValueFromInputs(els)).promisify();
        expenseHistoryPage.averageProfessionalCell.should("have.text", professionalAvrgToBe);
        const miscellaneousAvrgToBe = await expenseHistoryPage.miscellaneousInputs
            .then(els => this.getAverageValueFromInputs(els)).promisify();
        expenseHistoryPage.averageMiscellaneousCell.should("have.text", miscellaneousAvrgToBe);
        const managementAvrgToBe = await expenseHistoryPage.managementInputs
            .then(els => this.getAverageValueFromInputs(els)).promisify();
        expenseHistoryPage.averageManagementCell.should("have.text", managementAvrgToBe);
        const reservesAvrgToBe = await expenseHistoryPage.replacementInputs
            .then(els => this.getAverageValueFromInputs(els)).promisify();
        expenseHistoryPage.averageReplacementCell.should("have.text", reservesAvrgToBe);
        const toeAvrgToBe = await expenseHistoryPage.totalOpExpenseCells
            .then(async els => await this.getAverageTextFromCells(els)).promisify();
        expenseHistoryPage.toeAverageCell.should("have.text", toeAvrgToBe);
        const toeExclRETAvrgToBe = await expenseHistoryPage.toeExclRealEstTaxesCells
            .then(async els => await this.getAverageTextFromCells(els)).promisify();
        expenseHistoryPage.toeExclRETAverageCell.should("have.text", toeExclRETAvrgToBe);
        const noeAvrgToBe = await expenseHistoryPage.netOpIncomeCells
            .then(async els => await this.getAverageTextFromCells(els)).promisify();
        expenseHistoryPage.noeAverageCell.should("have.text", noeAvrgToBe);
    }

    async getAverageTextFromCells(jQueryEls) {
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
