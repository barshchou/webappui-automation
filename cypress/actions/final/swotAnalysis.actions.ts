import BaseActions from "../base/base.actions";
import swotAnalysisPage from "../../pages/final/swotAnalysis.page";

class SwotAnalysisActions extends BaseActions {

    /**
     *
     * @returns {SwotAnalysisActions}
     */
    uncheckIncludeInReportCheckbox() {
        swotAnalysisPage.includeInReportCheckbox.uncheck().should("have.value", "false");
        swotAnalysisPage.addThreatsButton.should("be.disabled");
        swotAnalysisPage.addOpportunitiesButton.should("be.disabled");
        swotAnalysisPage.addStrengthsButton.should("be.disabled");
        swotAnalysisPage.addWeaknessesButton.should("be.disabled");
        return this;
    }

}

export default new SwotAnalysisActions();