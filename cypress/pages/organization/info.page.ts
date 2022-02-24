import BasePage from "../base/base.page";

class OrganizationInfoPage extends BasePage{
    get pageHeader() {return cy.xpath("//h5[.='Organization New Client']");}
}

export default new OrganizationInfoPage();