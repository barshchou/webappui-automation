import BaseActions from "../base/base.actions";
import commercialUnitsPage from "../../pages/property/commercialUnits.page";
import {cutDecimalPartToNumberOfDigits, isHasDecimalPartMoreNumberOfDigits, numberWithCommas} from "../../../utils/numbers.utils";

class CommercialUnitsActions extends BaseActions {

    clickCommercialUnitTabByIndex(index: number = 0): CommercialUnitsActions {
        commercialUnitsPage.commercialUnitsTabs.eq(index).click();
        return this;
    }

    clickRadioButtonByValueAndUnitIndex(group: string, value: string, index: number = 0): CommercialUnitsActions {
        commercialUnitsPage.getRadioButtonByValueAndUnitIndex(group, value, index).click();
        this.verifyRadioIsChecked(group, value, index);
        if (value === "other"){
            commercialUnitsPage.getOtherFrontageByUnit(index).should("exist").should("have.attr", "required");
        }
        return this;
    }

    verifyRadioIsChecked(group: string, value: string, index: number = 0): CommercialUnitsActions {
        commercialUnitsPage.getRadioButtonByValueAndUnitIndex(group, value, index).parent().should("have.class", "Mui-checked");
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