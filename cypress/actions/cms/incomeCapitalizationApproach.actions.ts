import BaseActionsExt from "../base/base.actions.ext";
import incomeCapitalizationApproachPage from "../../pages/cms/incomeCapitalizationApproach.page";

class IncomeCapitalizationApproachActions extends BaseActionsExt<typeof incomeCapitalizationApproachPage> {

    verifyIncomeCapitalizationText(sectionName: string, expectedText: string): 
        IncomeCapitalizationApproachActions {
        incomeCapitalizationApproachPage.incomeCapitalizationDiscussionSection(sectionName).invoke('text')
            .should('deep.equal', expectedText);
        return this;
    }

    updateSectionDiscussion(sectionName: string, text: string, clear = false): IncomeCapitalizationApproachActions {
        this.clickSectionForEdit(sectionName)
            .editSectionDiscussionText(sectionName, text, clear);

        // Get some time to not overlap comment saving with global save
        cy.wait(1000);
        this.saveCmsSettings();
        return this;
    }

    editSectionDiscussionText(sectionName: string, text: string, clear = false): IncomeCapitalizationApproachActions {
        if (clear) { 
            this.clickSectionForEdit(sectionName);
            incomeCapitalizationApproachPage.incomeCapitalizationDiscussionSection(sectionName).clear(); 
        }
        incomeCapitalizationApproachPage.incomeCapitalizationDiscussionSection(sectionName)
            .type(text)
            .should('contain.text', text);
        return this;
    }

    clickSectionForEdit(sectionName: string): IncomeCapitalizationApproachActions {
        incomeCapitalizationApproachPage.incomeCapitalizationDiscussionSection(sectionName)
            .scrollIntoView().realClick();
        return this;
    }

    verifyModifiedLabel(sectionName: string): IncomeCapitalizationApproachActions {
        incomeCapitalizationApproachPage.incomeCapitalizationModifiedLabel(sectionName).should('be.visible');
        return this;
    }
}

export default new IncomeCapitalizationApproachActions(incomeCapitalizationApproachPage);