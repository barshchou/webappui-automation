import amenitiesPage from "../../pages/property/amenities.page";
import { cutDecimalPartToNumberOfDigits, isDecimal } from "../../../utils/numbers.utils";
import BaseActionsExt from "../base/base.actions.ext";
import { BoweryReports } from "../../types/boweryReports.type";

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

    checkCheckboxByName(name: BoweryReports.AmenitiesCheckboxes, check = true): AmenitiesActions {
        const action = check ? amenitiesPage.getElementCheckbox(name).check() 
            : amenitiesPage.getElementCheckbox(name).uncheck();
        action.should("have.value", `${check}`);
        return this;
    }

    uploadImageByName(name: string, filePath: string): AmenitiesActions {
        amenitiesPage.getUploadImageByName(name).attachFile(filePath);
        return this;
    }

    rotateImageByName(name: string, countRotate = 1, index = 0): AmenitiesActions {
        for (let i = 0; i < countRotate; i++) {
            amenitiesPage.getRotateUploadedImageBtnByName(name, index).click({ force: true });
        }
        const degreeRotation = countRotate * 90;
        amenitiesPage.getUploadedImageByName(name, index).invoke("css", "background-image").then(text => {
            expect(text).to.include(`vikas-real-estate/image/upload/w_300,a_${degreeRotation}`);
        });
        return this;
    }

    removeImageByName(name: string, index = 0): AmenitiesActions {
        amenitiesPage.getRemoveUploadedImageBtnByName(name, index).click({ force: true }).should("not.exist");
        return this;
    }

    enterAmenitiesValidationInput(name: string, maxValue: number, value: number | string): AmenitiesActions {
        const verifyParam = /^\d+$/.test(`${value}`) ? "have.value" : "not.have.value";
        amenitiesPage.getAmenitiesInput(name).clear().type(`${value}`).blur().should(verifyParam, value);
        if (value > maxValue) {
            cy.contains(`Max value is ${maxValue}`).should("exist");
        }
        return this;
    }

    enterAmenitiesInput(name: string, value: string | number): AmenitiesActions {
        amenitiesPage.getAmenitiesInput(name).clear().type(`${value}`).should("have.value", value);
        return this;
    }
}

export default new AmenitiesActions(amenitiesPage);