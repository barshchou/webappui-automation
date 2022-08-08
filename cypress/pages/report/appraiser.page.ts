import BasePage from "../base/base.page";

class AppraiserPage extends BasePage {
    get pageHeader() { return cy.get("[data-qa=appraisers]"); }

    get searchAppraiserTextField() { return cy.get('[role="dialog"] [type="text"]'); }

    get btnAddAppraiserInspector() {
        return cy.contains("Add appraiser / inspector");
    }

    getAppraiserOptionFromList(index = 0) {
        return cy.get(`[data-option-index="${index}"]`).should("be.visible");
    }

    appraiserSignCheckbox(appraiserName: string) { 
        return cy.xpath(`//*[@data-qa='fullName'][.='${appraiserName}']` + 
        `/following::*[@data-qa='signReport-checkbox']//input`).eq(0);
    }

    personallyInspectedCheckbox(appraiserName: string) {
        return cy.xpath(`//*[@data-qa='fullName'][.='${appraiserName}']` +
        `/following::*[@data-qa='inspected-checkbox']//input`).eq(0);
    }

    removeAppraiserBtn(appraiserName: string) {
        return cy.xpath(`//*[contains(text(), '${appraiserName}')]/following::*[@data-qa='remove-btn']`).eq(0);
    }
}

export default new AppraiserPage();