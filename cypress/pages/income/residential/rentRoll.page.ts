import ResidentialRentRollSharedPage from "../../shared_components/residentialRentRoll.shared.page";

class InPlaceRentRollPage extends ResidentialRentRollSharedPage {

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

    get textAreaToInput() {return cy.get("div:not([class*='hidden']) > *[class='handsontableInput']");}

    get rentRollCommentary() {return cy.get("[data-qa*='currentRentRollDiscussion.commentary']");}

    get tableListboxOptions() {return cy.get("td.listbox");}

    get stabilizedRentSFCell() {return cy.get("[data-qa='rentPerSquareFootage-cell']");}

    get rentRollAppraiserCommentary() {return cy.get("[name='currentRentRollDiscussion.additionalCommentary']");}

    infoIcon(index = 1) {return cy.xpath(`//*[text()='Current Rent Roll Discussion']//following::*[@role='presentation'][${index}]`);}

}

export default new InPlaceRentRollPage();
