import swotAnalysisPage from "../../pages/final/swotAnalysis.page";
import BaseActionsExt from "../base/base.actions.ext";

class SwotAnalysisActions extends BaseActionsExt<typeof swotAnalysisPage> {
    
    uncheckIncludeInReportCheckbox(): SwotAnalysisActions {
        swotAnalysisPage.includeInReportCheckbox.uncheck().should("have.value", "false");
        swotAnalysisPage.addThreatsButton.should("be.disabled");
        swotAnalysisPage.addOpportunitiesButton.should("be.disabled");
        swotAnalysisPage.addStrengthsButton.should("be.disabled");
        swotAnalysisPage.addWeaknessesButton.should("be.disabled");
        return this;
    }

}

export default new SwotAnalysisActions(swotAnalysisPage);