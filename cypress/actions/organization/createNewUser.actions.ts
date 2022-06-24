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

    selectUserRole(role: BoweryAutomation.OrganizationRoles): CreateNewUserActions {
        createNewUserPage.roleNameField.click();
        createNewUserPage.selectRoleOption(role).click;
        return this;
    }

    enterUsername(username: string): CreateNewUserActions {
        createNewUserPage.usernameField.type(username).should("have.value", username);
        return this;
    }

    enterFirstName(firstName: string): CreateNewUserActions {
        createNewUserPage.usernameField.type(firstName).should("have.value", firstName);
        return this;
    }

    enterLastName(lastName: string): CreateNewUserActions {
        createNewUserPage.usernameField.type(lastName).should("have.value", lastName);
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

    createNewUser(data: BoweryAutomation.OrganizationCreateNewUserData): CreateNewUserActions {
        this.selectUserRole(data.roleName)
            .enterUsername(data.username)
            .enterFirstName(data.firstName)
            .enterLastName(data.lastName)
            .clickSaveFormButton()
            .verifyProgressBarNotExist()
            .verifySuccessModal();
        return this;
    }
}

export default new CreateNewUserActions(createNewUserPage);