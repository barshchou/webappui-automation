import BasePage from "../../base/base.page";

class StabilizedRentRollPage extends BasePage{
    get stabilizedRRPanel(){return cy.get('[id="STICKY_FORM_PANEL_WRAPPER_ID"] + div');}

    get stabilizedRentRollHeaderSection() {return cy.get("*[data-qa='stabilizedRentRoll']");}

    get stabilizedCommercialIncomeTextArea() {return cy.xpath("//*[.='Stabilized Commercial Income Discussion']//following::*[@data-slate-editor][1]");}

    get stabilizedRentRollModifiedLabel() {return cy.xpath("//*[@ui='indicator']/span[.='Modified']");}

    get stabilizedCommercialIncomeDiscussionTooltip() {return cy.get("[data-icon=info-circle]");}

}

export default new StabilizedRentRollPage();