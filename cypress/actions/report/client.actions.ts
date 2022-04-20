import clientPage from "../../pages/report/client.page";
import {replaceEntersWithLineBreak} from "../../../utils/string.utils";
import BaseActionsExt from "../base/base.actions.ext";
import expenseForecastPage from '../../pages/income/expenseForecast.page';

class ClientActions extends BaseActionsExt<typeof expenseForecastPage> {

    verifyInputChangesToBeUnsaved(clientFileNumber: string): ClientActions {
        clientPage.clientFileNumberField.should("have.value",clientFileNumber);
        return this;
    }

    enterClientName(name: string): ClientActions {
        clientPage.clientNameField.type(name).type("{enter}").should("have.value", name);
        return this;
    }
    
    enterClientFileNumber(name:string): ClientActions{
        clientPage.clientFileNumberField.clear().type(name).should("have.value", name);
        return this;
    }

    clickAddClientButton() {
        clientPage.addClientButton.click();
        return this;
    }

    /**
     * @param {string} textToType
     * @returns {ClientActions}
     */
    enterAppraiserCommentary(textToType: string): ClientActions {
        clientPage.appraiserCommentary.clear().type(textToType).should("have.text", replaceEntersWithLineBreak(textToType));
        return this;
    }

    verifyGuidelineTooltip() {
        clientPage.guidelinesTooltip.should("exist");
        clientPage.toCheckTooltipExist.should("not.exist");
        clientPage.guidelinesTooltip.trigger("mouseover");
        clientPage.toCheckTooltipExist.should("exist");
        return this;
    }

    /**
     * @param {string} commentary
     * @returns {ClientActions}
     */
    verifyClientGuidelinesCommentary(commentary: string): ClientActions {
        clientPage.clientGuidelinesCommentary.should("have.text", commentary);
        return this;
    }

    clickGuidelinesCommentaryEditButton() {
        clientPage.guidelinesCommentaryEditButton.click();
        return this;
    }

    /**
     * @param {string} commentary
     * @returns {ClientActions}
     */
    enterNewCommentary(commentary: string): ClientActions {
        clientPage.guidelinesCommentaryInput.clear().type(commentary).should("have.text", commentary);
        return this;
    }

    clickRevertToGeneratedButton() {
        clientPage.revertToGeneratedButton.click();
        return this;
    }

    clickEditIntendedUserButton() {
        clientPage.EditIntendedUserBtn.click();
        return this;
    }

    clickEditIdentificationOfTheClientButton() {
        clientPage.EditIdentificationOfClientBtn.click();
        return this;
    }

    enterIntendedUserTextBox(textToType: string): ClientActions {
        clientPage.IntendedUserTextBox.type(textToType);
        return this;
    }

    enterIdentificationOfTheClientTextBox(textToType: string): ClientActions {
        clientPage.IdentificationOfClientTextBox.type(textToType);
        return this;
    }

  
    clickNarrativeSuggestions(verifyListValue: string, numberLists = 0): ClientActions {
        clientPage.narrativeSuggestionsList.eq(numberLists).contains(verifyListValue).click();
        return this;
    }

    
    verifyIntendedUserTextBox(verifyAreaValue: string): ClientActions {
        clientPage.IntendedUserTextBox.should("contain.text", verifyAreaValue);
        return this;
    }

    verifyIdentificationOfTheClientTextBox(verifyAreaValue: string): ClientActions {
        clientPage.IdentificationOfClientTextBox.should("contain.text", verifyAreaValue);
        return this;
    }
}

export default new ClientActions(expenseForecastPage);