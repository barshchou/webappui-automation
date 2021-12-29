import BaseActions from "../base/base.actions";
import commercialUnitsPage from "../../pages/property/commercialUnits.page";
import {cutDecimalPartToNumberOfDigits, isHasDecimalPartMoreNumberOfDigits, numberWithCommas} from "../../../utils/numbers.utils";

class CommercialUnitsActions extends BaseActions {

    /**
     *
     * @param {number} index
     * @returns {CommercialUnitsActions}
     */
    clickCommercialUnitTabByIndex(index = 0) {
        commercialUnitsPage.commercialUnitsTabs.eq(index).click();
        return this;
    }

    /**
     *
     * @param {string} value
     * @param {number} index
     * @returns {CommercialUnitsActions}
     */
    clickRadioButtonByValueAndUnitIndex(value, index = 0) {
        commercialUnitsPage.getRadioButtonByValueAndUnitIndex(value, index).click();
        return this;
    }

    /**
     *
     * @param {number | string} squareFeet
     * @param {number} index
     * @returns {CommercialUnitsActions}
     */
    enterUnitSFByUnitIndex(squareFeet, index = 0) {
        let squareFeetToBe = squareFeet;
        if (isHasDecimalPartMoreNumberOfDigits(squareFeet)) {
            squareFeetToBe = cutDecimalPartToNumberOfDigits(squareFeet);
        }
        squareFeetToBe = numberWithCommas(squareFeetToBe);
        commercialUnitsPage.commercialUnitsSFInputs.eq(index).clear().type(squareFeet)
            .should("have.value", squareFeetToBe);
        return this;
    }

    /**
     *
     * @param squareFeetList
     * @param numberOfUnits
     * @returns {CommercialUnitsActions}
     */
    enterListOfCommercialUnits(squareFeetList, numberOfUnits) {
        for (let i = 0; i < numberOfUnits; i++) {
            this.enterUnitSFByUnitIndex(squareFeetList[i], i);
        }
        return this;
    }
}

export default new CommercialUnitsActions();