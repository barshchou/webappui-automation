import BasePage from "../base/base.page";

class DescriptionPage extends BasePage{
    get selectGeneralConditionButton() {return cy.get("*[data-qa*='generalCondition'] [data-qa='select-value']");}
    getDropdownOptionByValue(value) {return cy.get(`li[role=option][data-value='${value}']`);}
    get selectAsStabilizedConditionButton() {return cy.get("*[data-qa*=generalAsStabilizedCondition] [data-qa='select-value']");}
    getCheckboxByLabel(label) {return cy.get(`*[label='${label}'] input`);}
    get stairsConditionContainer() {return cy.get("*[data-qa='lobbyAndStairwellsCondition-radio-group']");}
    get stairsConditionRadios() {return cy.get("*[name='lobbyAndStairwellsCondition']");}
    get foundationRadios() {return cy.get("*[name=foundation]");}
    get structuralSystem() {return cy.get("*[name=structuralSystem]");}
    get framingRadios() {return cy.get("*[name=framing]");}
    get roofTypeRadios() {return cy.get("*[name=roofType]");}
    get sprinklersRadios() {return cy.get("*[name=sprinklers]");}
    get containsBasementCheckbox() {return cy.get("*[data-qa='subjectContainsBasement'] input");}
    get basementStateRadios() {return cy.get("*[name='basement.state']");}
    get totalEconomicLifeField() {return cy.get("*[name=totalEconomicLife]");}
    get effectiveAge() {return cy.get("*[name=effectiveAge]");}
}

export default new DescriptionPage();