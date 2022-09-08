import BasePage from "../base/base.page";

class PropertySummaryPage extends BasePage {
    get headerSection() { return cy.get("*[data-qa='summary']"); }

    get censusTractField() { return cy.get("[name=censusTract]"); }

    censusTractFieldValidationText(text: string) { 
        return cy.xpath(`//*[contains(@name, 'censusTract')]//following::*[contains(text(), '${text}')][1]`); 
    }

    get buildingDescriptor() { return cy.get("[name=buildingDescriptor]"); }

    get editBuildingDescriptionPropertyDataButton() { return cy.get("[data-qa=building-description-section-tile] a"); }

    get numberResidentialUnits() {
        return cy.get("[data-qa=building-description-section-tile]").find("p").contains("Residential Units");
    }

    get numberCommercialUnits() {
        return cy.get("[data-qa=building-description-section-tile]").find("p").contains("Commercial Units");
    }

    get buildingName() { return cy.get("[data-qa^=site-details-section]").find("p").contains("Building Name"); }

    get yearBuilt() { return cy.get("[data-qa^=site-details-section]").find("p").contains("Year Built"); }

    get grossBuildingArea() {
        return cy.get("[data-qa=building-description-section-tile]").find("p").contains("Gross Building Area");
    }

}

export default new PropertySummaryPage();
