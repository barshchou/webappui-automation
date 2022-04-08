import BasePage from "../base/base.page";

class FindCompsPage extends BasePage {
    get createCompButton() {return cy.get("[data-qa=create-sales-comps-btn]");}

    get searchCompAddressInput() {return cy.get("[data-qa='google-autocomplete-search.location-input'] input");}

    get findCompField() {return cy.contains("Enter New Comparable Address");}

    get submitButton() {return cy.get("[data-qa=submit-button]");}

    getSelectCompButtonByAddress(address) {return cy.xpath(`//*[text()='${address}']//following-sibling::td/a`);}

    get addressCells() {return cy.get("[data-qa=address]");}

    get capRateCells() {return cy.get("td[data-qa=cap-rate]");}

    get importCompsButton() {return cy.get("[data-qa=import-btn]");}

    get importCompModal() {return cy.get("[data-qa*=import][data-qa*=modal]");}

    get csvInput() {return cy.get("[data-qa=file-input]");}

    getSelectCompFromMapButtonByAddress(address) {
        return cy.get("[class*=address]").filter(`:contains('${address}')`).parent()
            .siblings("[class*=buttonsColumn]").find("span").contains("Select").parent();
    }

    getRemoveSelectedCompButtonByAddress(address) {
        return cy.xpath(`//*[contains(text(), '${address}')]//parent::td//following-sibling::td[.='Details']` +
            "//descendant::button[@aria-label='Remove']");
    }

    getRemoveDeletedCompButtonByAddress(address) {
        return cy.xpath(`//*[contains(text(), '${address}')]//parent::td//following-sibling::td` +
            "//descendant::*[@title='Add']//following::button[@aria-label='Remove'][1]");
    }

    getRemoveCompFromMapButtonByAddress(address) {
        return cy.get("[class*=address]").filter(`:contains('${address}')`).parent()
            .siblings("[class*=buttonsColumn]").find("span").contains("Remove").parent();
    }

    get reportToSearchCompInput() {return cy.get("[name^=report]");}

    get importReportCompsButton() {return this.importCompModal.find("span").contains("Import")
        .parent("button");}

    get searchButton() {return cy.xpath("//button[.='Search']");}

    get importCompsSelectButtons() {return cy.xpath("//*[.='Selected for report']//following::button[.='Select']");}

    get createCompSearchResults() {return cy.get("[data-qa=search-result-form] tbody tr");}

    get createNewCompButton() {return cy.xpath("//button[.='Create New']");}

    get createCompNumberResidentialUnits() {return cy.xpath("//*[.='# Residential Units*']//child::input");}

    get conditionDropdown() {return cy.xpath("//*[text()='Condition*']//following::*[@class='ant-select-selector'][1]");}

    getDropdownOption(title: string) {return cy.get(`.ant-select-item-option[title='${title}']`);}

    get errorMessageNewComp() {return cy.xpath("//*[text()='Required'][contains(@class, 'errorText')]");}

    get newCompContinueButton() {return cy.xpath("//button[.='Continue']");}

    get comparableTypeDropdown() {return cy.xpath("//*[text()='Comparable Type*']//following::*[@class='ant-select-selector'][1]");}

    get createCompNumberCommercialUnits() {return cy.xpath("//*[text()='# Commercial Units*']//following::input[1]");}

    get commercialAreaNewComp() {return cy.xpath("//*[text()='Commercial Area*']//following::input[1]");}

    get netRentableAreaNewComp() {return cy.xpath("//*[.='Net Rentable Area']//child::input");}
}

export default new FindCompsPage();