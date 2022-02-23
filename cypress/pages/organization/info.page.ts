import BasePage from "../base/base.page";

class OrganizationInfoPage extends BasePage{
    get pageHeader() {return cy.xpath("//h5[.='Organization Information']");}
}

export default new OrganizationInfoPage();