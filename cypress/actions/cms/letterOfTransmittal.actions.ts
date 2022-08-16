import BaseActionsExt from "../base/base.actions.ext";
import letterOfTransmittalPage from "../../pages/cms/letterOfTransmittal.page";

class LetterOfTransmittalActions extends BaseActionsExt<typeof letterOfTransmittalPage> {
    updateSectionDiscussion(sectionName: string, text: string, clear = false): LetterOfTransmittalActions {
        this.clickSectionForEdit(sectionName)
            .editSectionDiscussionText(sectionName, text, clear);

        // Get some time to not overlap comment saving with global save
        cy.wait(1000);
        this.saveCmsSettings();
        return this;
    }

    verifyModifiedLabel(sectionName: string): LetterOfTransmittalActions {
        letterOfTransmittalPage.letterOfTransmittalModifiedLabel(sectionName).should('be.visible');
        return this;
    }

    clickSectionForEdit(sectionName: string): LetterOfTransmittalActions {
        letterOfTransmittalPage.letterOfTransmittalDiscussionSection(sectionName).scrollIntoView().realClick();
        return this;
    }

    editSectionDiscussionText(sectionName: string, text: string, clear = false): LetterOfTransmittalActions {
        if (clear) { this.clearSectionDiscussionText(sectionName); }
        letterOfTransmittalPage.letterOfTransmittalDiscussionSection(sectionName).type(text);
        this.verifyLetterOfTransmittalText(sectionName, text);
        return this;
    }

    verifyLetterOfTransmittalText(sectionName: string, expectedText: string): LetterOfTransmittalActions {
        letterOfTransmittalPage.letterOfTransmittalDiscussionSection(sectionName).invoke('text')
            .should('deep.equal', expectedText);
        return this;
    }

    clearSectionDiscussionText(sectionName: string): LetterOfTransmittalActions {
        this.clickSectionForEdit(sectionName);
        letterOfTransmittalPage.letterOfTransmittalDiscussionSection(sectionName).clear();
        return this;
    }
}

export default new LetterOfTransmittalActions(letterOfTransmittalPage);
