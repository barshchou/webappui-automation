import BasePage from "../base/base.page";

class CreateCompMapPage extends BasePage {
    get attachFileInput() {return cy.get("[data-qa=formContainer] input");}
    get mapImage() {return cy.get("[data-qa=map-image]");}
}

export default new CreateCompMapPage();