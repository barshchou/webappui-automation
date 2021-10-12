import BasePage from "../../base/base.page";

class StabilizedRentRollPage extends BasePage{
    get elementToVerifyIsInspected() {return cy.get("*[data-qa*='isInspected'] span");}
}

export default new StabilizedRentRollPage();