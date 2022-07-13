import BasePage from "../base/base.page";

class AppraiserPage extends BasePage {
    get pageHeader() {return cy.get("[data-qa=appraisers]");}

    get searchAppraiserTextField() {return cy.get('[role="dialog"] [type="text"]');}

    appraiserSignCheckbox(appraiserName: string) { return cy.xpath(`//*[@data-qa='fullName'][.='${appraiserName}']/following::*[@data-qa='signReport-checkbox']//input`);}
}

export default new AppraiserPage();