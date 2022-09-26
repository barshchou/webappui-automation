import BasePage from "../base/base.page";

class OrganizationInfoPage extends BasePage {
    get pageHeader() { return cy.xpath("//h5[.='Organization New Client']"); }

    get mainLeadAppraiser() { return cy.get("[data-qa='select-value']"); }
}

export default new OrganizationInfoPage();