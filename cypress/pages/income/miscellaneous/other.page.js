import BasePage from "../../base/base.page";

class OtherPage extends BasePage {

    get pageHeader() {return cy.get("[data-qa='other'] h5");}

}

export default new OtherPage();
