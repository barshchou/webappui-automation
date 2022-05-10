import BasePage from "../base/base.page";

class PropertySaleConclusionPage extends BasePage {
    get contractPrice() {return cy.xpath("//*[.='Contract']//following-sibling::td[1]");}

    get contractDate() {return cy.xpath("//*[.='Contract']//following-sibling::td[2]");}

    get contractChangeInValue() {return cy.xpath("//*[.='Contract']//following-sibling::td[3]");}
}

export default new PropertySaleConclusionPage();