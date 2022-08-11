import { BoweryReports } from "../../types/boweryReports.type";
import BasePage from "../base/base.page";

class IncomeCapitalizationApproachPage extends BasePage {
    incomeCapitalizationDiscussionSection(sectionName: BoweryReports.IncomeCapitalizationApproachSections) {
        return cy.xpath(`//h6[.='${sectionName}']//following::div[@data-slate-editor][1]`);
    }
}

export default new IncomeCapitalizationApproachPage();