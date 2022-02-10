import BaseActions from "../base/base.actions";
import clientPage from "../../pages/report/client.page";

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
}

export default new ClientActions();