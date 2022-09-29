import BaseActionsExt from "../base/base.actions.ext";
import contentManagementSystemPage from "../../pages/cms/contentManagementSystem.page";

class ContentManagementSystemActions extends BaseActionsExt<typeof contentManagementSystemPage> {
    verifyCmsSubHeaderDisplayed(): ContentManagementSystemActions {
        contentManagementSystemPage.cmsGlobalHeader.should('exist');
        return this;
    }

    verifyGlobalIconDisplayed(): ContentManagementSystemActions {
        contentManagementSystemPage.cmsGlobalIcon.should('exist');
        return this;
    }

    openLetterOfTransmittalPage(): ContentManagementSystemActions {
        contentManagementSystemPage.letterOfTransmittalNav.click();
        return this;
    }

    openSWOTAnalysisPage(): ContentManagementSystemActions {
        contentManagementSystemPage.SWOTAnalysisNav.click();
        return this;
    }

    openIncomeCapitalizationApproachPage(): ContentManagementSystemActions {
        contentManagementSystemPage.incomeCapitalizationApproachNav.click();
        return this;
    }

    openCertificationPage(): ContentManagementSystemActions {
        contentManagementSystemPage.certificationNav.click();
        return this;
    }

    verifyDiscussionText(sectionName: string, expectedText: string): ContentManagementSystemActions {
        this.Page.formCommentTextBox(sectionName).invoke('text')
            .should('deep.equal', expectedText);
        return this;
    }

    updateSectionDiscussion(sectionName: string, text: string, clear = false): ContentManagementSystemActions {
        this.editSectionDiscussionText(sectionName, text, clear);
        // Get some time to not overlap comment saving with global save
        cy.wait(1000);
        this.saveCmsSettings();
        return this;
    }

    editSectionDiscussionText(sectionName: string, text: string, clear = false): ContentManagementSystemActions {
        this.clickSectionForEdit(sectionName);
        if (clear) { this.Page.formCommentTextBox(sectionName).clear(); } 
        this.Page.formCommentTextBox(sectionName)
            .realType(text);
        this.verifyDiscussionText(sectionName, text);
        return this;
    }

    clickSectionForEdit(sectionName: string): ContentManagementSystemActions {
        this.Page.formCommentTextBox(sectionName).scrollIntoView()
            .realClick();
        return this;
    }

    verifyModifiedLabel(sectionName: string): ContentManagementSystemActions {
        this.Page.discussionModifiedLabel(sectionName).should('be.visible');
        return this;
    }
}

export default new ContentManagementSystemActions(contentManagementSystemPage);
