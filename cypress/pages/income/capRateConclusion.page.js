import BasePage from "../base/base.page";

class CapRateConclusionPage extends BasePage {
    get bandOfInvestmentsCell() {return cy.get("[data-qa=band-of-investments-cell]");}
    get pwcCell() {return cy.get("[data-qa=pwc-cell]");}
    get situsCell() {return cy.get("[data-qa=situs-rerc-cell]");}
    get changeButton() {return cy.get("[data-qa=no-cap-rate-comps-callout-btn] a");}
}

export default new CapRateConclusionPage();