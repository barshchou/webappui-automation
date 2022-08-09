import BaseActionsExt from "../base/base.actions.ext";
import swotAnalysisPage from "../../pages/cms/swotAnalysis.page";

class SWOTAnalysisActions extends BaseActionsExt<typeof swotAnalysisPage> {
    verifyPageTitle(): SWOTAnalysisActions {
        swotAnalysisPage.pageTitle.should('have.text', 'SWOT Analysis');
        return this;
    }
}

export default new SWOTAnalysisActions(swotAnalysisPage);