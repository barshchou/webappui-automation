import BasePage from "../../base/base.page";

class LaundryPage extends BasePage{
    get noLaundryButton() {return cy.get("[data-qa=no-laundry-room-callout-btn]");}

}

export default new LaundryPage();
