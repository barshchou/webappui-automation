import swotAnalysisPage from "../../pages/final/swotAnalysis.page";
import { _saveDataInFile } from "../../support/commands";
import BaseActionsExt from "../base/base.actions.ext";
import { normalizeText } from "../../../utils/string.utils";

class SwotAnalysisActions extends BaseActionsExt<typeof swotAnalysisPage> {
    
    uncheckIncludeInReportCheckbox(): SwotAnalysisActions {
        swotAnalysisPage.includeInReportCheckbox.uncheck().should("have.value", "false");
        swotAnalysisPage.addThreatsButton.should("be.disabled");
        swotAnalysisPage.addOpportunitiesButton.should("be.disabled");
        swotAnalysisPage.addStrengthsButton.should("be.disabled");
        swotAnalysisPage.addWeaknessesButton.should("be.disabled");
        return this;
    }

    /**
     * Get initial text and verify that text equals texts on the page. 
     * Write file with texts from page
     * @param sectionName Name section with text
     * @param textToBe String array with initial text
     * @param fileName File name to write file
     */
    verifyTextSection(
        sectionName: string, 
        textToBe: Array<string>, 
        fileName = "section-text.txt"): SwotAnalysisActions {
        swotAnalysisPage.getSectionTexts(sectionName).then($textarea => {
            const sectionTexts =  $textarea.toArray().map(el => normalizeText(el.innerHTML));
            expect(textToBe).to.deep.eq(sectionTexts);
            _saveDataInFile(sectionTexts, fileName);
        });
        return this;
    }

    /**
     * Type some value in text section then verify that changes apply
     * @param sectionName Name section with text
     * @param typeValue Value to type
     */
    verifyTextCanBeChanged(sectionName: string, typeValue: string): SwotAnalysisActions {
        swotAnalysisPage.getSectionTexts(sectionName).then($textarea => {
            $textarea.toArray().forEach(el => {
                cy.wrap(el).type(typeValue);
            });
            this.clickSaveButton();
        });

        swotAnalysisPage.getSectionTexts(sectionName).then($textarea => {
            const sectionTexts = $textarea.toArray().map(el => el.innerHTML);
            sectionTexts.forEach(el => {
                expect(el).to.contain(typeValue);
            });
        });
        return this;
    }
}

export default new SwotAnalysisActions(swotAnalysisPage);