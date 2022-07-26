import BasePage from "../base/base.page";

class CapRateCompsPage extends BasePage {
    get headerSection() { return cy.get("[data-qa=capRateComps]"); }

    get addCompButton() { return cy.get("[data-qa=create-cap-rate-comp-btn]"); }

    get advancedSearchButton() { return cy.get("[data-qa=advanced-search-link]"); }

    get selectStateDropdown() { 
        return cy.get("[data-qa='search.locationIdentifier-select-list'] [data-qa=select-value]"); 
    }

    getDropdownOptionByValue(value: string) { return cy.get(`li[data-value='${value}']`); }

    get addressInput() { return cy.get("[data-qa$=location-input] input"); }

    get findCompHeader() { return cy.contains("Find Cap Rate Comparable"); }

    get propIDInput() { return cy.get("[name='search.propertyIdentifier']"); }

    get submitButton() { return cy.get("[data-qa=submit-button]"); }

    get sourceOfInfoDropdown() { return cy.get("[data-qa^=sourceOfInformation] [data-qa=select-value]"); }

    get sourceNameInput() { return cy.get("[name=sourceName]"); }

    get sourceUrlInput() { return cy.get("[name=sourceUrl]"); }

    get comparablesAddresses() { return cy.get("[name^=capRateComps][name$=address]"); }

    get comparablesGBAs() { return cy.get("[name^=capRateComps][name$=gba]"); }

    get comparablesTypesDrops() { 
        return cy.get("[data-qa^=capRateComps][data-qa$=type-select-list] [data-qa=select-value]"); 
    }

    get compsElevatoredCheckboxes() { return cy.get("[data-qa^=capRateComps][data-qa*=elevatored] input"); }

    get compsResUnits() { return cy.get("[name^=capRateComps][name$=numberOfResidentialUnits]"); }

    get compsListingCheckboxes() { return cy.get("[data-qa^=capRateComps][data-qa*=listing] input"); }

    get compsInContractCheckboxes() { return cy.get("[data-qa^=capRateComps][data-qa*=inContract] input"); }

    get compsSaleDates() { 
        return cy.get("[data-qa^=capRateComps][data-qa$=saleDate-date-picker] input:not([type=hidden])"); 
    }

    get errorMessage() { return cy.get("#component-error-text"); }

    get inputsToCheckDate() { return cy.get("[data-qa^=capRateComps][data-qa$=saleDate-date-picker] > input"); }

    get compsYearsBuilt() { return cy.get("[name^=capRateComps][name$=yearBuilt]"); }

    get compsPricesPerSF() { return cy.get("[data-qa=comps-table-pricePerSF-cell]"); }

    get compsCapRates() { return cy.get("[name^=capRateComps][name$=capRate]"); }

    get compsSourceOfInfoCells() { return cy.get("[data-qa=comps-table-source-of-info-cell] > a"); }

    get capRateCommentary() { return cy.get("[data-qa^='comparableCapRatesDiscussion.commentary']"); }

    get comparableIncomePotentialRadio() { return cy.get("[name=comparableIncomePotential]"); }

    getElementToCheckRadio(radioValue: string) { return cy.get(`[data-qa=checked] [value=${radioValue}]`); }

    get propertyConditionsRadio() { return cy.get("[name=comparablePropertyConditions]"); }

    get propertyLocationsRadio() { return cy.get("[name=comparablePropertyLocations]"); }
}

export default new CapRateCompsPage();