import organizationUsersPage from "../../pages/organization/organizationUsers.page";
import BaseActionsExt from "../base/base.actions.ext";

class OrganizationUsersActions extends BaseActionsExt<typeof organizationUsersPage> {
    deleteUser(fullName: string): OrganizationUsersActions {
        organizationUsersPage.getFullName(fullName).contains("Delete").click();
        organizationUsersPage.confirmDelete.click();
        organizationUsersPage.successModal.should('be.visible');
        organizationUsersPage.successModalCloseButton.click();
        return this;
    }

    verifyUserEditButton(name: string, enabled = true): OrganizationUsersActions {
        enabled ? organizationUsersPage.editButton(name).should('exist') :
            organizationUsersPage.editButton(name).should('not.exist');
        return this;
    }

    verifyEditButtonsNotDisplayed(): OrganizationUsersActions {
        organizationUsersPage.editButtonAny.should('not.exist');
        return this;
    }

    clickUserEditButton(name: string): OrganizationUsersActions {
        organizationUsersPage.editButton(name).click();
        return this;
    }

    clickEditUser(name: string, enabled = true): OrganizationUsersActions {
        this.verifyUserEditButton(name, enabled)
            .clickUserEditButton(name);
        
        return this;
    }
}

export default new OrganizationUsersActions(organizationUsersPage);