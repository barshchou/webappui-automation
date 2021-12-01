import BaseActions from "../base/base.actions";
import clientPage from "../../pages/report/client.page";

class ClientActions extends BaseActions{
    enterClientName(name) {
        clientPage.clientNameField.type(name).type("{enter}").should("have.value", name);
    }
}

export default new ClientActions();