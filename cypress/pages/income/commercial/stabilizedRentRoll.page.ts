import CommercialRentRollSharedComponentPage from "../../shared_components/commercialRentRoll.shared.page";

class StabilizedRentRollPage extends CommercialRentRollSharedComponentPage {

    get stabilizedRRPanel(){return cy.get('[id="STICKY_FORM_PANEL_WRAPPER_ID"] + div');}

    get stabilizedRentRollHeaderSection() {return cy.get("*[data-qa='stabilizedRentRoll']");}

    get autoFillButton() {return cy.get(`[data-qa=autofill-button]`);}

    get stabilizedCommercialIncomeDiscussion() { return cy.get(`[data-slate-editor]`); }
}

export default new StabilizedRentRollPage();