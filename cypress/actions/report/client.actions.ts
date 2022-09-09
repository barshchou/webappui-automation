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

    verifyInputChangesToBeUnsaved(clientFileNumber: string, index = 0): ClientActions {
        clientPage.getClientFileNumberField(index).should("have.value", clientFileNumber);
        return this;
    }

    enterClientName(name: string, index = 0): ClientActions {
        clientPage.getClientNameField(index).clear().type(name).type("{enter}");
        clientPage.getClientNameField(index).should("have.value", name);
        return this;
    }
    
    enterClientFileNumber(name:string, index = 0): ClientActions {
        clientPage.getClientFileNumberField(index).clear().type(name).should("have.value", name);
        clientPage.getClientFileNumberField(index).should("have.value", name);
        return this;
    }

    enterNycbApplicationNumber(name:string, index = 0): ClientActions {
        clientPage.getNYCBApplicationNumber(index).clear().type(name).should("have.value", name);
        clientPage.getNYCBApplicationNumber(index).should("have.value", name);
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
        clientPage.guidelinesTooltip.trigger("mouseover");
        clientPage.tooltip.should("exist");
        return this;
    }

    verifyClientGuidelinesCommentary(commentary: string): ClientActions {
        clientPage.clientGuidelinesCommentary.should("have.text", commentary);
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

    clickAddAdditionalClientBtn(): ClientActions {
        clientPage.addAdditionalClientBtn.click({ force: true });
        return this;
    }

    verifyAdditionalClientAdded(clientIndex = 1): ClientActions {
        clientPage.getClientNameField(clientIndex).should("exist");
        clientPage.getClientFileNumberField(clientIndex).should("exist");
        clientPage.getNYCBApplicationNumber(clientIndex).should("exist");
        return this;
    }

    clickRemoveAdditionalClientBtn(index = 0): ClientActions {
        clientPage.getRemoveIcon(index).click();
        return this;
    }

    verifyAdditionalClientRemoved(clientIndex = 1, undoIndex = 0): ClientActions {
        clientPage.undoBtn.eq(undoIndex).should("exist");
        // Wait when remove additional client
        cy.wait(4000);
        clientPage.getClientFileNumberField(clientIndex).should("not.exist");
        clientPage.getNYCBApplicationNumber(clientIndex).should("not.exist");
        return this;
    }

    clickUndoBtn(index = 0): ClientActions {
        clientPage.undoBtn.eq(index).click();
        return this;
    }

    verifyAdditionalClientEnableOrNot(clientIndex = 1, isEnable = true): ClientActions {
        const matcher = isEnable ? "be.enabled" : "be.disabled";
        clientPage.getClientNameField(clientIndex).should(matcher);
        clientPage.getClientFileNumberField(clientIndex).should(matcher);
        clientPage.getNYCBApplicationNumber(clientIndex).should(matcher);
        return this;
    }

    clickAddNewClient(): ClientActions {
        clientPage.addNewClient.click();
        return this;
    }
}

export default new ClientActions(clientPage);