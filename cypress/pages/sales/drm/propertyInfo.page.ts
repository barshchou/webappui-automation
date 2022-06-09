export default class PropertyInformationForm {
    // get createCompNumberResidentialUnits() {return cy.xpath("//*[.='# Residential Units*']//child::input");}

    get createCompNumberResidentialUnits() {return cy.get("comp-plex").shadow().contains("# Residential Units").next().find("input");}

    // get conditionDropdown() {return cy.xpath("//*[text()='Condition*']//following::*[@class='ant-select-selector'][1]");}

    get conditionDropdown() {return cy.get("comp-plex").shadow().contains("Condition").next();}

    getDropdownOption(title: string) {return cy.get(`.ant-select-item-option[title='${title}']`, { includeShadowDom: true });}

    get errorMessageNewComp() {return cy.xpath("//*[text()='Required'][contains(@class, 'errorText')]");}

    // get errorMessageNewComp() {return cy.get("comp-plex").shadow().contains("Required").find()}

    get newCompContinueButton() {return cy.xpath("//button[.='Continue']");}

    get comparableTypeDropdown() {return cy.xpath("//*[text()='Comparable Type*']//following::*[@class='ant-select-selector'][1]");}

    get createCompNumberCommercialUnits() {return cy.xpath("//*[text()='# Commercial Units*']//following::input[1]");}

    get commercialAreaNewComp() {return cy.xpath("//*[text()='Commercial Area*']//following::input[1]");}

    get netRentableAreaNewComp() {return cy.xpath("//*[.='Net Rentable Area']//child::input");}

    get averageUnitSizeNewComp() {return cy.xpath("//*[.='Average Unit Size']//child::input");}

    get internalNotesTextArea() {return cy.xpath("//*[text()='Internal Notes']//following::*[@class='ant-input'][1]");}

    get appraiserCommentaryTextArea() {return cy.xpath("//*[text()='Appraiser Commentary']//following::*[contains(@class, 'ant-input')][1]");}
}