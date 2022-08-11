import { BoweryReports } from './../../types/boweryReports.type';
import BaseActionsExt from "../base/base.actions.ext";
import swotAnalysisPage from "../../pages/cms/swotAnalysis.page";

class SWOTAnalysisActions extends BaseActionsExt<typeof swotAnalysisPage> {
    verifySWOTInputsText(sectionName: BoweryReports.SWOTAnalysisSections, 
        expectedText: string[]): SWOTAnalysisActions {
        expectedText.forEach((language, index) => {
            swotAnalysisPage.swotAnalysisSectionTextArea(sectionName, index).invoke('text')
                .should('deep.equal', language);
        });
        
        return this;
    }

    updateSectionDiscussion(
        sectionName: BoweryReports.SWOTAnalysisSections, 
        index: number, 
        text: string, 
        clear = false): SWOTAnalysisActions {
        this.editSectionDiscussionText(sectionName, index, text, clear);
        this.saveCmsSettings();
        return this;
    }

    editSectionDiscussionText(
        sectionName: BoweryReports.SWOTAnalysisSections, 
        index: number, 
        text: string, 
        clear = false): SWOTAnalysisActions {
        if (clear) { 
            swotAnalysisPage.swotAnalysisSectionTextArea(sectionName, index).clear({ force: true }).type(text)
                .should('have.value', text);
        } else {
            swotAnalysisPage.swotAnalysisSectionTextArea(sectionName, index).type(text)
                .should('have.value', text);
        }
        return this;
    }
}

export default new SWOTAnalysisActions(swotAnalysisPage);