import BasePage from "../base/base.page";

class AppraiserPage extends BasePage {
    get pageHeader() { return cy.get("[data-qa=appraisers]"); }

    get searchAppraiserTextField() { return cy.get("[data-qa='inspectorNameInput'] input"); }

    get btnAddAppraiserInspector() { return cy.get("[data-qa='addAppraiserInspector']"); }

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

    get certificationAssistanceText() { 
        return cy.get("[data-qa='certificationAssistance.commentary-generated-text']"); 
    }

    get certificationInspectionText() {
        return cy.get("[data-qa='certificationInspection.commentary-generated-text']");
    }

    getAllNamesWithCheckSignReportCheckboxes(isChecked = true) { 
        return cy.xpath(`//*[@data-qa="signReport-checkbox"]//*[@value='${isChecked}']` + 
        `/../../../*[@data-qa="fullName"]`); 
    }

    getAllNamesWithCheckPersonallyInspectedReportCheckboxes(isChecked = true) { 
        return cy.xpath(`//*[@data-qa="inspected-checkbox"]//*[@value='${isChecked}']` + 
        `/../../../*[@data-qa="fullName"]`); 
    }

    get modalExternalInspectorRadio() { return cy.get("[data-qa='externalInspectorRadio'] input"); }
}

export default new AppraiserPage();