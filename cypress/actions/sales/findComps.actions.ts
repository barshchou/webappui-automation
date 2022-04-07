import BaseActions from "../base/base.actions";
import findCompsPage from "../../pages/sales/findComps.page";
import {getUploadFixture} from "../../../utils/fixtures.utils";

class FindCompsActions extends BaseActions {

    addExistingComparable(address: string): FindCompsActions {
        this.clickCreateCompButton()
            .enterCompAddressToSearch(address)
            .clickSearchCompButton();
        findCompsPage.getSelectCompButtonByAddress(address).click();
        return this;
    }

    clickCreateCompButton(): FindCompsActions {
        findCompsPage.createCompButton.click();
        return this;
    }

    enterCompAddressToSearch(address: string): FindCompsActions {
        findCompsPage.searchCompAddressInput.type(address).type("{enter}");
        findCompsPage.findCompField.click();
        return this;
    }

    clickSearchCompButton(): FindCompsActions {
        findCompsPage.submitButton.click();
        return this;
    }

    openAddNewComparableFormSearchResult(address: string, searchResultIndex = 0): FindCompsActions {
        this.clickCreateCompButton()
            .enterCompAddressToSearch(address)
            .clickSearchCompButton();
        findCompsPage.createCompSearchResults.eq(searchResultIndex).click();
        findCompsPage.createNewCompButton.click();
        return this;
    }

    /**
     *
     * @param {string} address
     * @returns {FindCompsActions}
     */
    verifyAddedCompAddress(address) {
        this.verifyProgressBarNotExist();
        findCompsPage.getRemoveSelectedCompButtonByAddress(address).should("exist");
        return this;
    }

    /**
     *
     * @returns {FindCompsActions}
     */
    clickImportComparableButton() {
        findCompsPage.importCompsButton.click();
        return this;
    }

    /**
     *
     * @returns {FindCompsActions}
     */
    verifyImportCompModalShown() {
        findCompsPage.importCompModal.should("be.visible");
        return this;
    }

    /**
     *
     * @param {string} filePath
     * @returns {FindCompsActions}
     */
    uploadComps(filePath) {
        findCompsPage.csvInput.attachFile(getUploadFixture(filePath));
        return this;
    }

    /**
     *
     * @param {number} number
     * @returns {FindCompsActions}
     */
    verifyComparablesNumber(number) {
        const numberToBe = number + 1;
        findCompsPage.addressCells.should("have.length", numberToBe);
        return this;
    }

    /**
     *
     * @param {string} address
     * @returns {FindCompsActions}
     */
    selectCompFromMapByAddress(address) {
        findCompsPage.getSelectCompFromMapButtonByAddress(address).scrollIntoView().click({force: true});
        findCompsPage.getRemoveCompFromMapButtonByAddress(address).should("exist");
        return this;
    }

    /**
     *
     * @param {string} address
     * @returns {FindCompsActions}
     */
    removeCompByAddress(address) {
        findCompsPage.getRemoveSelectedCompButtonByAddress(address).click();
        return this;
    }

    /**
     *
     * @param {string} address
     * @returns {FindCompsActions}
     */
    verifyCompIsInRemovedSection(address) {
        findCompsPage.getRemoveDeletedCompButtonByAddress(address).should("exist");
        return this;
    }

    /**
     *
     * @param {string} address
     * @returns {FindCompsActions}
     */
    verifyCompIsInMap(address) {
        findCompsPage.getSelectCompFromMapButtonByAddress(address).should("exist");
        return this;
    }

    /**
     *
     * @param {string} address
     * @returns {FindCompsActions}
     */
    removeDeletedCompByAddress(address) {
        findCompsPage.getRemoveDeletedCompButtonByAddress(address).click();
        return this;
    }

    /**
     * @param {string} reportID
     * @returns {FindCompsActions}
     */
    enterReportToSearchComp(reportID) {
        findCompsPage.reportToSearchCompInput.type(reportID).should("have.value", reportID);
        return this;
    }

    clickImportCompsFromReportButton() {
        findCompsPage.importReportCompsButton.click();
        return this;
    }

    clickSearchButton() {
        findCompsPage.searchButton.click();
        return this;
    }

    selectAllCompsForImport() {
        findCompsPage.importCompsSelectButtons.each(el => {
            cy.wrap(el).click();
        });
        return this;
    }
}


export default new FindCompsActions();