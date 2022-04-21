import BasePage from "../../base/base.page";

class StabilizedRentRollPage extends BasePage{
    get elementToVerifyIsInspected() {return cy.get("*[data-qa*='isInspected'] span");}

    get stabelizedRRPanel(){
        return cy.get('[id="STICKY_FORM_PANEL_WRAPPER_ID"] + div');
    }

    get stabilizedRentRollheaderSection() {return cy.get("*[data-qa='stabilizedRentRoll']");}

    get leaseStatusCells() {return cy.get("[data-qa^=leaseStatus].htAutocomplete");}

    get tenantNameCells() {return cy.xpath("(//*[contains(@data-qa, 'tenantName')])[position() < last()]");}

    get useCells() {return cy.xpath("(//*[contains(@data-qa, 'use')])[position() < last()]");}

    get sfCells() {return cy.xpath("(//*[contains(@data-qa, 'squareFeet')])[position() < last()]");}

    get annualRentCells() {return cy.xpath("(//*[contains(@data-qa, 'annualRent-')])[position() < last()]");}

    get monthlyRentCells() {return cy.xpath("(//*[contains(@data-qa, 'monthlyRent-')])[position() < last()]");}

    get annualRentPsfCells() {return cy.xpath("//*[contains(@class, 'htNumeric')]|(//*[contains(@data-qa, 'annualRentPsf')])[position() < last()]");}
   
    get annualRentPsfCellsScroll() {return cy.contains("Rent/SF").scrollIntoView();}     

    get annualRentPsfCellsInputField() {return cy.get('textarea.handsontableInput').scrollIntoView();}

    get monthlyRentPsfCells() {return cy.xpath("//*[contains(@class, 'htNumeric')]|(//*[contains(@data-qa, 'monthlyRentPsf')])[position() < last()]");}
  
}

export default new StabilizedRentRollPage();