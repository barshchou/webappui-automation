import organizationClientsPage from "../../pages/organization/organizationClients.page";
import BaseActionsExt from "../base/base.actions.ext";

class OrganizationClientsActions extends BaseActionsExt<typeof organizationClientsPage> {
    deleteClient(fullName: string): OrganizationClientsActions {
        organizationClientsPage.fullName(fullName).contains("Delete").click();
        return this;
    }

    deleteClientIfExists(fullName: string): boolean {
        let result = false;
        cy.get('body').then($body => {
            if ($body.text().includes(fullName)) {
                this.deleteClient(fullName);
            }
        });
        
        return result;
    }
}

export default new OrganizationClientsActions(organizationClientsPage);