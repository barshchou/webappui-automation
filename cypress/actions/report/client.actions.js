import BaseActions from "../base/base.actions";
import clientPage from "../../pages/report/client.page";
import {replaceEntersWithLineBreak} from "../../../utils/string.utils";

class ClientActions extends BaseActions{
    /**
     * @param {string} name
     * @returns {ClientActions}
     */
    enterClientName(name) {
        clientPage.clientNameField.type(name).type("{enter}").should("have.value", name);
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
    enterAppraiserCommentary(textToType) {
        clientPage.appraiserCommentary.clear().type(textToType).should("have.text", replaceEntersWithLineBreak(textToType));
        return this;
    }

    verifyGuidelineTooltip() {
        clientPage.guidelinesTooltip.should("exist");
        clientPage.guidelinesTooltip.trigger("mouseover");
        clientPage.guidelinesTooltip.should("not.exist");
        return this;
    }

    /**
     * @param {string} commentary
     * @returns {ClientActions}
     */
    verifyClientGuidelinesCommentary(commentary) {
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
    enterNewCommentary(commentary) {
        clientPage.guidelinesCommentaryInput.clear().type(commentary).should("have.text", commentary);
        return this;
    }

    clickRevertToGeneratedButton() {
        clientPage.revertToGeneratedButton.click();
        return this;
    }
}

export default new ClientActions();