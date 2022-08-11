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
}

export default new CertificationActions(certificationPage);