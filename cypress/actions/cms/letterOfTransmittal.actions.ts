import BaseActionsExt from "../base/base.actions.ext";
import letterOfTransmittalPage from "../../pages/cms/letterOfTransmittal.page";

class LetterOfTransmittalActions extends BaseActionsExt<typeof letterOfTransmittalPage> {
    verifyPageTitle(): LetterOfTransmittalActions {
        letterOfTransmittalPage.pageTitle.should('have.text', 'Letter of Transmittal');
        return this;
    }

    updateComplianceParagraphDiscussion(text: string, clear = false): LetterOfTransmittalActions {
        this.clickComplianceParagraphForEdit()
            .editComplianceParagraphDiscussionText(text, clear);

        // Get some time to not overlap comment saving with global save
        cy.wait(1000);
        this.saveOrganizationSettings();
        return this;
    }

    verifyModifiedLabel(): LetterOfTransmittalActions {
        letterOfTransmittalPage.complianceParagraphModifiedLabel.should('be.visible');
        return this;
    }

    clickComplianceParagraphForEdit(): LetterOfTransmittalActions {
        letterOfTransmittalPage.complianceParagraphDiscussion.realClick();
        return this;
    }

    editComplianceParagraphDiscussionText(text: string, clear = false): LetterOfTransmittalActions {
        if (clear) { letterOfTransmittalPage.complianceParagraphDiscussion.clear(); }
        letterOfTransmittalPage.complianceParagraphDiscussion
            .type(text)
            .should('contain.text', text);
        return this;
    }

    saveOrganizationSettings(): LetterOfTransmittalActions {
        letterOfTransmittalPage.saveButtonGlobal.click();
        letterOfTransmittalPage.successModal.should('be.visible');
        letterOfTransmittalPage.successModal.should('not.be.visible');
        return this;
    }
}

export default new LetterOfTransmittalActions(letterOfTransmittalPage);
