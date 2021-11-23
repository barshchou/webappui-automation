import BaseActions from "../base/base.actions";
import compExpensesPage from "../../pages/income/comparableExpenses.page";

class ComparableExpensesActions extends BaseActions {
    clickAddBlankColumnButton() {
        compExpensesPage.addBlankColumnButton.click();
    }

    enterAddressByColumnIndex(address, index = 0) {
        compExpensesPage.compAddressCells.eq(index).type(address).should("have.value", address);
    }

}

export default new ComparableExpensesActions();
