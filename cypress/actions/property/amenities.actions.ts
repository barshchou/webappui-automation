import amenitiesPage from "../../pages/property/amenities.page";
import { cutDecimalPartToNumberOfDigits, isDecimal } from "../../../utils/numbers.utils";
import BaseActionsExt from "../base/base.actions.ext";
import { BoweryReports } from "../../types/boweryReports.type";

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

    checkHasNoUnitAmenities(check = true): AmenitiesActions {
        amenitiesPage.hasNoUnitAmenitiesCheckbox.invoke('attr', 'value').then(status => {
            status != `${check}` 
                ? amenitiesPage.hasNoUnitAmenitiesCheckbox.click().should('have.value', `${check}`) 
                : null;
        });
        return this;
    }

    checkHasNoBuildingAmenities(check= true): AmenitiesActions {
        amenitiesPage.hasNoBuildingAmenitiesCheckbox.invoke('attr', 'value').then(status => {
            status != `${check}` 
                ? amenitiesPage.hasNoBuildingAmenitiesCheckbox.click().should('have.value', `${check}`) 
                : null;
        });
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

    addStorageUnits(units: number): AmenitiesActions {
        this.checkStorageCheckbox();
        amenitiesPage.storageUnitsTextField.clear().type(`${units}`);
        amenitiesPage.storageUnitsTextField.should("have.value", units);
        return this;
    }

    checkCheckboxByName(name: BoweryReports.AmenitiesCheckboxes, check = true): AmenitiesActions {
        amenitiesPage.getElementCheckbox(name).invoke('attr', 'value').then(status => {
            status != `${check}` 
                ? amenitiesPage.getElementCheckbox(name).click().should('have.value', `${check}`) 
                : null;
        });
        return this;
    }

    uploadLaundryRoomImage(filePath: string): AmenitiesActions {
        amenitiesPage.laundryRoomUpload.attachFile(filePath);
        return this;
    }

    rotateLaundryRoomImage(index = 0): AmenitiesActions {
        amenitiesPage.getLaundryUploadedImageBtn("rotate", index).click({ force: true });
        amenitiesPage.getLaundryUploadedImage(index).invoke("css", "background-image").then(text => {
            expect(text).to.include("vikas-real-estate/image/upload/w_300,a_90");
        });
        return this;
    }

    deleteLaundryRoomImage(index = 0): AmenitiesActions {
        amenitiesPage.getLaundryUploadedImageBtn("remove", index).click({ force: true }).should("not.exist");
        return this;
    }

    enterStoreInput(value: number | string): AmenitiesActions {
        const verifyParam = /^\d+$/.test(`${value}`) ? "have.value" : "not.have.value";
        amenitiesPage.storageInput.clear().type(`${value}{enter}`).should(verifyParam, value);
        if (value > 1000) {
            cy.contains("Max value is 1000").should("exist");
        }
        return this;
    }
}

export default new AmenitiesActions(amenitiesPage);