import BaseActions from "../base/base.actions";
import commercialUnitsPage from "../../pages/property/commercialUnits.page";
import {cutDecimalPartToNumberOfDigits, isHasDecimalPartMoreNumberOfDigits, numberWithCommas} from "../../../utils/numbers.utils";

class CommercialUnitsActions extends BaseActions {

    clickCommercialUnitTabByIndex(index: number = 0): CommercialUnitsActions {
        commercialUnitsPage.commercialUnitsTabs.eq(index).click();
        return this;
    }

    clickRadioButtonByValueAndUnitIndex(value: string, index: number = 0): CommercialUnitsActions {
        commercialUnitsPage.getRadioButtonByValueAndUnitIndex(value, index).click();
        return this;
    }

    enterUnitSFByUnitIndex(squareFeet: number | string, index: number = 0): CommercialUnitsActions {
        let squareFeetToBe: string | number = squareFeet;
        if (isHasDecimalPartMoreNumberOfDigits(squareFeet)) {
            squareFeetToBe = cutDecimalPartToNumberOfDigits(squareFeet);
        }
        squareFeetToBe = numberWithCommas(squareFeetToBe);
        commercialUnitsPage.commercialUnitsSFInputs.eq(index).clear().type(`${squareFeet}`)
            .should("have.value", squareFeetToBe);
        return this;
    }

    /**
     * @param {Array<number | string>} squareFeetList
     * @param {number} numberOfUnits
     * @returns {CommercialUnitsActions}
     */
    enterListUnitSF(squareFeetList, numberOfUnits) {
        for (let i = 0; i < numberOfUnits; i++) {
            this.enterUnitSFByUnitIndex(squareFeetList[i], i);
        }
        return this;
    }
}

export default new CommercialUnitsActions();