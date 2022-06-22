import BasePage from "../../../../base/base.page";
import { BoweryReports } from "../../../../../types/boweryReports.type";

class PropertyConditionsPage extends BasePage {
    get navigationTab() {return cy.get("[path=property-conditions] a");}

    getRadioByValue(radio: BoweryReports.PropertyConditionsRadios, value: BoweryReports.PropertyConditions) {
        return cy.get(`[name$=${radio}Condition][value='${value}']`);
    }

}

export default new PropertyConditionsPage();