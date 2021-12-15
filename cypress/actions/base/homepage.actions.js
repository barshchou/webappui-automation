import homepagePage from "../../pages/base/homepage.page";
import BaseActions from "./base.actions";

class HomepageActions extends BaseActions {

    createReport(incomeType = "multifamily", address = "462 1st Avenue, New York, USA",
                 reportNumber = "TestAutoReport", templateType = "freddie-mac",
                 conclusionType = "AS_IS") {
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

    /**
     * @param {Readonly<{templateType: string, identifier: string, propIdentifierType: string, address: string, incomeType: string, reportNumber: string, state: string, conclusionType: string}>} reportCreationData
     * @param {string} reportCreationData.state
     * @param {string} reportCreationData.address
     * @param {string} reportCreationData.identifierType
     * @param {string} reportCreationData.identifier
     * @param {string} reportCreationData.reportNumber
     * @param {string} reportCreationData.templateValue
     * @param {string} reportCreationData.incomeValue
     * @param {string} reportCreationData.conclusionValue
     */
    createReportAdvancedSearch(reportCreationData) {
        this.clickNewReportButton()
            .clickAdvancedSearchButton()
            .clickSelectStateButton()
            .selectStateByName(reportCreationData.state)
            .enterAddressToSearch(reportCreationData.address)
            .clickFindPropHeader()
            .enterPropertyIdentifierType(reportCreationData.identifierType)
            .enterPropertyIdentifier(reportCreationData.identifier)
            .clickSubmitButton()
            .enterReportNumber(reportCreationData.reportNumber)
            .checkTemplateType(reportCreationData.templateValue)
            .checkIncomeType(reportCreationData.incomeValue)
            .checkConclusionType(reportCreationData.conclusionValue)
            .clickCreateReportButton();
        return this;
    }

    clickNewReportButton() {
        homepagePage.newReportButton.should("be.enabled").click();
        return this;
    }
    
    enterAddressToSearch(address) {
        homepagePage.searchAddressField.type(`${address}{enter}`).should("have.value", address);
        return this;
    }

    clickFindPropHeader() {
        homepagePage.findPropertyHeader.click();
        return this;
    }

    clickSubmitButton() {
        homepagePage.submitButton.should("not.be.disabled").click();
        return this;
    }

    clickToSearchResultRow() {
        homepagePage.searchResultsRows.should("be.visible").click();
    }

    enterReportNumber(reportNumber) {
        homepagePage.reportNumberInput.type(reportNumber).should("have.value", reportNumber);
        return this;
    }

    checkTemplateType(typeValue) {
        homepagePage.templateTypesRadios.check(typeValue);
        return this;
    }

    checkIncomeType(value) {
        homepagePage.incomeTypesRadios.check(value);
        return this;
    }

    checkConclusionType(value) {
        homepagePage.valueConclusionsRadios.check(value);
        return this;
    }

    clickCreateReportButton() {
        homepagePage.createReportButton.should("not.be.disabled").click();
        homepagePage.keyInfoBlock.should("be.visible");
        return this;
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

    clickAdvancedSearchButton() {
        homepagePage.advancedSearchButton.click();
        return this;
    }

    deleteReport(reportNumber = "TestAutoReport") {
        this.verifyThatPageIsOpened();
        this.enterReportNumberToSearch(reportNumber);
        this.clickArchiveButton(reportNumber);
    }

    clickSelectStateButton() {
        homepagePage.selectStateButton.click();
        return this;
    }

    selectStateByName(name) {
        homepagePage.getStateByName(name).click();
        return this;
    }

    enterPropertyIdentifierType(type) {
        homepagePage.propertyIdentifierTypeInput.type(type).should("have.value", type);
        return this;
    }

    enterPropertyIdentifier(value) {
        homepagePage.propertyIdentifierInput.type(value).should("have.value", value);
        return this;
    }

}

export default new HomepageActions();