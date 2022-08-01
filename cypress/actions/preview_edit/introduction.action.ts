import introductionPage from "../../pages/preview_edit/introduction.page";
import { _NavigationSection } from "../base";
import BaseActionsExt from "../base/base.actions.ext";

class IntroductionActions extends BaseActionsExt<typeof introductionPage> {
    constructor() {
        super(introductionPage);
    }

    goToBackLink(whereTo: string, pageName: string): IntroductionActions {
        introductionPage.getBackLink(whereTo).click();
        _NavigationSection.submitSaveChangesModal();
        this.verifyProgressBarNotExist()
            .verifyOpenedPage(pageName);
        return this;
    }
}
export default new IntroductionActions();