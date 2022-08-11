import BaseActionsExt from "../base/base.actions.ext";
import incomeCapitalizationApproachPage from "../../pages/cms/incomeCapitalizationApproach.page";
import { BoweryReports } from '../../types/boweryReports.type';

class IncomeCapitalizationApproachActions extends BaseActionsExt<typeof incomeCapitalizationApproachPage> {
    verifyPageTitle(): IncomeCapitalizationApproachActions {
        incomeCapitalizationApproachPage.pageTitle.should('have.text', 'Income Capitalization Approach');
        return this;
    }

    verifyIncomeCapitalizationText(sectionName: BoweryReports.IncomeCapitalizationApproachSections, 
        expectedText: string): IncomeCapitalizationApproachActions {
        incomeCapitalizationApproachPage.incomeCapitalizationDiscussionSection(sectionName).invoke('text')
            .should('deep.equal', expectedText);
        return this;
    }
}

export default new IncomeCapitalizationApproachActions(incomeCapitalizationApproachPage);