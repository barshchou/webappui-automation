import BaseActionsExt from "../base/base.actions.ext";
import contentManagementSystemPage from "../../pages/cms/contentManagementSystemPage";

class ContentManagementSystemActions extends BaseActionsExt<typeof contentManagementSystemPage> {
    verifyPageIsOpened(): ContentManagementSystemActions {
        contentManagementSystemPage.Header.should('contain.text', 'Content Management System');
        return this;
    }

    verifyCmsSubHeaderDisplayed(): ContentManagementSystemActions {
        contentManagementSystemPage.cmsGlobalHeader.should('exist');
        return this;
    }

    verifyGlobalIconDisplayed(): ContentManagementSystemActions {
        contentManagementSystemPage.cmsGlobalIcon.should('exist');
        return this;
    }
}

export default new ContentManagementSystemActions(contentManagementSystemPage);
