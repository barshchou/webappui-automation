import BaseActionsExt from "../base/base.actions.ext";
import incomeCapitalizationApproachPage from "../../pages/cms/incomeCapitalizationApproach.page";
import { ContentManagementSystem } from '../../types/boweryReports.type';

class IncomeCapitalizationApproachActions extends BaseActionsExt<typeof incomeCapitalizationApproachPage> {
    verifyPageTitle(): IncomeCapitalizationApproachActions {
        incomeCapitalizationApproachPage.pageTitle.should('have.text', 'Income Capitalization Approach');
        return this;
    }

    verifyIncomeCapitalizationText(sectionName: 
        ContentManagementSystem.IncomeCapitalizationApproachSections, expectedText: string): 
        IncomeCapitalizationApproachActions {
        incomeCapitalizationApproachPage.incomeCapitalizationDiscussionSection(sectionName).invoke('text')
            .should('deep.equal', expectedText);
        return this;
    }

    updateSectionDiscussion(sectionName: ContentManagementSystem.IncomeCapitalizationApproachSections, 
        text: string, clear = false): IncomeCapitalizationApproachActions {
        this.clickSectionForEdit(sectionName)
            .editSectionDiscussionText(sectionName, text, clear);

        // Get some time to not overlap comment saving with global save
        cy.wait(1000);
        this.saveCmsSettings();
        return this;
    }

    editSectionDiscussionText(sectionName: ContentManagementSystem.IncomeCapitalizationApproachSections, 
        text: string, clear = false): IncomeCapitalizationApproachActions {
        if (clear) { 
            this.clickSectionForEdit(sectionName);
            incomeCapitalizationApproachPage.incomeCapitalizationDiscussionSection(sectionName).clear(); 
        }
        incomeCapitalizationApproachPage.incomeCapitalizationDiscussionSection(sectionName)
            .type(text)
            .should('contain.text', text);
        return this;
    }

    clickSectionForEdit(sectionName: ContentManagementSystem.IncomeCapitalizationApproachSections): 
    IncomeCapitalizationApproachActions {
        incomeCapitalizationApproachPage.incomeCapitalizationDiscussionSection(sectionName)
            .scrollIntoView().realClick();
        return this;
    }

    verifyModifiedLabel(sectionName: ContentManagementSystem.IncomeCapitalizationApproachSections): 
    IncomeCapitalizationApproachActions {
        incomeCapitalizationApproachPage.incomeCapitalizationModifiedLabel(sectionName).should('be.visible');
        return this;
    }

    revertSectionToOriginal(sectionName: ContentManagementSystem.IncomeCapitalizationApproachSections): 
    IncomeCapitalizationApproachActions {
        this.clickSectionForEdit(sectionName);
        incomeCapitalizationApproachPage.incomeCapitalizationDiscussionSection(sectionName).type(`{ESC}`);
        incomeCapitalizationApproachPage.incomeCapitalizationDiscussionSection(sectionName).focus();
        this.Page.formRevertToOriginalBtn().realClick();
        this.Page.formYesRevertBtn.realClick();
        this.saveCmsSettings();
        return this;
    }
}

export default new IncomeCapitalizationApproachActions(incomeCapitalizationApproachPage);