import BaseActions from "../../base/base.actions";
import laundryPage from "../../../pages/income/miscellaneous/laundry.page";
import { numberWithCommas } from "../../../../utils/numbers.utils";

class LaundryActions extends BaseActions{


    verifyThatPageIsOpened(): this {
        laundryPage.laundryheaderSection.should("be.visible");
        cy.url().then(url => {
            let urlObj = new URL(url);
            cy.log("Check whether current URL ends with '/laundry-income'");
            cy.wrap(urlObj.pathname.endsWith("/laundry-income")).should("be.true");
        });
        return this;
    }

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
