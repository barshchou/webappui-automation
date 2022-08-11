import { ContentManagementSystem } from "../../types/boweryReports.type";
import BasePage from "../base/base.page";

class SWOTAnalysisPage extends BasePage {
    swotAnalysisSectionTextArea(sectionName: ContentManagementSystem.SWOTAnalysisSections, index = 0) {
        return cy.get(`[name='swotAnalysis.${sectionName}[${index}]']`);
    }
}

export default new SWOTAnalysisPage();