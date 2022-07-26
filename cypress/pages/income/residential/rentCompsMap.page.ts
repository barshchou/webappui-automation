import BasePage from "../../base/base.page";

class RentCompsMapPage extends BasePage {
    get mapImageInput() { return cy.get("[id$='residentialRentCompsMap-final-form'] input"); }

    get mapImage() { return cy.get("[data-qa='map-image']"); }
}

export default new RentCompsMapPage();