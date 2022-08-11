import introductionPage from "../../pages/preview_edit/introduction.page";
import BaseActionsExt from "../base/base.actions.ext";

class IntroductionActions extends BaseActionsExt<typeof introductionPage> {
    verifyDefinitionOfMarketValueListItem(index: number, item: string): IntroductionActions {
        introductionPage.getDefinitionOfMarketValueListItem(index)
            .should("have.text", item)
            .should("have.prop", "isContentEditable", false);
        return this;
    }
}
export default new IntroductionActions(introductionPage);