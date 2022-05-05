import BasePage from "../../base/base.page";

class CommercialRentRollPage extends BasePage{
    get pageHeader() {return cy.xpath("//h5[text()='In-Place Rent Roll']");}

    get basisOfRentField() {return cy.contains("Basis of Rent");}

    get basisOfRentTooltip() {return cy.get("[aria-label='Select the unit of the provided rent roll.']");}

    get perSquareBasisButton() {return cy.get("button[value='per square foot per year']");}

    get monthlyBasisButton() {return cy.get("button[value='monthly']");}

    get annuallyBasisButton() {return cy.get("button[value='annually']");}

    get perSquareFootPerMonthButton() {return cy.get("button[value='per square foot per month']");}

    get leaseStatusArrows() {return cy.get("[data-qa*='leaseStatus']:not([class*='readOnly']) > div[class*=Arrow]");}

    get isInspectedCheckboxes() {return cy.get("[data-qa*='isInspected']:not([class*='readOnly']) input");}

    get elementToVerifyIsInspected() {return cy.get("[data-qa*='isInspected']:not([class*='readOnly']) span");}

    get unitNumberCells() {return cy.get("*[data-qa*='#']");}

    getAllCellsByRowNumber(rowNumber) {return cy.get(`*[data-qa*='${rowNumber}-cell']`);}

    getLeaseDateCellsByName(name) {return cy.get(`*[data-qa*=lease${name}Date]`);}

    get annualRentPerSFCells() {return cy.get("*[data-qa*=annualRentPsf]");}

    get monthlyRentCells() {return cy.get("*[data-qa*=monthlyRent]:not([data-qa*=Psf])");}

    get monthlyRentPerSFCells() {return cy.get("[data-qa^=monthlyRentPsf]");}

    getLeaseStatusToChooseByValue(status) {return cy.xpath(`//li[.='${status}']`);}

    get editDiscussionButton() {return cy.xpath("//button[.='Edit']");}

    get discussionTextInput() {return cy.get("[role=textbox]");}

    get saveDiscussionChanges() {return cy.xpath("//button[.='Save' and not(contains(@data-qa, 'form-save-btn'))]");}

    get modifiedLabel() {return cy.contains("Modified");}

    get revertToOriginalButton() {return cy.xpath("//button[.='Revert to Original']");}

    get changesLostModalHeader() {return cy.contains("Changes will be lost");}

    get commentaryText() {return cy.get("div[data-slate-editor]");}

    get yesRevertButton() {return cy.contains("Yes, revert");}

    get closeButton() {return cy.get("[aria-label=close]");}

    get cancelRevertButton() {return this.yesRevertButton.prev("button");}

    get cancelDiscussionEdit() {return cy.xpath("//*[.='Current Commercial Income Discussion']//following::button[.='Cancel'][1]");}

    get rentPerSfPerMonthColumnName() {return cy.contains("Rent PSF/Month");}
}

export default new CommercialRentRollPage();
