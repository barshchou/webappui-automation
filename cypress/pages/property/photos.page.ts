import BasePage from "../base/base.page";

class PhotosPage extends BasePage {
    getUploadInputByName(name: string) { return cy.get(`[data-qa='${name}'] input`); }

    getUploadedPhotosByName(name: string) { return cy.get(`[data-qa='${name}-image-list'] > [data-qa$='-image']`); }

    getSectionNameEditButtonByName(name: string) { return cy.xpath(`//h6[.='${name}']//following-sibling::button`); }

    getCurrentEditInputBySectionName(name: string) { return cy.get(`input[value='${name}']`); }

    get editSectionSave() { return cy.xpath("//button[.='SAVE']"); }
}

export default new PhotosPage();