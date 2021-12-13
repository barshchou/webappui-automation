import BasePage from "../base/base.page";

class CreateCompMapPage extends BasePage {
    get openWizardButton() {return cy.get("[data-qa=open-btn]");}
    get zoomInButton() {return cy.get("[aria-label='Zoom in']");}
    get captureScreenButton() {return cy.get("[data-qa=subject-and-comp-map-capture-screen-btn]");}
    get mapImage() {return cy.get("[data-qa=map-image]");}
}

export default new CreateCompMapPage();