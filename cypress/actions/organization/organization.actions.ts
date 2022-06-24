
import organizationPage from "../../pages/organization/organization.page";
import BaseActionsExt from "../base/base.actions.ext";

class OrganizationActions extends BaseActionsExt<typeof organizationPage>{

    openCreateNewClientPage(): OrganizationActions {
        this.Page.createNewClient.click();
        return this;
    }

    openCreateNewUserPage(): OrganizationActions {
        this.Page.createNewUser.click();
        return this;
    }

    openOrganizationClientsPage(): OrganizationActions {
        this.Page.createNewUser.click();
        return this;
    }
}

export default new OrganizationActions(organizationPage);