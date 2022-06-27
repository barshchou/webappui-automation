import { loginAction } from '../../../../actions/base/baseTest.actions';
import { Organization } from '../../../../actions/index';
import { _NavigationSection } from '../../../../actions/base/index';
import testData from "../../../../fixtures/not_full_reports/organizations/QA-5355-58.fixture";
import enums from '../../../../enums/enums';

describe("Verify users roles to create new clients", 
    { tags:[ "@permissions_roles, @client", "@organizations" ] }, () => {

    before('Prepare test data', () => {
        cy.stepInfo('Precondition: Create test user');
        loginAction(testData.adminUsername, testData.adminPassword);
        _NavigationSection.navigateToProfileOrganization(enums.MENU_LINKS.organization);
        Organization._OrganizationActions.openCreateNewUserPage();
        Organization._CreateNewUser.createNewUser(testData.clientCreationData);
    });

    it.only("[QA-5355]", () => {
        cy.stepInfo('1. Navigate to Organization Users page');
        Organization._OrganizationActions.openOrganizationUsersPage();
        Organization._OrganizationUsersActions.clickEditUser(testData.userToFind);
        Organization._OrganizationEditUserActions.editUserLastName(testData.userUpdatedLastName)
            .editUserFirstName(testData.userUpdatedFirstName)
            .editUserRole(testData.roleName, testData.updatedRoleName)
            .verifySuccessModal()
            .closeSuccessModal();
        
        cy.stepInfo('4. Delete test user');
        Organization._OrganizationActions.openOrganizationUsersPage();
        Organization._OrganizationUsersActions.deleteUser(testData.updateUserToFind);
    });
});