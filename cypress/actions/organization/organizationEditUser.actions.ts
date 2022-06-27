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
        this.saveChanges();
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

    verifySuccessModal(): OrganizationEditUserActions {
        organizationEditUserPage.successModal.should("be.visible");
        return this;
    }

    closeSuccessModal(): OrganizationEditUserActions {
        organizationEditUserPage.successModalCloseButton.click();
        return this;
    }
}


export default new OrganizationEditUserActions(organizationEditUserPage);