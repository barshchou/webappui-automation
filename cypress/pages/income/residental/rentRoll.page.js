import BasePage from "../../base/base.page";

class InPlaceRentRollPage extends BasePage {
    get numberOfResidentalUnitsField() {return cy.get("*[data-qa='number-of-items-input'] input");}
    get goToPropSummaryButton() {return cy.get("*[title='Go To Property Summary'] > [href$='/property-summary']");}
    get rentRollOptionsField() {return cy.contains("Rent Roll Options");}
    getColumnHeader(columnName) {return cy.xpath(`//*[text()='${columnName}'][@class='colHeader']`);}
    getPerUnitSFRadio(value) {return cy.get(`*[name='perUnitSF'][value='${value}']`);}
    get optionalColumnsElement() {return cy.contains("Optional Columns");}
    getCheckboxByLabel(label) {return cy.get(`*[label="${label}"] input`);}
    get importViaCSVHeader() {return cy.xpath("//p[text()='Import Rent Roll via CSV']");}
    get skipManualRentEntryRow() {return cy.xpath("//p[text()='Skip manual rent roll entry.']");}
    get uploadCSVLink() {return cy.xpath("//a[text()='Upload a CSV file.']");}
    get uploadFileButton() {return cy.xpath("//*[@placeholder='Choose a File']//following::*[@role='presentation']");}
    get uploadFileInput() {return cy.get("*[data-qa='file-input']");}
    get importDataButton() {return cy.get("*[data-qa='import-data-btn']");}
    get isInspectedColumnCells() {return cy.get("*[data-qa^='isInspected']");}
    // TODO: change cells locators after adding data-qa attributes
    get rentTypeCellsWithoutAddColumns() {
        return cy.xpath("//*[contains(@data-qa, 'isInspected')]//following-sibling::td[4]");
    }
    get textAreaToInput() {return cy.get("*[class='handsontableInput']").first();}
}

export default new InPlaceRentRollPage();