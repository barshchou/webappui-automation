import BasePage from "../../base/base.page";

class InPlaceRentRollPage extends BasePage {
    get numberOfResidentalUnitsField() {return cy.get("*[data-qa='number-of-items-input'] input")}
    get goToPropSummaryButton() {return cy.get("*[title='Go To Property Summary'] > [href$='/property-summary']")}
    get rentRollOptionsField() {return cy.contains("Rent Roll Options")}
    getColumnHeader(columnName) {return cy.xpath(`//*[text()='${columnName}'][@class='colHeader']`)}
    getPerUnitSFRadio(value) {return cy.get(`*[name='perUnitSF'][value='${value}']`)}
    get optionalColumnsElement() {return cy.contains("Optional Columns")}
    getCheckboxByLabel(label) {return cy.get(`*[label="${label}"] input`)}
}

export default new InPlaceRentRollPage()