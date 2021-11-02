import BaseActions from "../base/base.actions";
import amenitiesPage from "../../pages/property/amenities.page";
import {cutDecimalPartToNumberOfDigits, isDecimal} from "../../../utils/numbers.utils";

class AmenitiesActions extends BaseActions{
    addParkingPlaces(numberOfPlaces) {
        amenitiesPage.hasParkingCheckbox.check().should("have.value", "true");
        amenitiesPage.parkingSpacesNumberField.clear().type(numberOfPlaces);
        if(isDecimal(numberOfPlaces)) {
            numberOfPlaces = cutDecimalPartToNumberOfDigits(numberOfPlaces, 0);
        }
        if(numberOfPlaces > 2500) {
            amenitiesPage.parkingErrorMessage.should("exist");
        }
        amenitiesPage.parkingSpacesNumberField.should("have.value", numberOfPlaces);
    }

    checkHasNoUnitAmenities() {
        amenitiesPage.hasNoUnitAmenitiesCheckbox.check().should("have.value", "true");
    }
}

export default new AmenitiesActions();