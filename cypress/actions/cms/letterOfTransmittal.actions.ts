import BaseActionsExt from "../base/base.actions.ext";
import letterOfTransmittalPage from "../../pages/cms/letterOfTransmittal.page";
import { BoweryReports } from "../../types/boweryReports.type";

class LetterOfTransmittalActions extends BaseActionsExt<typeof letterOfTransmittalPage> {
    verifyPageTitle(): LetterOfTransmittalActions {
        letterOfTransmittalPage.pageTitle.should('have.text', 'Letter of Transmittal');
        return this;
    }

    updateSectionDiscussion(sectionName: BoweryReports.LetterOfTransmittalSections, 
        text: string, clear = false): LetterOfTransmittalActions {
        this.clickSectionForEdit(sectionName)
            .editSectionDiscussionText(sectionName, text, clear);

        // Get some time to not overlap comment saving with global save
        cy.wait(1000);
        this.saveCmsSettings();
        return this;
    }

    verifyModifiedLabel(sectionName: BoweryReports.LetterOfTransmittalSections): LetterOfTransmittalActions {
        letterOfTransmittalPage.letterOfTransmittalModifiedLabel(sectionName).should('be.visible');
        return this;
    }

    clickSectionForEdit(sectionName: BoweryReports.LetterOfTransmittalSections): 
    LetterOfTransmittalActions {
        letterOfTransmittalPage.letterOfTransmittalDiscussionSection(sectionName).realClick();
        return this;
    }

    editSectionDiscussionText(sectionName: BoweryReports.LetterOfTransmittalSections, 
        text: string, clear = false): LetterOfTransmittalActions {
        if (clear) { 
            this.clickSectionForEdit(sectionName);
            letterOfTransmittalPage.letterOfTransmittalDiscussionSection(sectionName).clear(); 
        }
        letterOfTransmittalPage.letterOfTransmittalDiscussionSection(sectionName)
            .type(text)
            .should('contain.text', text);
        return this;
    }

    saveCmsSettings(): LetterOfTransmittalActions {
        letterOfTransmittalPage.saveButtonGlobal.click();
        letterOfTransmittalPage.successModal.should('be.visible');
        letterOfTransmittalPage.successModal.should('not.be.visible');
        return this;
    }

    verifyLetterOfTransmittalText(sectionName: BoweryReports.LetterOfTransmittalSections, 
        expectedText: string): LetterOfTransmittalActions {
        letterOfTransmittalPage.letterOfTransmittalDiscussionSection(sectionName).invoke('text')
            .should('deep.equal', expectedText);
        return this;
    }

    revertSectionToOriginal(sectionName: BoweryReports.LetterOfTransmittalSections): LetterOfTransmittalActions {
        this.clickSectionForEdit(sectionName);
        letterOfTransmittalPage.letterOfTransmittalDiscussionSection(sectionName).type(`{ESC}`);
        letterOfTransmittalPage.letterOfTransmittalDiscussionSection(sectionName).focus();
        this.Page.formRevertToOriginalBtn().realClick();
        this.Page.formYesRevertBtn.click();
        this.saveCmsSettings();
        return this;
    }
}

export default new LetterOfTransmittalActions(letterOfTransmittalPage);
