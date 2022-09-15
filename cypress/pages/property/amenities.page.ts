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

    getUploadImageByName(name: string) { return cy.get(`[data-qa='${name}-image-list'] input`); } 

    getRotateUploadedImageBtnByName(name: string, index = 0) {
        return cy.get(`[data-qa="${name}-image-list"] [data-qa='${index}-image-rotate-btn']`); 
    }

    getRemoveUploadedImageBtnByName(name: string, index = 0) {
        return cy.get(`[data-qa="${name}-image-list"] [data-qa='${index}-image-remove-btn']`); 
    }

    getUploadedImageByName(name: string, index = 0) { 
        return cy.get(`[data-qa="${name}-image-list"] [data-qa='${index}-image'] div div`).eq(0); 
    }

    getAmenitiesInput(name: string) { return cy.get(`[name$='${name}']`); }

    getDoormanRadio(name: string) { return cy.get(`[value='${name}']`); }

    get requiredLabel() { return cy.contains("Required"); }
}

export default new AmenitiesPage();