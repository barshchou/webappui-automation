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
     *
     * @param {string} attribute
     */
    checkCheckboxByQAAttr(attribute) {
        rentCompsPage.getNotCheckedCheckboxByQAAttr(attribute).should("exist").check();
        this.verifyProgressBarNotExist();
        rentCompsPage.getCheckedCheckboxByQAAttr(attribute).should("exist");
        return this;
    }

    /**
     *
     * @param {string} attribute
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
     *
     * @param {string} option
     */
    selectSortByOption(option) {
        rentCompsPage.sortByDropdown.click();
        rentCompsPage.getDropdownOptionByValue(option).should("be.visible").click();
        rentCompsPage.sortByDropdown.should("have.text", option);
        return this;
    }

    verifyMapClosedByDefault() {
        rentCompsPage.mapDropdown.should("have.attr", "aria-expanded", "false");
        return this;
    }
}

export default new CommercialRentCompsActions();