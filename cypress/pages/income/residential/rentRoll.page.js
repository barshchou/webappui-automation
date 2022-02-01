import BasePage from "../../base/base.page";

class InPlaceRentRollPage extends BasePage {
    get numberOfResidentialUnitsField() {return cy.get("*[data-qa='number-of-items-input'] input");}
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
    get rentTypeCells() {return cy.get("[data-qa^=rentType]");}
    get textAreaToInput() {return cy.get("div:not([class*='hidden']) > *[class='handsontableInput']");}
    getIsInspectedCheckboxByRowNumber(number) {return cy.get(`[data-qa^=isInspected-${number}] input`);}
    get unitNumberCells() {return cy.get("[data-qa^='number'][data-qa$=cell]");}
    get roomsCells() {return cy.get("[data-qa^=rooms]");}
    get bedroomsCells() {return cy.get("[data-qa^=bedrooms]");}
    get leaseStatusCells() {return cy.get("[data-qa^=leaseStatus]");}
    get rentForecastCells() {return cy.get("[data-qa^=rentForecast]");}
    get monthlyTotalForecast() {return cy.get("[data-qa='monthlyTotal-rentForecast']");}
    get annualTotalForecast() {return cy.get("[data-qa='annualTotal-rentForecast']");}
    get rentRollCommentary() {return cy.get("[data-qa*='currentRentRollDiscussion.commentary']");}
    get monthlyRentCells() {return cy.get("[data-qa^=rent-][data-qa$=cell]");}
    get closeIcon() {return cy.get("[data-qa=close-icon]");}
    get numberCells() {return cy.get("[data-qa^='#']");}
    get outdoorSpaceCells() {return cy.get("[data-qa^=outdoor][data-qa$=cell]");}
    get tableListboxOptions() {return cy.get("td.listbox");}
}

export default new InPlaceRentRollPage();