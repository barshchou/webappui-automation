import BasePage from "../../base/base.page";

class InPlaceRentRollPage extends BasePage {
    get numberOfResidentialUnitsField() {return cy.get("*[data-qa='number-of-items-input'] input");}

    get goToPropSummaryButton() {return cy.get("[aria-label='Go To Property Summary'] [href$='/property-summary']");}

    getColumnHeader(columnName) {return cy.xpath(`//*[text()='${columnName}'][@class='colHeader']`);}

    getPerUnitSFRadio(value) {return cy.get(`*[name='perUnitSF'][value='${value}']`);}

    getPSFRadio(value) {return cy.get(`*[name='unitRentPSFTimePeriod'][value='${value}']`);}

    getCheckboxByLabel(label) {return cy.get(`*[label="${label}"] input`);}

    radioButtonLabelByText(labelText) {return cy.xpath(`//label[text()="${labelText}"]`);}

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

    get monthlyTotalForecast() {return cy.get("[data-qa='monthlyTotal-rent']");}

    get annualTotalForecast() {return cy.get("[data-qa='annualTotal-rent']");}

    get monthlyTotalRent() {return cy.get("[data-qa='monthlyTotal-rent']");}

    get annualTotalRent() {return cy.get("[data-qa='annualTotal-rent']");}

    get rentRollCommentary() {return cy.get("[data-qa*='currentRentRollDiscussion.commentary']");}

    get monthlyRentCells() {return cy.get("[data-qa^=rent-][data-qa$=cell]");}

    get closeIcon() {return cy.get("[data-qa=close-icon]");}

    get numberCells() {return cy.get("[data-qa^='#']");}

    get outdoorSpaceCells() {return cy.get("[data-qa^=outdoor][data-qa$=cell]");}

    get tableListboxOptions() {return cy.get("td.listbox");}

    get squareFootageCells() {return cy.get("[data-qa^=squareFootage][data-qa$=cell]");}

    get bathroomsCells() {return cy.get("[data-qa^=bathrooms][data-qa$=cell]");}

    get unitTypeCells() {return cy.get("[data-qa^=unitLayout][data-qa$=cell]");}

    get rentSFCell() {return cy.xpath("//*[contains(@class, 'readOnly') and not(contains(@data-qa, 'cell'))]");}

    get rentRoomCell() {return cy.get("[data-qa^='rent/room']");}
}

export default new InPlaceRentRollPage();
