import BasePage from "../base/base.page";

class AppraiserPage extends BasePage {
    get pageHeader() {return cy.get("[data-qa=appraisers]");}
}

export default new AppraiserPage();