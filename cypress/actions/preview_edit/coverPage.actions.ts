import coverPage from "../../pages/preview_edit/coverPage.page";
import BaseActionsExt from "../base/base.actions.ext";

class CoverPageActions extends BaseActionsExt<typeof coverPage> {

    verifyRequestedRow(name: string, value: string, index = 0) {
        coverPage.getRequestedRow(name, index).should("include.text", value);
        return this;
    }
}

export default new CoverPageActions(coverPage);