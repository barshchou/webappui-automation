import organizationEditUserPage from "../../pages/organization/organizationEditUser.page";
import { BoweryAutomation } from "../../types/boweryAutomation.type";
import BaseActionsExt from "../base/base.actions.ext";

class OrganizationEditUserActions extends BaseActionsExt<typeof organizationEditUserPage>{
    
    editUserLastName(lastName: string): OrganizationEditUserActions {
        organizationEditUserPage.lastNameTextField.clear().type(lastName).should('have.value', lastName);
        return this;
    }

    editUserFirstName(firstName: string): OrganizationEditUserActions {
        organizationEditUserPage.firstNameTextField.clear().type(firstName).should('have.value', firstName);
        return this;
    }

    editUserRole(initialRole: BoweryAutomation.OrganizationRoles[], roles: BoweryAutomation.OrganizationRoles[]): OrganizationEditUserActions {
        organizationEditUserPage.roleNameField.click();
        this.rolesCleanUp(initialRole);
        roles.forEach(role => {
            organizationEditUserPage.selectRoleOption(role).click();
        });
        organizationEditUserPage.selectRoleOption(roles[0]).type('{esc}');
        return this;
    }

    saveChanges(): OrganizationEditUserActions {
        organizationEditUserPage.saveButton.click();
        return this;
    }

    rolesCleanUp(initialRole: BoweryAutomation.OrganizationRoles[]): OrganizationEditUserActions {
        initialRole.forEach(role => {
            organizationEditUserPage.selectRoleOption(role).click();
        });
        return this;
    }

    verifyModal(success = true): OrganizationEditUserActions {
        organizationEditUserPage.resultModal(success).should("be.visible"); 
        return this;
    }

    closeModal(success = true): OrganizationEditUserActions {
        organizationEditUserPage.resultModalCloseButton(success).click();
        return this;
    }

    verifySaveChanges(success = true): OrganizationEditUserActions {
        this.saveChanges()
            .verifyModal(success)
            .closeModal(success);
        return this;
    }
}


export default new OrganizationEditUserActions(organizationEditUserPage);