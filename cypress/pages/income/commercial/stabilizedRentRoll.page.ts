import BasePage from "../../base/base.page";

class StabilizedRentRollPage extends BasePage{
    get elementToVerifyIsInspected() {return cy.get("*[data-qa*='isInspected'] span");}

    get stabilizedRRPanel(){return cy.get('[id="STICKY_FORM_PANEL_WRAPPER_ID"] + div');}

    get stabilizedRentRollHeaderSection() {return cy.get("*[data-qa='stabilizedRentRoll']");}

    get tenantNameCells() {return cy.xpath("(//*[contains(@data-qa, 'tenantName')])[position() < last()]");}

    get useCells() {return cy.xpath("(//*[contains(@data-qa, 'use')])[position() < last()]");}

    get sfCells() {return cy.xpath("(//*[contains(@data-qa, 'squareFeet')])[position() < last()]");}

    get annualRentCells() {return cy.xpath("(//*[contains(@data-qa, 'annualRent-')])[position() < last()]");}

    get monthlyRentCells() {return cy.xpath("(//*[contains(@data-qa, 'monthlyRent-')])[position() < last()]");}

    get annualRentPsfCells() {return cy.xpath("//*[contains(@class, 'htNumeric')]|(//*[contains(@data-qa, 'annualRentPsf')])[position() < last()]");}
   
    get textareaToInput() {return cy.get("div:not([class*='hidden']) > *[class='handsontableInput']");}

    get monthlyRentPsfCells() {return cy.xpath("//*[contains(@class, 'htNumeric')]|(//*[contains(@data-qa, 'monthlyRentPsf')])[position() < last()]");}

    get stabilizedCommercialIncomeTextArea() {return cy.xpath("//*[.='Stabilized Commercial Income Discussion']//following::*[@data-slate-editor][1]");}

    get narrativeSuggestionsList() {return cy.get("[data-qa='narrative-suggestions-list'] > ul");}

}

export default new StabilizedRentRollPage();