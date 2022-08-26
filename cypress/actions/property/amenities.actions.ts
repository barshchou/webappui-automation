import amenitiesPage from "../../pages/property/amenities.page";
import { cutDecimalPartToNumberOfDigits, isDecimal } from "../../../utils/numbers.utils";
import BaseActionsExt from "../base/base.actions.ext";

class AmenitiesActions extends BaseActionsExt<typeof amenitiesPage> {

    addParkingPlaces(numberOfPlaces: number): AmenitiesActions {
        this.checkParkingCheckbox();
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

    checkLaundryRoomCheckbox(check = true): AmenitiesActions {
        amenitiesPage.laundryCheckbox.invoke('attr', 'value').then(status => {
            status != `${check}` 
                ? amenitiesPage.laundryCheckbox.click().should('have.value', `${check}`) 
                : null;
        });
        return this;
    }

    checkStorageCheckbox(check = true): AmenitiesActions {
        amenitiesPage.storageCheckbox.invoke('attr', 'value').then(status => {
            status != `${check}` 
                ? amenitiesPage.storageCheckbox.click().should('have.value', `${check}`) 
                : null;
        });
        return this;
    }

    checkOtherCheckbox(check = true): AmenitiesActions {
        amenitiesPage.otherUnitAmenitiesCheckbox.invoke('attr', 'value').then(status => {
            status != `${check}` 
                ? amenitiesPage.otherUnitAmenitiesCheckbox.click().should('have.value', `${check}`) 
                : null;
        });
        return this;
    }

    checkParkingCheckbox(check = true): AmenitiesActions {
        amenitiesPage.hasParkingCheckbox.invoke('attr', 'value').then(status => {
            status != `${check}` 
                ? amenitiesPage.hasParkingCheckbox.click().should('have.value', `${check}`) 
                : null;
        });
        return this;
    }

    addStorageUnits(units: number): AmenitiesActions {
        this.checkStorageCheckbox();
        amenitiesPage.storageUnitsTextField.clear().type(`${units}`)
            .should("have.value", units);
        return this;
    }
}

export default new AmenitiesActions(amenitiesPage);