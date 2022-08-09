import BaseActionsExt from "../base/base.actions.ext";
import contentManagementSystemPage from "../../pages/cms/contentManagementSystemPage";

class ContentManagementSystemActions extends BaseActionsExt<typeof contentManagementSystemPage> {
    verifyPageIsOpened(): ContentManagementSystemActions {
        contentManagementSystemPage.Header.should('contain.text', 'Content Management System');
        return this;
    }
}

export default new ContentManagementSystemActions(contentManagementSystemPage);
