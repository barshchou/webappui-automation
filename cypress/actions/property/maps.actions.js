import BaseActions from "../base/base.actions";
import mapsPage from "../../pages/property/maps.page";
import {cutDecimalPartToNumberOfDigits, isHasDecimalPartMoreNumberOfDigits} from "../../../utils/numbers.utils";

class MapsActions extends BaseActions{
    enterPropertyFrontage(frontage) {
        if (isHasDecimalPartMoreNumberOfDigits(frontage, 2)) {
            frontage = cutDecimalPartToNumberOfDigits(frontage, 2);
        }
        mapsPage.propertyFrontage.clear().type(frontage).should("have.value", frontage);
    }
}

export default new MapsActions();