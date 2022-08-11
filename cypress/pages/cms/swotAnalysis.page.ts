import { BoweryReports } from "../../types/boweryReports.type";
import BasePage from "../base/base.page";

class SWOTAnalysisPage extends BasePage {
    swotAnalysisSectionTextArea(sectionName: BoweryReports.SWOTAnalysisSections, index = 0) {
        return cy.get(`[name='swotAnalysis.${sectionName}[${index}]']`);
    }
}

export default new SWOTAnalysisPage();