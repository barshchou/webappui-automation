import BasePage from "../../../../base/base.page";
import { BoweryReports } from "../../../../../types";

class PropertyConditionsPage extends BasePage {
    get navigationTab() {return cy.get("[path=property-conditions] a");}

    getGeneralPropertyRadioByValue(value: BoweryReports.PropertyConditions) {
        return cy.get(`[name$=generalPropertyCondition][value='${value}']`);
    }

    getGeneralBathroomRadioByValue(value: BoweryReports.PropertyConditions) {
        return cy.get(`[name$=generalBathroomCondition][value='${value}']`);
    }

    getGeneralKitchenRadioByValue(value: BoweryReports.PropertyConditions) {
        return cy.get(`[name$=generalKitchenCondition][value='${value}']`);
    }

    getGeneralBedroomRadioByValue(value: BoweryReports.PropertyConditions) {
        return cy.get(`[name$=generalLivingAndBedroomCondition][value='${value}']`);
    }

}

export default new PropertyConditionsPage();