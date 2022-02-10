import BaseActions from "../../base/base.actions";
import laundryPage from "../../../pages/income/miscellaneous/laundry.page";
import {numberWithCommas} from "../../../../utils/numbers.utils";

class LaundryActions extends BaseActions{

    verifyNoLaundryButtonExists() {
        laundryPage.noLaundryButton.should("exist");
        return this;
    }

    /**
     * @param {string | number} income
     * @returns {LaundryActions}
     */
    enterLaundryIncome(income) {
        const valueToBe = typeof income === "string" ? income : numberWithCommas(income);
        laundryPage.laundryIncomeInput.clear().type(income).should("have.value", valueToBe);
        return this;
    }

    checkLaundryVCLossRadio(value) {
        laundryPage.laundryVCLossRadio.check(value).should("be.checked");
        return this;
    }

    /**
     * @param {number} percentage
     * @returns {LaundryActions}
     */
    enterLaundryVCLossPercentage(percentage) {
        laundryPage.laundryVCLossPercentage.clear().type(percentage).should("have.value", percentage);
        if (percentage > 100) {
            cy.contains("Max value is 100").should("exist");
        }
        return this;
    }
}

export default new LaundryActions();
