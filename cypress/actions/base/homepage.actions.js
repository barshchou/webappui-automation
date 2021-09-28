import homepagePage from "../../pages/base/homepage.page";
import BaseActions from "./base.actions";

class HomepageActions extends BaseActions {

    createReport(address = "462 1st Avenue, New York, USA", reportNumber = "TestAutoReport",
    templateType = "freddie-mac", incomeType = "multifamily", conclusionType = "AS_IS") {
        this.clickNewReportButton();
        this.enterAddressToSearch(address);
        this.clickFindPropHeader();
        this.clickSubmitButton();
        this.clickToSearchResultRow();
        this.clickSubmitButton();
        this.enterReportNumber(reportNumber);
        this.checkTemplateType(templateType);
        this.checkIncomeType(incomeType);
        this.checkConclusionType(conclusionType);
        this.clickCreateReportButton();
    }

    clickNewReportButton() {
        homepagePage.newReportButton.should("be.enabled").click();
    }
    
    enterAddressToSearch(address) {
        homepagePage.searchAddressField.type(`${address}{enter}`).should("have.value", address);
    }

    clickFindPropHeader() {
        homepagePage.findPropertyHeader.click();
    }

    clickSubmitButton() {
        homepagePage.submitButton.should("not.be.disabled").click();
    }

    clickToSearchResultRow() {
        homepagePage.searchResultsRows.should("be.visible").click();
    }

    enterReportNumber(reportNumber) {
        homepagePage.reportNumberInput.type(reportNumber).should("have.value", reportNumber);
    }

    checkTemplateType(typeValue) {
        homepagePage.templateTypesRadios.check(typeValue);
    }

    checkIncomeType(value) {
        homepagePage.incomeTypesRadios.check(value);
    }

    checkConclusionType(value) {
        homepagePage.valueConclusionsRadios.check(value);
    }

    clickCreateReportButton() {
        homepagePage.createReportButton.should("not.be.disabled").click();
        homepagePage.keyInfoBlock.should("be.visible");
    }

    enterReportNumberToSearch(number) {
        homepagePage.reportNumberSearchField.scrollIntoView().should("be.visible")
        .type(number).should("have.value", number);
    }

    clickArchiveButton(reportNumber) {
        homepagePage.getArchiveButton(reportNumber).should("exist").click({force:true});
    }

    verifyThatPageIsOpened() {
        homepagePage.createReportButton.should("be.visible");
    }

    deleteReport(reportNumber = "TestAutoReport") {
        this.verifyThatPageIsOpened();
        cy.reload();
        this.enterReportNumberToSearch(reportNumber);
        this.clickArchiveButton(reportNumber);
    }

}

export default new HomepageActions();