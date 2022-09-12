import amenitiesPage from "../../pages/property/amenities.page";
import { cutDecimalPartToNumberOfDigits, isDecimal } from "../../../utils/numbers.utils";
import BaseActionsExt from "../base/base.actions.ext";

class AmenitiesActions extends BaseActionsExt<typeof amenitiesPage> {

    addParkingPlaces(numberOfPlaces: number): AmenitiesActions {
        amenitiesPage.hasParkingCheckbox.check().should("have.value", "true");
        amenitiesPage.parkingSpacesNumberField.clear().type(`${numberOfPlaces}`);
        if (isDecimal(numberOfPlaces)) {
            numberOfPlaces = cutDecimalPartToNumberOfDigits(numberOfPlaces, 0);
        }
        if (numberOfPlaces > 2500) {
            amenitiesPage.parkingErrorMessage.should("exist");
        }
        amenitiesPage.parkingSpacesNumberField.should("have.value", numberOfPlaces);
        return this;
    }

    checkHasNoUnitAmenities(): AmenitiesActions {
        amenitiesPage.hasNoUnitAmenitiesCheckbox.check().should("have.value", "true");
        return this;
    }

    checkLaundryRoomCheckbox(): AmenitiesActions {
        amenitiesPage.laundryCheckbox.should("have.value", "false").check().should("have.value", "true");
        return this;
    }

    checkStorageCheckbox(): AmenitiesActions {
        amenitiesPage.storageCheckbox.should("have.value", "false").check().should("have.value", "true");
        return this;
    }

    addStorageUnits(units: number): AmenitiesActions {
        this.checkStorageCheckbox();
        amenitiesPage.storageUnitsTextField.clear().type(`${units}`);
        amenitiesPage.storageUnitsTextField.should("have.value", units);
        return this;
    }
}

export default new AmenitiesActions(amenitiesPage);