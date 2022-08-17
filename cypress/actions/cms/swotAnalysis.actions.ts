import BaseActionsExt from "../base/base.actions.ext";
import swotAnalysisPage from "../../pages/cms/swotAnalysis.page";

class SWOTAnalysisActions extends BaseActionsExt<typeof swotAnalysisPage> {
    verifySWOTInputsArrayText(sectionName: string, expectedText: string[]): 
    SWOTAnalysisActions {
        expectedText.forEach((language, index) => {
            this.verifySWOTInputText(sectionName, language, index);
        });
        
        return this;
    }

    verifySWOTInputText(sectionName: string, expectedText: string, index = 0): 
    SWOTAnalysisActions {
        swotAnalysisPage.swotAnalysisSectionTextArea(sectionName, index).invoke('text')
            .should('deep.equal', expectedText);
        return this;
    }

    updateSectionDiscussion(
        sectionName: string, 
        index: number, 
        text: string, 
        clear = false): SWOTAnalysisActions {
        this.editSectionDiscussionText(sectionName, index, text, clear);
        this.saveCmsSettings();
        return this;
    }

    editSectionDiscussionText(
        sectionName: string, 
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