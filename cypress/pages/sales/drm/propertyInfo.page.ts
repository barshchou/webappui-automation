export default class PropertyInformationForm {
    get conditionDropdown() {return cy.get('[data-qa="Condition"]', { includeShadowDom: true });}

    getDropdownOption(title: string) {return cy.get(`.ant-select-item-option[title='${title}']`, { includeShadowDom: true });}

    get errorMessageNewComp() {return cy.get('[data-qa="error-text"]', { includeShadowDom: true });}

    get newCompContinueButton() {return cy.get('[data-qa="Continue"]', { includeShadowDom: true });}

    get comparableTypeDropdown() {return cy.get('[data-qa="Comparable Type"]', { includeShadowDom: true });}

    get createCompNumberCommercialUnits() {return cy.get('[data-qa="# Commercial Units"]', { includeShadowDom:true }).as("createCompNumberCommercialUnits");}

    get createCompNumberResidentialUnits() {return cy.get('[data-qa="# Residential Units"]', { includeShadowDom: true });}

    get commercialAreaNewComp() {return cy.get('[data-qa="Commercial Area"]', { includeShadowDom:true });}

    get netRentableAreaNewComp() {return cy.get('[data-qa="Net Rentable Area"]', { includeShadowDom: true });}

    get averageUnitSizeNewComp() {return cy.get('[data-qa="Average Unit Size"]', { includeShadowDom: true });}

    get internalNotesTextArea() {return cy.xpath("//*[text()='Internal Notes']//following::*[@class='ant-input'][1]");}

    get appraiserCommentaryTextArea() {return cy.xpath("//*[text()='Appraiser Commentary']//following::*[contains(@class, 'ant-input')][1]");}
}