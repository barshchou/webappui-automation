import ResidentialRentRollSharedPage from "../../shared_components/residentialRentRoll.shared.page";

class InPlaceRentRollPage extends ResidentialRentRollSharedPage {

    get numberOfResidentialUnitsField() {return cy.get("*[data-qa='number-of-items-input'] input");}

    get goToPropSummaryButton() {return cy.get("[aria-label='Go To Property Summary'] [href$='/property-summary']");}

    getColumnHeader(columnName) {return cy.xpath(`//*[text()='${columnName}'][@class='colHeader']`);}

    getPerUnitSFRadio(value) {return cy.get(`*[name='perUnitSF'][value='${value}']`);}

    getPSFRadio(value) {return cy.get(`*[name='unitRentPSFTimePeriod'][value='${value}']`);}

    getCheckboxByLabel(label) {return cy.get(`*[label="${label}"] input`);}

    get importViaCSVHeader() {return cy.xpath("//p[text()='Import Rent Roll via CSV']");}

    get skipManualRentEntryRow() {return cy.xpath("//p[text()='Skip manual rent roll entry.']");}

    get uploadCSVLink() {return cy.xpath("//a[text()='Upload a CSV file.']");}

    get uploadFileButton() {return cy.xpath("//*[@placeholder='Choose a File']//following::*[@role='presentation']");}

    get uploadFileInput() {return cy.get("*[data-qa='file-input']");}

    get importDataButton() {return cy.get("*[data-qa='import-data-btn']");}

    get textAreaToInput() {return cy.get("div:not([class*='hidden']) > *[class='handsontableInput']");}

    get leaseStatusCells() {return cy.get("[data-qa^=leaseStatus]");}

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

    // TODO: Fix locator for this cells after https://bowery.atlassian.net/browse/WEB-5364 bug fix and move methods and elements, related to it to shared components
    get rentSFCell() {return cy.xpath("//*[contains(@class, 'readOnly') and not(contains(@data-qa, 'cell'))]");}

    get rentRoomCell() {return cy.get("[data-qa^='rent/room']");}
}

export default new InPlaceRentRollPage();
