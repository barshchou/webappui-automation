import BasePage from "../base/base.page";

class IncomeCapitalizationApproachPage extends BasePage {
    incomeCapitalizationDiscussionSection(sectionName: string) {
        return cy.xpath(`//h6[.='${sectionName}']//following::div[@data-slate-editor][1]`);
    }

    incomeCapitalizationModifiedLabel(sectionName: string) {
        return cy.xpath(`//h6[.='${sectionName}']/following::*[@ui='indicator'][1]`);
    }
}

export default new IncomeCapitalizationApproachPage();