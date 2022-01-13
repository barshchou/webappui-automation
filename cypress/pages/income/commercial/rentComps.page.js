import BasePage from "../../base/base.page";

class CommercialRentCompsPage extends BasePage {
    get mapDropdown() {return cy.get("[data-qa=commercial-rent-comps-map] [role=button]");}
    get filtersDropdown() {return cy.xpath("//*[@role='button' and .='Filters']");}
    get leaseTermsSection() {return cy.contains("Lease Terms");}
    getNotCheckedCheckboxByQAAttr(attribute) {return cy.get(`[data-qa='${attribute}'] input`);}
    getCheckedCheckboxByQAAttr(attribute) {return cy.get(`[data-qa='${attribute}-checked'] input`);}
}

export default new CommercialRentCompsPage();