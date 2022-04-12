import introductionPage from "../../pages/preview_edit/introduction.page";
import BaseActionsExt from "../base/base.actions.ext";

class IntroductionActions extends BaseActionsExt<typeof introductionPage> {
    constructor(){
        super(introductionPage);
    }
}
export default new IntroductionActions();