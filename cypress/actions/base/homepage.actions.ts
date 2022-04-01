import homepagePage from "../../pages/base/homepage.page";
import BaseActions from "./base.actions";

class HomepageActions extends BaseActions {

    createReport(data: BoweryAutomation.ReportCreationData): this {
        if(data?.state) {
            this.clickNewReportButton()
            .clickAdvancedSearchButton()
            .clickSelectStateButton()
            .selectStateByName(data.state)
            .enterAddressToSearch(data.address)
            .enterPropertyIdentifierType(data.identifierType)
            .enterPropertyIdentifier(data.identifier)
            .clickSubmitButton()
            .enterReportNumber(data.reportNumber)
            .checkTemplateType(data.templateValue)
            .checkIncomeType(data.incomeValue)
            .checkConclusionType(data.conclusionValue)
            .clickCreateReportButton();
            return this;
        }
        else {
            this.clickNewReportButton()
            .enterAddressToSearch(data.address)
            .clickSubmitButton()
            .clickToSearchResultRow()
            .clickSubmitButton()
            .enterReportNumber(data.reportNumber)
            .checkTemplateType(data.templateValue)
            .checkIncomeType(data.incomeValue)
            .checkConclusionType(data.conclusionValue)
            .clickCreateReportButton();
            return this;
        }
    }

    clickNewReportButton(): this {
        homepagePage.newReportButton.should("be.enabled").click();
        return this;
    }

    enterAddressToSearch(address: string): this {
        homepagePage.searchAddressField.type(`${address}{enter}`).should("have.value", address);
        cy.get('[data-suggestion-index="0"]').should("be.visible");
        return this;
    }

    /**
     *
     * @returns {HomepageActions}
     */
    clickSubmitButton() {
        homepagePage.submitButton.should("not.be.disabled").click({ force: true});
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
    enterReportNumber(reportNumber: string) {
        homepagePage.reportNumberInput.type(reportNumber).should("have.value", reportNumber);
        return this;
    }

    /**
     *
     * @param {string} typeValue
     * @returns {HomepageActions}
     */
    checkTemplateType(typeValue: string) {
        homepagePage.templateTypesRadios.check(typeValue);
        return this;
    }

    checkIncomeType(value: string) {
        homepagePage.incomeTypesRadios.check(value);
        return this;
    }


    checkConclusionType(value: string) {
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
    enterReportNumberToSearch(number: string) {
        homepagePage.reportNumberSearchField.scrollIntoView().should("be.visible")
        .type(number).should("have.value", number);
        return this;
    }

    clickArchiveButton(reportNumber: string): this {
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

    deleteReport(reportNumber: string): this {
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
    selectStateByName(name: string) {
        homepagePage.getStateByName(name).click();
        return this;
    }

    /**
     *
     * @param {string} type
     * @returns {HomepageActions}
     */
    enterPropertyIdentifierType(type: string) {
        homepagePage.propertyIdentifierTypeInput.type(type).should("have.value", type);
        return this;
    }

    /**
     *
     * @param {string} value
     * @returns {HomepageActions}
     */
    enterPropertyIdentifier(value: string) {
        homepagePage.propertyIdentifierInput.type(value).should("have.value", value);
        return this;
    }

}

export default new HomepageActions();