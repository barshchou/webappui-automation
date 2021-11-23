import BaseActions from "../base/base.actions";
import compExpensesPage from "../../pages/income/comparableExpenses.page";

class ComparableExpensesActions extends BaseActions {
    clickAddBlankColumnButton() {
        compExpensesPage.addBlankColumnButton.click();
    }

    enterAddressByColumnIndex(address, index = 0) {
        compExpensesPage.compAddressCells.eq(index).type(address).should("have.value", address);
    }

    enterLocationByColumnIndex(location, index = 0) {
        compExpensesPage.compLocationCells.eq(index).type(location).should("have.value", location);
    }

    chooseExpensePeriodByColumnIndex(periodValue, index = 0) {
        compExpensesPage.expensePeriodDropdowns.eq(index).click();
        compExpensesPage.getDropdownOptionByValue(periodValue).click();
    }

    enterExpenseYearByColumnIndex(year, index = 0) {
        compExpensesPage.expenseYearCells.eq(index).type(year).should("have.value", year);
    }

}

export default new ComparableExpensesActions();
