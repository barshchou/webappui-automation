import BaseActions from "../../base/base.actions";
import rentCompsPage from "../../../pages/income/commercial/rentComps.page";

class CommercialRentCompsActions extends BaseActions {

    /**
     *
     * @returns {CommercialRentCompsActions}
     */
    openMap() {
        rentCompsPage.mapDropdown.click();
        return this;
    }

    /**
     *
     * @returns {CommercialRentCompsActions}
     */
    verifyFiltersDropdownExist() {
        rentCompsPage.filtersDropdown.should("exist");
        return this;
    }
}

export default new CommercialRentCompsActions();