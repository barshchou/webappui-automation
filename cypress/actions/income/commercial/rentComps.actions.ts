import BaseActions from "../../base/base.actions";
import rentCompsPage from "../../../pages/income/commercial/rentComps.page";

class CommercialRentCompsActions extends BaseActions {

    openMap() {
        rentCompsPage.mapDropdown.click();
        return this;
    }

    verifyFiltersDropdownExist() {
        rentCompsPage.filtersDropdown.should("exist");
        return this;
    }

    clickFiltersDropdown() {
        rentCompsPage.filtersDropdown.click();
        return this;
    }

    verifyLeaseTermsSectionExist() {
        rentCompsPage.leaseTermsSection.should("exist");
        return this;
    }

    /**
     * @param {string} attribute
     * @returns {CommercialRentCompsActions}
     */
    checkCheckboxByQAAttr(attribute) {
        rentCompsPage.getNotCheckedCheckboxByQAAttr(attribute).should("exist").check();
        this.verifyProgressBarNotExist();
        rentCompsPage.getCheckedCheckboxByQAAttr(attribute).should("exist");
        return this;
    }

    /**
     * @param {string} attribute
     * @returns {CommercialRentCompsActions}
     */
    uncheckCheckboxByQAAttr(attribute) {
        rentCompsPage.getCheckedCheckboxByQAAttr(attribute).should("exist").uncheck();
        this.verifyProgressBarNotExist();
        rentCompsPage.getNotCheckedCheckboxByQAAttr(attribute).should("exist");
        return this;
    }

    verifySortBySectionExist() {
        rentCompsPage.sortBySection.should("exist");
        return this;
    }

    /**
     * @param {string} option
     * @returns {CommercialRentCompsActions}
     */
    selectSortByOption(option) {
        if(option == "Newest"){
            rentCompsPage.sortByDropdown.should("contain.text", option);
        }
        else{
            rentCompsPage.sortByDropdown.click();
            rentCompsPage.getDropdownOptionByValue(option).should("be.visible").click();
            rentCompsPage.sortByDropdown.should("contain.text", option);
        }
        
        return this;
    }

    verifyMapClosedByDefault() {
        rentCompsPage.mapDropdown.should("have.attr", "aria-expanded", "false");
        return this;
    }

    /**
     * @param {string} address
     * @returns {CommercialRentCompsActions}
     */
    addCompFromMapByAddress(address) {
        rentCompsPage.getAddCompButtonByAddress(address).click({ force: true });
        return this;
    }
}

export default new CommercialRentCompsActions();