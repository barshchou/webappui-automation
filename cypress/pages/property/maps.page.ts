import BasePage from "../base/base.page";

class MapsPage extends BasePage{
    get propertyFrontage() {return cy.get("*[name=propertyFrontage]");}

    get zoningMapUploadInput() {return cy.get("*[data-qa='zoning-map-wizard'] input");}

    get zoningMapImageToCheck() {return cy.get("[data-qa='zoning-map-wizard'] [data-qa='map-image']");}

    get floodMapUploadInput() {return cy.get("[data-qa='flood-map-wizard'] input[accept]");}

    get floodMapImageToCheck() {return cy.get("[data-qa='flood-map-wizard'] [data-qa='map-image']");}

    get cornerRadios() {return cy.get("[name='corner']");}

    get taxMapUploadInput() {return cy.get("[data-qa='tax-map-wizard'] input[accept]");}

    get taxMapImageToCheck() {return cy.get("[data-qa='tax-map-wizard'] [data-qa='map-image']");}

    get subjectMapOpenWizardButton() {return cy.get("[data-qa='subject-map-wizard'] [data-qa='open-btn']");}

    get subjectMapCaptureScreenButton() {return cy.get("[data-qa='subject-map-capture-screen-btn']");}

    get subjectMapImageToCheck() {return cy.get("[data-qa='subject-map-wizard'] [data-qa='map-image']");}

    get subjectMapImage() {return cy.get("#subjectMapImage");}
}

export default new MapsPage();