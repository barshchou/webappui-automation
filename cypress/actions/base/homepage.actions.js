import homepagePage from "../../pages/base/homepage.page"
import BaseActions from "./base.actions"

class HomepageActions extends BaseActions {
    clickNewReportButton() {
        homepagePage.newReportButton.should("be.enabled").click()
    }
    
    enterAddressToSearch(address) {
        homepagePage.searchAddressField.type(`${address}{enter}`).should("have.value", address)
    }

    clickFindPropHeader() {
        homepagePage.findPropertyHeader.click()
    }

    clickSubmitButton() {
        homepagePage.submitButton.should("not.be.disabled").click()
    }

    clickToSearchResultRow() {
        homepagePage.searchResultsRows.should("be.visible").click()
    }

    enterReportNumber(reportNumber) {
        homepagePage.reportNumberInput.type(reportNumber).should("have.value", reportNumber)
    }

    checkTemplateType(typeValue) {
        homepagePage.templateTypesRadios.check(typeValue)
    }

    checkIncomeType(value) {
        homepagePage.incomeTypesRadios.check(value)
    }

    checkConclusionType(value) {
        homepagePage.valueConclusionsRadios.check(value)
    }

    clickCreateReportButton() {
        homepagePage.createReportButton.should("not.be.disabled").click()
    }

    enterReportNumberToSearch(number) {
        homepagePage.reportNumberSearchField.should("be.enabled").should("be.visible")
        .type(number).should("have.value", number)
    }

    clickArchiveButton() {
        homepagePage.archiveButton.invoke("mouseover").should("be.visible").click()
    }
}

export default new HomepageActions()