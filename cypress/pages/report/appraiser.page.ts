import BasePage from "../base/base.page";

class AppraiserPage extends BasePage {
    get pageHeader() { return cy.get("[data-qa=appraisers]"); }

    get searchAppraiserTextField() { return cy.get("[data-qa='inspectorNameInput'] input"); }

    get leadAppraiser() {
        return cy.xpath(`//*[@data-qa='fullName']//*[@data-qa='select-value']`);
    }

    get btnAddAppraiserInspector() { return cy.get("[data-qa='addAppraiserInspector']"); }

    getAppraiserOptionFromList(index = 0) {
        return cy.get(`[data-option-index="${index}"]`).should("be.visible");
    }

    appraiserSignCheckbox(appraiserName: string) { 
        return cy.xpath(`//*[.='${appraiserName}']` + 
        `/following::*[@data-qa='signReport-checkbox']//input`).eq(0);
    }

    personallyInspectedCheckbox(appraiserName: string) {
        return cy.xpath(`//*[.='${appraiserName}']` +
        `/following::*[@data-qa='inspected-checkbox']//input`).eq(0);
    }

    removeAppraiserBtn(appraiserName: string) {
        return cy.xpath(`//*[contains(text(), '${appraiserName}')]/following::*[@data-qa='remove-btn']`).eq(0);
    }

    getAllNamesWithCheckSignReportCheckboxes(isChecked = true) { 
        return cy.xpath(`//*[@data-qa="signReport-checkbox"]//*[@value='${isChecked}']` + 
        `/../../../*[@data-qa="fullName"]`); 
    }

    getAllNamesWithCheckPersonallyInspectedReportCheckboxes(isChecked = true) { 
        return cy.xpath(`//*[@data-qa="inspected-checkbox"]//*[@value='${isChecked}']` + 
        `/../../../*[@data-qa="fullName"]`); 
    }

    get hintText() {
        return cy.xpath("//*[@data-qa='addAppraiserInspectorModal']/following::*[@role='presentation'][1]");
    }

    get modalExternalInspectorRadio() { return cy.get("[data-qa='externalInspectorRadio'] input"); }

    get appraisersList() { return cy.get("[role='listbox']").children(); }

    stateCertificationByAppraiserName(name: string) {
        return cy.xpath(`//*[contains(text(), '${name}')]/following::*[@data-qa='certification']`);
    }
}

export default new AppraiserPage();