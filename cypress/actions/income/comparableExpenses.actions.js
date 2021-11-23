import BaseActions from "../base/base.actions";
import compExpensesPage from "../../pages/income/comparableExpenses.page";

class ComparableExpensesActions extends BaseActions {
    clickAddBlankColumnButton() {
        compExpensesPage.addBlankColumnButton.click();
    }

}

export default new ComparableExpensesActions();
