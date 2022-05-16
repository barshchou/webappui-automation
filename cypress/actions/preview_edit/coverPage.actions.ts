import coverPage from "../../pages/preview_edit/coverPage.page";
import BaseActionsExt from "../base/base.actions.ext";

class CoverPageActions extends BaseActionsExt<typeof coverPage> {
<<<<<<< HEAD

    verifyApplicationNumber(value: string) {
        coverPage.applicationNumberText.should("include.text", value);
        return this;
    }
}

=======
    
}
>>>>>>> ff6480f0b330751af8403fda22cc6456d7cefa99
export default new CoverPageActions(coverPage);