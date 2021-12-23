import BaseActions from "../base/base.actions";
import replacementCostPage from "../../pages/final/insurableReplacementCost.page";

class InsurableReplacementCostActions extends BaseActions {

    /**
     *
     * @param {string} state
     * @returns {InsurableReplacementCostActions}
     */
    verifySubjectState(state) {
        replacementCostPage.subjectStateDropdown.should("have.text", state);
        return this;
    }

    /**
     *
     * @param {string} locale
     * @returns {InsurableReplacementCostActions}
     */
    verifySubjectLocale(locale) {
        replacementCostPage.subjectLocaleDropdown.should("have.text", locale);
        return this;
    }

    /**
     *
     * @param {string} multiplier
     * @returns {InsurableReplacementCostActions}
     */
    verifyLocalMultiplier(multiplier = "1.00") {
        replacementCostPage.localMultiplier.should("have.value", `${multiplier}`);
        return this;
    }

}

export default new InsurableReplacementCostActions();