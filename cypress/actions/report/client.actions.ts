import clientPage from "../../pages/report/client.page";
import { replaceEntersWithLineBreak } from "../../../utils/string.utils";
import BaseActionsExt from "../base/base.actions.ext";
import Enums from "../../enums/enums";

class ClientActions extends BaseActionsExt<typeof clientPage> {
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

    clickNarrativeSuggestions(verifyListValue: string, numberLists = 0): ClientActions {
        clientPage.narrativeSuggestionsList.eq(numberLists).contains(verifyListValue).dblclick({ force: true });
        return this;
    }

    verifyNarrativeSuggestions(verifyListValue: string, numberLists = 0): ClientActions {
        clientPage.narrativeSuggestionsList.eq(numberLists)
            .contains(verifyListValue).should("have.text", verifyListValue);
        return this;
    }
}

export default new ClientActions(clientPage);