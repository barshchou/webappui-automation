import BasePage from "../base/base.page";

class PropertySummaryPage extends BasePage {
    get headerSection() {return cy.get("*[data-qa='summary']")}
    get numberOfUnitsInput() {return cy.get("*[name='residentialUnitCount']")}
}

export default new PropertySummaryPage()