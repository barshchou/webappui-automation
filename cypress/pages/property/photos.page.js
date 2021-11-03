import BasePage from "../base/base.page";

class PhotosPage extends BasePage{
    get buildingFacadeUploadInput() {return cy.get("[data-qa='Building Facade'] input");}
    get buildingFacadePhotos() {return cy.get("[data-qa='Building Facade-image-list'] > [data-qa$='-image']");}
    get subjectStreetUploadInput() {return cy.get("[data-qa='Subject Street'] input");}
    get subjectStreetPhotos() {return cy.get("[data-qa='Subject Street-image-list'] > [data-qa$='-image']");}
    get exteriorEntranceUploadInput() {return cy.get("[data-qa='Exterior Entrance'] input");}
    get exteriorEntrancePhotos() {return cy.get("[data-qa='Exterior Entrance-image-list'] > [data-qa$='-image']");}
    get typicalStairwayUploadInput() {return cy.get("[data-qa='Typical Stairway'] input");}
    get typicalStairwayPhotos() {return cy.get("[data-qa='Typical Stairway-image-list'] > [data-qa$='-image']");}
}

export default new PhotosPage();