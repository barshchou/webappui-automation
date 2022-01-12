import BasePage from "../../base/base.page";

class CommercialRentCompsPage extends BasePage {
    get mapDropdown() {return cy.get("[data-qa=commercial-rent-comps-map] [role=button]");}
    get filtersDropdown() {return cy.xpath("//*[@role='button' and .='Filters']");}
}

export default new CommercialRentCompsPage();