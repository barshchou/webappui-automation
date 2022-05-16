import coverPage from "../../pages/preview_edit/coverPage.page";
import BaseActionsExt from "../base/base.actions.ext";

class CoverPageActions extends BaseActionsExt<typeof coverPage> {

    verifyApplicationNumber(value: string) {
        coverPage.applicationNumberText.should("include.text", value);
        return this;
    }
}

export default new CoverPageActions(coverPage);