import BasePage from "../../base/base.page";

class InPlaceRentRollPage extends BasePage {
    get numberOfResidentalUnitsField() {return cy.get("*[data-qa='number-of-items-input'] input")}
    get goToPropSummaryButton() {return cy.get("*[title='Go To Property Summary'] > [href$='/property-summary']")}
    get rentRollOptionsField() {return cy.contains("Rent Roll Options")}
    get developersForecastCheckbox() {return cy.get(`*[label="Developer's Forecast"] input`)}
    getColumnHeader(columnName) {return cy.xpath(`//*[text()='${columnName}'][@class='colHeader']`)}
    getPerUnitSFRadio(value) {return cy.get(`*[name='perUnitSF'][value='${value}']`)}
    get optionalColumnsElement() {return cy.contains("Optional Columns")}
    get bathroomsCheckbox() {return cy.get("*[label='Bathrooms'] input")}
}

export default new InPlaceRentRollPage()