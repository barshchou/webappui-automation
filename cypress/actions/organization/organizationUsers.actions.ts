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
}

export default new OrganizationUsersActions(organizationUsersPage);