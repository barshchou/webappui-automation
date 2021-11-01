import BasePage from "../base/base.page";

class UtilitiesPage extends BasePage{
    get heatingSystemCheckbox() {return cy.get("*[data-qa*='heatingSystems.inspected'] input");}

    getHeatingSystemTypeDropdownBySystemNumber(number) {
        return cy.get(`*[data-qa='heatingSystems.systems.${number}.type-select-list'] [data-qa='select-value']`);
    }

    getDropdownOptionByValue(value) {return cy.get(`li[role=option][data-value='${value}']`);}

    getHeatingSystemLocationDropdownBySystemNumber(number) {
        return cy.get(`*[data-qa='heatingSystems.systems.${number}.location-select-list'] [data-qa='select-value']`);
    }

    get coolingSystemCheckbox() {return cy.get("*[data-qa*='coolingSystems.inspected'] input");}
}

export default new UtilitiesPage();