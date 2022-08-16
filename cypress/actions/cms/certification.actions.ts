import BaseActionsExt from "../base/base.actions.ext";
import certificationPage from "../../pages/cms/certification.page";

class CertificationActions extends BaseActionsExt<typeof certificationPage> {
    verifyCertificationBulletsText(sectionName: string, expectedText: string): 
    CertificationActions {
        certificationPage.certificationDiscussionSection(sectionName).invoke('text')
            .should('deep.equal', expectedText);
        return this;
    }

    updateSectionDiscussion(sectionName: string, text: string, clear = false): CertificationActions {
        this.clickSectionForEdit(sectionName)
            .editSectionDiscussionText(sectionName, text, clear);

        this.Page.Header.realClick();

        // Get some time to not overlap comment saving with global save
        cy.wait(1000);
        this.saveCmsSettings();
        return this;
    }

    clickSectionForEdit(sectionName: string): CertificationActions {
        certificationPage.certificationDiscussionSection(sectionName)
            .scrollIntoView().realClick();
        return this;
    }

    editSectionDiscussionText(sectionName: string, text: string, clear = false): CertificationActions {
        if (clear) { 
            this.clickSectionForEdit(sectionName);
            certificationPage.certificationDiscussionSection(sectionName).clear(); 
        }
        certificationPage.certificationDiscussionSection(sectionName)
            .type(text);
        this.verifyCertificationBulletsText(sectionName, text);
        return this;
    }
}

export default new CertificationActions(certificationPage);