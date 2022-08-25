import { BoweryReports } from "../../types/boweryReports.type";
import BasePage from "../base/base.page";

class AmenitiesPage extends BasePage {
    get hasParkingCheckbox() { return cy.get("*[data-qa='building.hasParking'] input"); }

    get parkingSpacesNumberField() { return cy.get("*[name='building.parkingSpaceCount']"); }

    get parkingErrorMessage() { return cy.contains("Max value is 2500"); }

    get hasNoUnitAmenitiesCheckbox() { return cy.get("*[data-qa^='hasNoUnitAmenities'] input"); }

    get hasNoBuildingAmenitiesCheckbox() { return cy.get("*[data-qa^='hasNoAmenities'] input"); }

    get laundryCheckbox() { return cy.get("[data-qa^='building.hasLaundryRoom'] input"); }

    get storageCheckbox() { return cy.get("[data-qa^='building.hasStorageUnits'] input"); }

    get otherUnitAmenitiesCheckbox() { return cy.get("[data-qa^='unit.hasOtherUnitAmenity'] input"); }

    get storageUnitsTextField() { return cy.get("[name='building.storageUnitCount']"); }

    getElementCheckbox(name: BoweryReports.AmenitiesCheckboxes) { return cy.get(`[data-qa^='${name}'] input`); }

    get laundryRoomUpload() { return cy.get("[data-qa='laundryRoom-image-list'] input"); } 

    getLaundryUploadedImageBtn(name = "rotate", index = 0) { return cy.get(`[data-qa='${index}-image-${name}-btn']`); }

    getLaundryUploadedImage(index = 0) { return cy.get(`[data-qa='${index}-image'] div div`).eq(0); }

    get storageInput() { return cy.get("[name$='storageUnitCount']"); }
}

export default new AmenitiesPage();