import BaseActionsExt from "../../../../base/base.actions.ext";
import propertyConditionsPage
    from "../../../../../pages/income/residential/rent_comps/full_building_comps/propertyConditions.page";
import { BoweryReports } from "../../../../../types/boweryReports.type";

class PropertyConditionsActions extends BaseActionsExt<typeof propertyConditionsPage> {

    openNavigationTab(): PropertyConditionsActions {
        propertyConditionsPage.navigationTab.click();
        return this;
    }

    checkRadio(radio: BoweryReports.PropertyConditionsRadios, 
        value: BoweryReports.PropertyConditions): PropertyConditionsActions {
        propertyConditionsPage.getRadioByValue(radio, value).click().parents("[data-qa=checked]").should("exist");
        return this;
    }

}

export default new PropertyConditionsActions(propertyConditionsPage);