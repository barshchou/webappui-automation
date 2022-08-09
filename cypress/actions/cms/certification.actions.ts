import BaseActionsExt from "../base/base.actions.ext";
import certificationPage from "../../pages/cms/certification.page";

class CertificationActions extends BaseActionsExt<typeof certificationPage> {
    verifyPageTitle(): CertificationActions {
        certificationPage.pageTitle.should('have.text', 'Certification');
        return this;
    }
}

export default new CertificationActions(certificationPage);