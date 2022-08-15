import BaseActionsExt from "../base/base.actions.ext";
import certificationPage from "../../pages/cms/certification.page";
import { ContentManagementSystem } from '../../types/boweryReports.type';

class CertificationActions extends BaseActionsExt<typeof certificationPage> {
    verifyPageTitle(): CertificationActions {
        certificationPage.pageTitle.should('have.text', 'Certification');
        return this;
    }

    verifyCertificationBulletsText(sectionName: ContentManagementSystem.CertificationSections, expectedText: string): 
    CertificationActions {
        certificationPage.certificationDiscussionSection(sectionName).invoke('text')
            .should('deep.equal', expectedText);
        return this;
    }

    updateSectionDiscussion(sectionName: ContentManagementSystem.CertificationSections, 
        text: string, clear = false): CertificationActions {
        this.clickSectionForEdit(sectionName)
            .editSectionDiscussionText(sectionName, text, clear);

        this.Page.Header.realClick();

        // Get some time to not overlap comment saving with global save
        cy.wait(1000);
        this.saveCmsSettings();
        return this;
    }

    clickSectionForEdit(sectionName: ContentManagementSystem.CertificationSections): 
    CertificationActions {
        certificationPage.certificationDiscussionSection(sectionName)
            .scrollIntoView().realClick();
        return this;
    }

    editSectionDiscussionText(sectionName: ContentManagementSystem.CertificationSections, 
        text: string, clear = false): CertificationActions {
        if (clear) { 
            this.clickSectionForEdit(sectionName);
            certificationPage.certificationDiscussionSection(sectionName).clear(); 
        }
        certificationPage.certificationDiscussionSection(sectionName)
            .type(text);
        this.verifyCertificationBulletsText(sectionName, text);
        return this;
    }

    revertSectionToOriginal(sectionName: ContentManagementSystem.CertificationSections): 
    CertificationActions {
        this.clickSectionForEdit(sectionName);
        certificationPage.certificationDiscussionSection(sectionName).type(`{ESC}`);
        certificationPage.certificationDiscussionSection(sectionName).focus();
        this.Page.formRevertToOriginalBtn().click();
        this.Page.formYesRevertBtn.click();
        this.saveCmsSettings();
        return this;
    }
}

export default new CertificationActions(certificationPage);