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
}

export default new ClientActions();