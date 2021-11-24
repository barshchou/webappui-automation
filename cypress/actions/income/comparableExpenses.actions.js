import BaseActions from "../base/base.actions";
import compExpensesPage from "../../pages/income/comparableExpenses.page";
import {numberWithCommas} from "../../../utils/numbers.utils";

class ComparableExpensesActions extends BaseActions {
    clickAddBlankColumnButton() {
        compExpensesPage.addBlankColumnButton.click();
    }

    enterAddressByColumnIndex(address, index = 0) {
        compExpensesPage.compAddressCells.eq(index).clear().type(address).should("have.value", address);
    }

    enterLocationByColumnIndex(location, index = 0) {
        compExpensesPage.compLocationCells.eq(index).clear().type(location).should("have.value", location);
    }

    chooseExpensePeriodByColumnIndex(periodValue, index = 0) {
        compExpensesPage.expensePeriodDropdowns.eq(index).click();
        compExpensesPage.getDropdownOptionByValue(periodValue).click();
    }

    enterExpenseYearByColumnIndex(year, index = 0) {
        compExpensesPage.expenseYearCells.eq(index).clear().type(year).should("have.value", year);
    }

    enterExpenseMonthByColumnIndex(month, index = 0) {
        compExpensesPage.expenseMonthCells.eq(index).clear().type(month).type("{enter}").should("have.value", month);
    }

    enterSquareFeetByColumnIndex(value, index = 0) {
        compExpensesPage.squareFeetCells.eq(index).clear().type(value).should("have.value", value);
    }

    enterResidentialUnitsByColumnIndex(value, index = 0) {
        compExpensesPage.residentialUnitsCells.eq(index).clear().type(value).should("have.value", value);
    }

    enterInsuranceByColumnIndex(value, index = 0) {
        const valueToBe = `$${numberWithCommas(value)}`;
        compExpensesPage.insuranceCells.eq(index).clear().type(value).should("have.value", valueToBe);
    }

    enterElectricityByColumnIndex(value, index = 0) {
        const valueToBe = `$${numberWithCommas(value)}`;
        compExpensesPage.electricityCells.eq(index).clear().type(value).should("have.value", valueToBe);
    }

    enterRepairsMaintenanceByColumnIndex(value, index = 0) {
        const valueToBe = `$${numberWithCommas(value)}`;
        compExpensesPage.repairsCells.eq(index).clear().type(value).should("have.value", valueToBe);
    }

}

export default new ComparableExpensesActions();
