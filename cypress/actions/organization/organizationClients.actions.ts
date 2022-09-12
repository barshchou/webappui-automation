import organizationClientsPage from "../../pages/organization/organizationClients.page";
import BaseActionsExt from "../base/base.actions.ext";

class OrganizationClientsActions extends BaseActionsExt<typeof organizationClientsPage> {
    deleteClient(fullName: string): OrganizationClientsActions {
        organizationClientsPage.fullName(fullName).contains("Delete").click();
        return this;
    }
}

export default new OrganizationClientsActions(organizationClientsPage);