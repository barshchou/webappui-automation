import BaseActions from "../base/base.actions";
import commercialUnitsPage from "../../pages/property/commercialUnits.page";
import {cutDecimalPartToTwoDigits, isHasDecimalPartMoreTwoDigits, numberWithCommas} from "../../../utils/numbers.utils";

class CommercialUnitsActions extends BaseActions {
    clickCommercialUnitTabByIndex(index = 0) {
        commercialUnitsPage.commercialUnitsTabs.eq(index).click();
    }

    clickRadioButtonByValueAndUnitIndex(value, index = 0) {
        commercialUnitsPage.getRadioButtonByValueAndUnitIndex(value, index).click();
    }

    enterUnitSFByUnitIndex(squareFeet, index = 0) {
        if (isHasDecimalPartMoreTwoDigits(squareFeet)) {
            squareFeet = cutDecimalPartToTwoDigits(squareFeet);
        }
        squareFeet = numberWithCommas(squareFeet);
        commercialUnitsPage.commercialUnitsSFInputs.eq(index).clear().type(squareFeet)
            .should("have.value", squareFeet);
    }

    enterListOfCommercialUnits(squareFeetList, numberOfUnits) {
        for (let i = 0; i < numberOfUnits; i++) {
            this.enterUnitSFByUnitIndex(squareFeetList[i], i);
        }
    }
}

export default new CommercialUnitsActions();