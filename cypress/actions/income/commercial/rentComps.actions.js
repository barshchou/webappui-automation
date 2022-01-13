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

    checkCheckboxByQAAttr(attribute) {
        rentCompsPage.getNotCheckedCheckboxByQAAttr(attribute).should("exist").check();
        this.verifyProgressBarNotExist();
        rentCompsPage.getCheckedCheckboxByQAAttr(attribute).should("exist");
        return this;
    }

    uncheckCheckboxByQAAttr(attribute) {
        rentCompsPage.getCheckedCheckboxByQAAttr(attribute).should("exist").uncheck();
        this.verifyProgressBarNotExist();
        rentCompsPage.getNotCheckedCheckboxByQAAttr(attribute).should("exist");
        return this;
    }
}

export default new CommercialRentCompsActions();