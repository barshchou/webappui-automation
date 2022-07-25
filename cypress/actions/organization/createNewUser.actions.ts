import createNewUserPage from "../../pages/organization/createNewUser.page";
import { BoweryAutomation } from "../../types/boweryAutomation.type";
import BaseActionsExt from "../base/base.actions.ext";
import { BoweryReports } from "../../types/boweryReports.type";

class CreateNewUserActions extends BaseActionsExt<typeof createNewUserPage>{
    selectUserPrefix(prefix: BoweryReports.OrganizationAddresseePrefix): CreateNewUserActions {
        createNewUserPage.userPrefixField.click();
        createNewUserPage.prefixSelectOption(prefix).click();
        return this;
    }

    selectUserRole(roles: BoweryAutomation.OrganizationRoles[]): CreateNewUserActions {
        createNewUserPage.roleNameField.click();
        roles.forEach(role => {
            createNewUserPage.selectRoleOption(role).click();    
        });
        createNewUserPage.roleNameField.realClick();
        return this;
    }

    enterUsername(username: string): CreateNewUserActions {
        createNewUserPage.usernameField.type("some placeholder text").clear()
            .type(username).should("have.value", username);
        return this;
    }

    enterFirstName(firstName: string): CreateNewUserActions {
        createNewUserPage.firstNameField.type(firstName).should("have.value", firstName);
        return this;
    }

    enterLastName(lastName: string): CreateNewUserActions {
        createNewUserPage.lastNameField.type(lastName).should("have.value", lastName);
        return this;
    }

    clickSaveFormButton(): CreateNewUserActions {
        createNewUserPage.saveFormButton.should("be.enabled").click();
        return this;
    }

    verifySuccessModal(): CreateNewUserActions {
        createNewUserPage.successModal.should("be.visible");
        return this;
    }

    closeSuccessModal(): CreateNewUserActions {
        createNewUserPage.successModalCloseButton.click();
        return this;
    }

    createNewUser(data: BoweryAutomation.OrganizationCreateNewUserData): CreateNewUserActions {
        this.enterUsername(data.username)
            .enterFirstName(data.firstName)
            .enterLastName(data.lastName)
            .selectUserPrefix(data.prefix)
            .selectUserRole(data.roleName)
            .clickSaveFormButton()
            .verifyProgressBarNotExist()
            .verifySuccessModal()
            .closeSuccessModal();
        return this;
    }
}

export default new CreateNewUserActions(createNewUserPage);
