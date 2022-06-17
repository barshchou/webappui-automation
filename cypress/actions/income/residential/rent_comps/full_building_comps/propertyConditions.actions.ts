import BaseActionsExt from "../../../../base/base.actions.ext";
import propertyConditionsPage
    from "../../../../../pages/income/residential/rent_comps/full_building_comps/propertyConditions.page";
import { BoweryReports } from "../../../../../types";

class PropertyConditionsActions extends BaseActionsExt<typeof propertyConditionsPage>{

    openNavigationTab(): PropertyConditionsActions {
        propertyConditionsPage.navigationTab.click();
        return this;
    }

    checkGeneralConditionRadio(value: BoweryReports.PropertyConditions): PropertyConditionsActions {
        propertyConditionsPage.getGeneralPropertyRadioByValue(value).click().parents("[data-qa=checked]")
            .should("exist");
        return this;
    }

    checkGeneralBathroomConditionRadio(value: BoweryReports.PropertyConditions): PropertyConditionsActions {
        propertyConditionsPage.getGeneralBathroomRadioByValue(value).click().parents("[data-qa=checked]")
            .should("exist");
        return this;
    }

    checkGeneralKitchenConditionRadio(value: BoweryReports.PropertyConditions): PropertyConditionsActions {
        propertyConditionsPage.getGeneralKitchenRadioByValue(value).click().parents("[data-qa=checked]")
            .should("exist");
        return this;
    }

    checkGeneralBedroomConditionRadio(value: BoweryReports.PropertyConditions): PropertyConditionsActions {
        propertyConditionsPage.getGeneralBedroomRadioByValue(value).click().parents("[data-qa=checked]")
            .should("exist");
        return this;
    }


}

export default new PropertyConditionsActions(propertyConditionsPage);