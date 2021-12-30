import BaseActions from "../base/base.actions";
import findCompsPage from "../../pages/sales/findComps.page";

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
     * @param {number} index
     * @returns {FindCompsActions}
     */
    verifyAddedCompAddressByIndex(address, index) {
        findCompsPage.addressCells.eq(index).should("contain.text", address);
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
}


export default new FindCompsActions();