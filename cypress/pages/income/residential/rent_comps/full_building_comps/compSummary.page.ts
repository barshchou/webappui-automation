import BasePage from "../../../../base/base.page";

class CompSummaryPage extends BasePage {
    get navigationTab() {return cy.get("[path=comp-summary] a");}

    get compSummaryForm() {return cy.get("#compSummary-final-form");}

    get unitMixButton() {return cy.xpath("//button[.='Unit Mix']");}
}

export default new CompSummaryPage();