import BasePage from "./base.page";

class Homepage extends BasePage {
    get newReportButton() {return cy.get("*[data-qa='create-report-btn']");}

    get searchAddressField() {return cy.get("*[placeholder='Search Address']");}

    get findPropertyHeader() {return cy.contains("Find Subject Property");}

    get submitButton() {return cy.get("*[data-qa='submit-button']");}

    get searchResultsRows() {return cy.get("tr[data-qa^='search-results']");}

    get templateTypesRadios() {return cy.get("*[name='settings.templateType']");}

    get incomeTypesRadios() {return cy.get("*[name='settings.incomeType']");}

    get valueConclusionsRadios() {return cy.get("*[name='settings.valueConclusionType']");}

    get pullExternalDataRadios() {return cy.get("[name='settings.pullExternalData']");}

    get reportNumberInput() {return cy.get("*[name='reportNumber']");}

    get createReportButton() {return cy.get("*[data-qa='create-report-btn']").last();}

    get reportNumberSearchField() {return cy.get("*[name='number']");}

    getArchiveButton(reportNumber: string) {
        return cy.xpath(`//*[text()='${reportNumber}']//following::*[@data-qa='archive-btn']`).first();
    }

    get keyInfoBlock() {return cy.get("*[data-qa='keyInfo']");}

    get advancedSearchButton() {return cy.get("*[data-qa=advanced-search-link]");}

    get selectStateButton() {return cy.get("*[data-qa='search.locationIdentifier-select-list'] [role='button']");}

    getStateByName(name: string) {return cy.get(`*[data-qa='search.locationIdentifier-${name}-select-option']`);}

    get propertyIdentifierTypeInput() {return cy.get("*[name='search.propertyIdentifierType']");}

    get propertyIdentifierInput() {return cy.get("*[name='search.propertyIdentifier']");}

    get reportNumberCells() {return cy.get("[aria-colindex='2']");}

    get allReportsTab() {return cy.xpath("//button[.='ALL REPORTS']");}

    /**
     * @returns List of report rows available on dashboard
     */
    get reportsRows(){
        return cy.get('[aria-label="grid"] a');
    }

    get reportStatus() {return cy.xpath("//div[aria-colindex='9']//span");} 
}

export default new Homepage();