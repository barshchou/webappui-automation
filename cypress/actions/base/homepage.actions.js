import homepagePage from "../../pages/base/homepage.page";
import BaseActions from "./base.actions";

class HomepageActions extends BaseActions {

    /**
     * @param {{incomeValue: string, address: string, reportNumber: string, templateValue: string,
     * conclusionValue: string}} reportCreationData
     * @returns {HomepageActions}
     */
    createReport(reportCreationData) {
        this.clickNewReportButton()
            .enterAddressToSearch(reportCreationData.address)
            .clickFindPropHeader()
            .clickSubmitButton()
            .clickToSearchResultRow()
            .clickSubmitButton()
            .enterReportNumber(reportCreationData.reportNumber)
            .checkTemplateType(reportCreationData.templateValue)
            .checkIncomeType(reportCreationData.incomeValue)
            .checkConclusionType(reportCreationData.conclusionValue)
            .clickCreateReportButton();
        return this;
    }

    /**
     * @param {Readonly<{identifier: string, address: string, reportNumber: string, incomeValue: string,
     * templateValue: string, state: string, identifierType: string, conclusionValue: string}>} reportCreationData
     * @returns {HomepageActions}
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

    /**
     *
     * @returns {HomepageActions}
     */
    clickNewReportButton() {
        homepagePage.newReportButton.should("be.enabled").click();
        return this;
    }

    /**
     *
     * @param {string} address
     * @returns {HomepageActions}
     */
    enterAddressToSearch(address) {
        homepagePage.searchAddressField.type(`${address}{enter}`).should("have.value", address);
        return this;
    }

    /**
     *
     * @returns {HomepageActions}
     */
    clickFindPropHeader() {
        homepagePage.findPropertyHeader.click();
        return this;
    }

    /**
     *
     * @returns {HomepageActions}
     */
    clickSubmitButton() {
        homepagePage.submitButton.should("not.be.disabled").click();
        return this;
    }

    /**
     *
     * @returns {HomepageActions}
     */
    clickToSearchResultRow() {
        homepagePage.searchResultsRows.should("be.visible").click();
        return this;
    }

    /**
     *
     * @param {string} reportNumber
     * @returns {HomepageActions}
     */
    enterReportNumber(reportNumber) {
        homepagePage.reportNumberInput.type(reportNumber).should("have.value", reportNumber);
        return this;
    }

    /**
     *
     * @param {string} typeValue
     * @returns {HomepageActions}
     */
    checkTemplateType(typeValue) {
        homepagePage.templateTypesRadios.check(typeValue);
        return this;
    }

    /**
     *
     * @param {string} value
     * @returns {HomepageActions}
     */
    checkIncomeType(value) {
        homepagePage.incomeTypesRadios.check(value);
        return this;
    }

    /**
     *
     * @param {string} value
     * @returns {HomepageActions}
     */
    checkConclusionType(value) {
        homepagePage.valueConclusionsRadios.check(value);
        return this;
    }

    /**
     *
     * @returns {HomepageActions}
     *
     */
    clickCreateReportButton() {
        homepagePage.createReportButton.should("not.be.disabled").click();
        homepagePage.keyInfoBlock.should("be.visible");
        return this;
    }

    /**
     *
     * @param {string} number
     * @returns {HomepageActions}
     */
    enterReportNumberToSearch(number) {
        homepagePage.reportNumberSearchField.scrollIntoView().should("be.visible")
        .type(number).should("have.value", number);
        return this;
    }

    /**
     *
     * @param {string} reportNumber
     * @returns {HomepageActions}
     */
    clickArchiveButton(reportNumber) {
        homepagePage.getArchiveButton(reportNumber).should("exist").click({force:true});
        return this;
    }

    /**
     *
     * @returns {HomepageActions}
     */
    verifyThatPageIsOpened() {
        homepagePage.createReportButton.should("be.visible");
        return this;
    }

    /**
     *
     * @returns {HomepageActions}
     */
    clickAdvancedSearchButton() {
        homepagePage.advancedSearchButton.click();
        return this;
    }

    /**
     *
     * @param {string} reportNumber
     * @returns {HomepageActions}
     */
    deleteReport(reportNumber) {
        this.verifyThatPageIsOpened()
            .enterReportNumberToSearch(reportNumber)
            .clickArchiveButton(reportNumber);
        return this;
    }

    /**
     *
     * @returns {HomepageActions}
     */
    clickSelectStateButton() {
        homepagePage.selectStateButton.click();
        return this;
    }

    /**
     *
     * @param {string} name
     * @returns {HomepageActions}
     */
    selectStateByName(name) {
        homepagePage.getStateByName(name).click();
        return this;
    }

    /**
     *
     * @param {string} type
     * @returns {HomepageActions}
     */
    enterPropertyIdentifierType(type) {
        homepagePage.propertyIdentifierTypeInput.type(type).should("have.value", type);
        return this;
    }

    /**
     *
     * @param {string} value
     * @returns {HomepageActions}
     */
    enterPropertyIdentifier(value) {
        homepagePage.propertyIdentifierInput.type(value).should("have.value", value);
        return this;
    }

}

export default new HomepageActions();