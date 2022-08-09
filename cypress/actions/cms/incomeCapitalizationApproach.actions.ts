import BaseActionsExt from "../base/base.actions.ext";
import incomeCapitalizationApproachPage from "../../pages/cms/incomeCapitalizationApproach.page";

class IncomeCapitalizationApproachActions extends BaseActionsExt<typeof incomeCapitalizationApproachPage> {
    verifyPageTitle(): IncomeCapitalizationApproachActions {
        incomeCapitalizationApproachPage.pageTitle.should('have.text', 'Income Capitalization Approach');
        return this;
    }
}

export default new IncomeCapitalizationApproachActions(incomeCapitalizationApproachPage);