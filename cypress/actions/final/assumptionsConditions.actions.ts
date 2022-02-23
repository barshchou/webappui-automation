import BaseActions from "../base/base.actions";
import assumptionsConditionsPage from "../../pages/final/assumptionsConditions.page";

class AssumptionsConditionsActions extends BaseActions {

    addExtraordinaryAssumption(assumptionText) {
        const defaultNumberOfAssumptions = 3;
        assumptionsConditionsPage.addExtraordinaryAssumptionsButton.click();
        assumptionsConditionsPage.extraordinaryAssumptionsInputs.should("have.length.above", defaultNumberOfAssumptions);
        assumptionsConditionsPage.extraordinaryAssumptionsInputs.last()
            .should("have.attr", "placeholder", "Write an extraordinary assumption.")
            .type(assumptionText).should("have.text", assumptionText);
        return this;
    }

}

export default new AssumptionsConditionsActions();