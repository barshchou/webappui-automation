import BasePage from "../base/base.page";

class UtilitiesPage extends BasePage {
    get utilitiesPageTitle() { return cy.get("[data-qa=utilitiesDescription]"); }

    get heatingSystemCheckbox() { return cy.get("*[data-qa*='heatingSystems.inspected'] input"); }

    getHeatingSystemTypeDropdownBySystemNumber(number: number) {
        return cy.get(`*[data-qa='heatingSystems.systems.${number}.type-select-list'] [data-qa='select-value']`);
    }

    getDropdownOptionByValue(value: string) { return cy.get(`li[role=option][data-value='${value}']`); }

    getHeatingSystemLocationDropdownBySystemNumber(number: number) {
        return cy.get(`*[data-qa='heatingSystems.systems.${number}.location-select-list'] [data-qa='select-value']`);
    }

    get coolingSystemCheckbox() { return cy.get("*[data-qa*='coolingSystems.inspected'] input"); }

    getCoolingSystemTypeDropdownBySystemNumber(number: number) {
        return cy.get(`*[data-qa='coolingSystems.systems.${number}.type-select-list'] [data-qa='select-value']`);
    }

    getCoolingSystemLocationDropdownBySystemNumber(number: number) {
        return cy.get(`*[data-qa='coolingSystems.systems.${number}.location-select-list'] [data-qa='select-value']`);
    }

    get heatingCoolingCommentary() { 
        return cy.get("*[data-qa='heatingAndCoolingSystemsDiscussion.commentary-generated-text']"); 
    }

    get gasMetersCheckbox() { return cy.get("*[data-qa*='gasMeters.inspected'] input"); }

    get gasMetersTypeDropdown() { return cy.get("*[data-qa='gasMeters.type-select-list'] [data-qa='select-value']"); }

    get gasMetersLocationDropdown() { 
        return cy.get("*[data-qa='gasMeters.location-select-list'] [data-qa='select-value']"); 
    }

    get gasMetersCommentary() { return cy.get("*[data-qa='gasMetersDiscussion.commentary-generated-text']"); }

    get electricMetersCheckbox() { return cy.get("*[data-qa*='electricMeters.inspected'] input"); }

    get electricMetersTypeDrop() { 
        return cy.get("*[data-qa='electricMeters.type-select-list'] [data-qa='select-value']"); 
    }

    get electricMetersLocationDrop() { 
        return cy.get("*[data-qa='electricMeters.location-select-list'] [data-qa='select-value']"); 
    }

    get electricMetersCommentary() { return cy.get("*[data-qa='electricMetersDiscussion.commentary-generated-text']"); }

    get hotWaterSystemsCheckbox() { return cy.get("*[data-qa='hotWaterSystems.inspected'] input"); }

    getHotWaterSystemTypeDropBySystemNumber(number: number) {
        return cy.get(`*[data-qa='hotWaterSystems.systems.${number}.type-select-list'] [data-qa='select-value']`);
    }

    getHotWaterSystemLocationDropBySystemNumber(number: number) {
        return cy.get(`*[data-qa='hotWaterSystems.systems.${number}.location-select-list'] [data-qa='select-value']`);
    }

    get hotWaterSystemCommentary() { 
        return cy.get("*[data-qa='hotWaterSystemsDiscussion.commentary-generated-text']"); 
    }
}

export default new UtilitiesPage();