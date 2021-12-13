import BaseActions from "../base/base.actions";
import replacementCostPage from "../../pages/final/insurableReplacementCost.page";

class InsurableReplacementCostActions extends BaseActions {

    /**
     *
     * @param {string} state
     */
    verifySubjectState(state) {
        replacementCostPage.subjectStateDropdown.should("have.text", state);
        return this;
    }

    /**
     *
     * @param {string} locale
     */
    verifySubjectLocale(locale) {
        replacementCostPage.subjectLocaleDropdown.should("have.text", locale);
        return this;
    }

    verifyLocalMultiplier(multiplier = "1.00") {
        replacementCostPage.localMultiplier.should("have.value", `${multiplier}`);
        return this;
    }

}

export default new InsurableReplacementCostActions();