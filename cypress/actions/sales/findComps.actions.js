import BaseActions from "../base/base.actions";
import findCompsPage from "../../pages/sales/findComps.page";

class FindCompsActions extends BaseActions {

    addComparable(address) {
        findCompsPage.createCompButton.click();
        findCompsPage.searchCompAddressInput.type(address).type("{enter}");
        findCompsPage.findCompField.click();
        findCompsPage.submitButton.click();
        findCompsPage.getSelectCompButtonByAddress(address).click();
    }

    verifyAddedCompByIndex(address, index, capRate) {
        findCompsPage.addressCells.eq(index).should("contain.text", address);
        findCompsPage.capRateCells.eq(index).should("have.text", capRate);
    }
}


export default new FindCompsActions();