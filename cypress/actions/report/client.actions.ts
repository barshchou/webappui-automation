import clientPage from "../../pages/report/client.page";
import {replaceEntersWithLineBreak} from "../../../utils/string.utils";
import BaseActionsExt from "../base/base.actions.ext";

class ClientActions extends BaseActionsExt<typeof clientPage>{

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

    clickRevertToGeneratedButton() {
        clientPage.revertToGeneratedButton.click();
        return this;
    }
}

export default new ClientActions(clientPage);