import BaseActions from "../base/base.actions";
import findCompsPage from "../../pages/sales/findComps.page";
import {getUploadFixture} from "../../../utils/fixtures.utils";

class FindCompsActions extends BaseActions {

    /**
     *
     * @param {string} address
     * @returns {FindCompsActions}
     */
    addComparable(address) {
        findCompsPage.createCompButton.click();
        findCompsPage.searchCompAddressInput.type(address).type("{enter}");
        findCompsPage.findCompField.click();
        findCompsPage.submitButton.click();
        findCompsPage.getSelectCompButtonByAddress(address).click();
        return this;
    }

    /**
     *
     * @param {string} address
     * @returns {FindCompsActions}
     */
    verifyAddedCompAddressByIndex(address) {
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
}


export default new FindCompsActions();