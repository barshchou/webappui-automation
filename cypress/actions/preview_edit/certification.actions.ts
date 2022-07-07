import certificationPage from "../../pages/preview_edit/certification.page";
import BaseActionsExt from "../base/base.actions.ext";

class Certification extends BaseActionsExt<typeof certificationPage> {

    verifyTextInFormContainer(value: string, index = 1) {
        certificationPage.certificateBulletsPoint(index).should("include.text", value);
        return this;
    }
}

export default new Certification(certificationPage);