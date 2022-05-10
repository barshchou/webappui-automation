import BasePage from "../base/base.page";

class SwotAnalysisPage extends BasePage {

    get includeInReportCheckbox() {return cy.get("[data-qa^=includeInReport] input");}

    get addStrengthsButton() {return cy.get("[data-qa=strengths-container] [data-qa=add-btn]");}

    get addWeaknessesButton() {return cy.get("[data-qa=weaknesses-container] [data-qa=add-btn]");}

    get addOpportunitiesButton() {return cy.get("[data-qa=opportunities-container] [data-qa=add-btn]");}

    get addThreatsButton() {return cy.get("[data-qa=threats-container] [data-qa=add-btn]");}

}

export default new SwotAnalysisPage();