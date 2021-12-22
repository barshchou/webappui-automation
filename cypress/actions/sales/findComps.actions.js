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
     * @param {string} capRate
     * @returns {FindCompsActions}
     */
    verifyAddedCompByIndex(address, index, capRate) {
        findCompsPage.addressCells.eq(index).should("contain.text", address);
        findCompsPage.capRateCells.eq(index).should("have.text", capRate);
        return this;
    }
}


export default new FindCompsActions();