import BasePage from "../base/base.page";

class AmenitiesPage extends BasePage{
    get hasParkingCheckbox() {return cy.get("*[data-qa='building.hasParking'] input");}
    get parkingSpacesNumberField() {return cy.get("*[name='building.parkingSpaceCount']");}
    get parkingErrorMessage() {return cy.contains("Max value is 2500");}
    get hasNoUnitAmenitiesCheckbox() {return cy.get("*[data-qa='hasNoUnitAmenities'] input");}
}

export default new AmenitiesPage();