import BasePage from "./base.page"

class Homepage extends BasePage {
    get newReportButton() {return cy.get("*[data-qa='create-report-btn']")}
    get searchAddressField() {return cy.get("*[placeholder='Search Address']")}
    get findPropertyHeader() {return cy.contains("Find Subject Property")}
    get submitButton() {return cy.get("*[data-qa='submit-button']")}
    get searchResultsRows() {return cy.get("tr[data-qa^='search-results']")}
    get templateTypesRadios() {return cy.get("*[name='settings.templateType']")}
    get incomeTypesRadios() {return cy.get("*[name='settings.incomeType']")}
    get valueConclusionsRadios() {return cy.get("*[name='settings.valueConclusionType']")}
    get reportNumberInput() {return cy.get("*[name='reportNumber']")}
    get createReportButton() {return cy.get("*[data-qa='create-report-btn']").last()}
    get reportNumberSearchField() {return cy.get("*[name='number']")}
    getArchiveButton(reportNumber) {return cy.xpath(`//*[text()='${reportNumber}']//following::*[@data-qa='archive-btn']`).first()}
    get keyInfoBlock() {return cy.get("*[data-qa='keyInfo']")}
}

export default new Homepage()