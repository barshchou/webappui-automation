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

    it("[QA-5355]", () => {
        cy.stepInfo('1. Navigate to Organization Users page');
        Organization._OrganizationActions.openOrganizationUsersPage();

        cy.stepInfo(`2. Verify that there are 'Edit' buttons in 'Actions' column opposite each user ->
                    Click 'Edit' button on any user -> Edit that user and save ->
                    Verify that User edited and saved`);
        Organization._OrganizationUsersActions.clickEditUser(testData.userToFind);
        Organization._OrganizationEditUserActions.editUserLastName(testData.userUpdatedLastName)
            .editUserFirstName(testData.userUpdatedFirstName)
            .editUserRole(testData.roleName, testData.updatedRoleName)
            .saveChanges()
            .verifyModal()
            .closeModal();
        Organization._OrganizationUsersActions.clickEditUser(testData.updateUserToFind);
    });

    it("[QA-5356]", () => {
        cy.stepInfo('Precondition: Log in as Lead Appraiser user');
        loginAction(testData.leadAppraiserUsername, testData.leadAppraiserPassword);
        _NavigationSection.navigateToProfileOrganization(enums.MENU_LINKS.organization);

        cy.stepInfo('1. Navigate to Organization Users page');
        Organization._OrganizationActions.openOrganizationUsersPage();

        cy.stepInfo(`2. Verify that there are 'Edit' buttons in 'Actions' column opposite each user ->
                    Click 'Edit' button on any user -> Edit that user and save ->
                    Verify that error appears`);
        Organization._OrganizationUsersActions.clickEditUser(testData.updateUserToFind);
        Organization._OrganizationEditUserActions.editUserLastName(testData.userUpdatedLastName)
            .editUserFirstName(testData.userUpdatedFirstName)
            .editUserRole(testData.roleName, testData.updatedRoleName)
            .saveChanges()
            .verifyModal(false)
            .closeModal(false);
    });

    it("[QA-5357]", () => {
        cy.stepInfo('Precondition: Log in as Appraiser user');
        loginAction(testData.appraiserUsername, testData.appraiserPassword);
        _NavigationSection.navigateToProfileOrganization(enums.MENU_LINKS.organization);

        cy.stepInfo('1. Navigate to Organization Users page');
        Organization._OrganizationActions.openOrganizationUsersPage();

        cy.stepInfo("2. Verify that there are no 'Edit' buttons in 'Actions' column opposite each user");
        Organization._OrganizationUsersActions.verifyEditButtonsNotDisplayed();
    });

    it("[QA-5358]", () => {
        cy.stepInfo('Precondition: Log in as Inspector user');
        loginAction(testData.inspectorUsername, testData.inspectorPassword);
        _NavigationSection.navigateToProfileOrganization(enums.MENU_LINKS.organization);

        cy.stepInfo('1. Navigate to Organization Users page');
        Organization._OrganizationActions.openOrganizationUsersPage();

        cy.stepInfo("2. Verify that there are no 'Edit' buttons in 'Actions' column opposite each user");
        Organization._OrganizationUsersActions.verifyEditButtonsNotDisplayed();
    });

    after('Data cleanup', () => {
        cy.stepInfo('Delete all created users after tests');
        loginAction(testData.adminUsername, testData.adminPassword);
        _NavigationSection.navigateToProfileOrganization(enums.MENU_LINKS.organization);
        Organization._OrganizationActions.openOrganizationUsersPage();
        Organization._OrganizationUsersActions.deleteUser(testData.updateUserToFind);
    });
});