import clientPage from "../../pages/report/client.page";
import { replaceEntersWithLineBreak } from "../../../utils/string.utils";
import BaseActionsExt from "../base/base.actions.ext";
import { numberWithCommas } from "../../../utils/numbers.utils";

class ClientActions extends BaseActionsExt<typeof clientPage> {
    enterIntendedUser(textToType: string = null, edit = true, save = true, revert = false) {
        if (edit === true) { clientPage.formEditBtn().click(); }
        clientPage.intendedUserTextBox.invoke("text")
            .then(text => {
                clientPage.intendedUserTextBox.focus().type(textToType ?? text);
            });
        if (save === true) { clientPage.formSaveBtn().click(); }
        if (revert === true) {
            clientPage.formRevertToOriginalBtn().click();
            clientPage.formYesRevertBtn.click();
        }
        return this;
    }

    enterIdentificationOfTheClient(textToType: string = null, edit = true, save = true, revert = false) {
        if (edit === true) { clientPage.formEditBtn().click(); }
        clientPage.identificationOfClientTextBox.invoke("text").then(text => {
            clientPage.identificationOfClientTextBox.focus().type(textToType ?? text);
        });
        if (save === true) { clientPage.formSaveBtn().click(); }
        if (revert === true) {
            clientPage.formRevertToOriginalBtn().click();
            clientPage.formYesRevertBtn.click();
        }
        return this;
    }

    verifyInputChangesToBeUnsaved(clientFileNumber: string): ClientActions {
        clientPage.clientFileNumberField.should("have.value", clientFileNumber);
        return this;
    }

    enterClientName(name: string): ClientActions {
        clientPage.clientNameField.clear().type(name).type("{enter}");
        return this;
    }
    
    enterClientFileNumber(name:string): ClientActions {
        clientPage.clientFileNumberField.clear().type(name).should("have.value", name);
        return this;
    }

    enterNycbApplicationNumber(name:string): ClientActions {
        clientPage.nycbApplicationNumber.clear().type(name).should("have.value", name);
        return this;
    }

    clickAddClientButton() {
        clientPage.addClientButton.click();
        return this;
    }

    enterAppraiserCommentary(textToType: string): ClientActions {
        clientPage.appraiserCommentary.clear().type(textToType)
            .should("have.text", replaceEntersWithLineBreak(textToType));
        return this;
    }

    verifyGuidelineTooltip() {
        clientPage.guidelinesTooltip.should("exist");
        clientPage.tooltip.should("not.exist");
        return this;
    }

    clickGuidelinesCommentaryEditButton() {
        clientPage.guidelinesCommentaryEditButton.click();
        return this;
    }

    enterNewCommentary(commentary: string): ClientActions {
        clientPage.guidelinesCommentaryInput.clear().type(commentary).should("have.text", commentary);
        return this;
    }

    clickTextBoxEditButton(index = 0) {
        clientPage.formEditBtn(index).click();
        return this;
    }

    clickTextBoxSaveButton(index = 0) {
        clientPage.formSaveBtn(index).click();
        return this;
    } 

    enterIntendedUserTextBox(textToType: string): ClientActions {
        clientPage.intendedUserTextBox.type(textToType);
        return this;
    }

    enterIdentificationOfTheClientTextBox(textToType: string): ClientActions {
        clientPage.identificationOfClientTextBox.type(textToType);
        return this;
    }

    clickNarrativeSuggestions(verifyListValue: string, numberLists = 0): ClientActions {
        clientPage.narrativeSuggestionsList.eq(numberLists).contains(verifyListValue).dblclick({ force: true });
        return this;
    }

    verifyNarrativeSuggestions(verifyListValue: string, numberLists = 0): ClientActions {
        clientPage.narrativeSuggestionsList.eq(numberLists)
            .contains(verifyListValue).should("have.text", verifyListValue);
        return this;
    }

    verifyIntendedUserTextBox(verifyAreaValue: string | number): ClientActions {
        clientPage.intendedUserTextBox.should("contain.text", `${verifyAreaValue}`);
        return this;
    }

    verifyIdentificationOfTheClientTextBox(verifyAreaValue: string | number): ClientActions {
        clientPage.identificationOfClientTextBox.should("contain.text", `${verifyAreaValue}`);
        return this;
    }

    verifyNotContainIntendedUserTextBox(verifyAreaValue: string): ClientActions {
        clientPage.intendedUserTextBox.should("not.contain.text", verifyAreaValue);
        return this;
    }

    verifyNotContainIdentificationOfTheClientTextBox(verifyAreaValue: string): ClientActions {
        clientPage.identificationOfClientTextBox.should("not.contain.text", verifyAreaValue);
        return this;
    }

    verifyCommentaryContainsText(verifyAreaValue: string | number, commentaryTitle: string): ClientActions { 
        let expectedText = typeof verifyAreaValue ===  "number" 
            ? `${numberWithCommas(verifyAreaValue)}`
            : verifyAreaValue;
        this.Page.commentaryText(commentaryTitle).should("include.text", `${expectedText}`);
        return this;
    }
}

export default new ClientActions(clientPage);