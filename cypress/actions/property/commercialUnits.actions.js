import BaseActions from "../base/base.actions";
import commercialUnitsPage from "../../pages/property/commercialUnits.page";

class CommercialUnitsActions extends BaseActions {
    clickCommercialUnitTabByIndex(index = 0) {
        commercialUnitsPage.commercialUnitsTabs.eq(index).click();
    }

    clickRadioButtonByValueAndUnitIndex(value, index = 0) {
        commercialUnitsPage.getRadioButtonByValueAndUnitIndex(value, index).click();
    }
}

export default new CommercialUnitsActions();