import organizationUsersPage from "../../pages/organization/organizationUsers.page";
import BaseActionsExt from "../base/base.actions.ext";

class OrganizationUsersActions extends BaseActionsExt<typeof organizationUsersPage>{
    deleteUser(fullName: string): OrganizationUsersActions {
        organizationUsersPage.fullName(fullName).contains("Delete").click();
        organizationUsersPage.confirmDelete.click();
        organizationUsersPage.successModal.should('be.visible');
        organizationUsersPage.successModalCloseButton.click();
        return this;
    }

    verifyUserEditButton(name: string): OrganizationUsersActions {
        organizationUsersPage.editButton(name).should('be.enabled');
        return this;
    }

    clickUserEditButton(name: string): OrganizationUsersActions {
        organizationUsersPage.editButton(name).click();
        return this;
    }

    clickEditUser(name: string): OrganizationUsersActions {
        this.verifyUserEditButton(name)
            .clickUserEditButton(name);
        
        return this;
    }
}

export default new OrganizationUsersActions(organizationUsersPage);