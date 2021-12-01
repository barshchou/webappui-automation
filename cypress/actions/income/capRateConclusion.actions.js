import BaseActions from "../base/base.actions";
import capRateConclusionPage from "../../pages/income/capRateConclusion.page";

class CapRateConclusionActions extends BaseActions {

    verifyBandOfInvestments(textToBe) {
        capRateConclusionPage.bandOfInvestmentsCell.should("have.text", textToBe);
    }

    verifyPWCCell(textToBe) {
        capRateConclusionPage.pwcCell.should("have.text", textToBe);
    }

    verifySitusCell(textToBe) {
        capRateConclusionPage.situsCell.should("have.text", textToBe);
    }

    navigateToCapRateComps() {
        capRateConclusionPage.changeButton.click();
    }
}

export default new CapRateConclusionActions();