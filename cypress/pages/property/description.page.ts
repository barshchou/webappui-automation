import BasePage from "../base/base.page";

class DescriptionPage extends BasePage {

    getCheckboxByLabel(label: string) { return cy.get(`*[label='${label}'] input`); }

    get stairsConditionContainer() { return cy.get("[data-qa='lobbyStairwellsCondition-radio-group']"); }

    get interiorHallwaysConditionContainer() { return cy.get("[data-qa=interiorHallwaysCondition-radio-group]"); }

    getElementToCheckRadio(value: string) { return cy.get(`[data-qa=checked] input[value='${value}']`); }

    get stairsConditionRadios() { return cy.get("*[name='lobbyStairwellsCondition']"); }

    get foundationRadios() { return cy.get("*[name=foundation]"); }

    get structuralSystem() { return cy.get("*[name=structuralSystem]"); }

    get framingRadios() { return cy.get("*[name=framing]"); }

    get roofTypeRadios() { return cy.get("*[name=roofType]"); }

    get sprinklersRadios() { return cy.get("*[name=sprinklers]"); }

    get containsBasementCheckbox() { return cy.get("*[data-qa='subjectContainsBasement'] input"); }

    get basementStateRadios() { return cy.get("*[name='basement.state']"); }

    get totalEconomicLifeField() { return cy.get("*[name=totalEconomicLife]"); }

    get effectiveAge() { return cy.get("*[name=effectiveAge]"); }
}

export default new DescriptionPage();