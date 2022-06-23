import assumptionsConditionsPage from "../../pages/final/assumptionsConditions.page";
import BaseActionsExt from "../base/base.actions.ext";

class AssumptionsConditionsActions extends BaseActionsExt<typeof assumptionsConditionsPage> {

    addExtraordinaryAssumption(assumptionText: string): AssumptionsConditionsActions {
        const defaultNumberOfAssumptions = 3;
        assumptionsConditionsPage.addExtraordinaryAssumptionsButton.click();
        assumptionsConditionsPage.extraordinaryAssumptionsInputs.should("have.length.above", defaultNumberOfAssumptions);
        assumptionsConditionsPage.extraordinaryAssumptionsInputs.last()
            .should("have.attr", "placeholder", "Write an extraordinary assumption.")
            .type(assumptionText).should("have.text", assumptionText);
        return this;
    }

}

export default new AssumptionsConditionsActions(assumptionsConditionsPage);