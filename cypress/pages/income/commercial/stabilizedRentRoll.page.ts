import BasePage from "../../base/base.page";

class StabilizedRentRollPage extends BasePage{
    get stabilizedRRPanel(){return cy.get('[id="STICKY_FORM_PANEL_WRAPPER_ID"] + div');}

    get stabilizedRentRollHeaderSection() {return cy.get("*[data-qa='stabilizedRentRoll']");}

    get stabilizedCommercialIncomeTextArea() {return cy.xpath("//*[.='Stabilized Commercial Income Discussion']//following::*[@data-slate-editor][1]");}

    get narrativeSuggestionsList() {return cy.get("[data-qa='narrative-suggestions-list'] > ul");}

}

export default new StabilizedRentRollPage();