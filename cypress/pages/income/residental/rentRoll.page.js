import BasePage from "../../base/base.page";

class InPlaceRentRollPage extends BasePage {
    get numberOfResidentalUnitsField() {return cy.get("*[data-qa='number-of-items-input'] input")}
    get goToPropSummaryButton() {return cy.get("*[title='Go To Property Summary'] > [href$='/property-summary']")}
    get rentRollOptionsField() {return cy.contains("Rent Roll Options")}
}

export default new InPlaceRentRollPage()