import replacementCostPage from "../../pages/final/insurableReplacementCost.page";
import BaseActionsExt from "../base/base.actions.ext";

class InsurableReplacementCostActions extends BaseActionsExt<typeof replacementCostPage> {

    verifySubjectState(state: string): InsurableReplacementCostActions {
        replacementCostPage.subjectStateDropdown.should("have.text", state);
        return this;
    }

    verifySubjectLocale(locale: string): InsurableReplacementCostActions {
        replacementCostPage.subjectLocaleDropdown.should("have.text", locale);
        return this;
    }

    verifyLocalMultiplier(multiplier = "1.00"): InsurableReplacementCostActions {
        replacementCostPage.localMultiplier.should("have.value", `${multiplier}`);
        return this;
    }

}

export default new InsurableReplacementCostActions(replacementCostPage);