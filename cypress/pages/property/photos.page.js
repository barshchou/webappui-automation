import BasePage from "../base/base.page";

class PhotosPage extends BasePage{
    get buildingFacadeUploadInput() {return cy.get("[data-qa='Building Facade'] input");}
    get buildingFacadePhotos() {return cy.get("[data-qa='Building Facade-image-list'] > [data-qa$='-image']");}
}

export default new PhotosPage();