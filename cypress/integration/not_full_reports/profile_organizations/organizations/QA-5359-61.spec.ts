import { loginAction } from '../../../../actions/base/baseTest.actions';
import { Organization } from '../../../../actions/index';
import { _NavigationSection } from '../../../../actions/base/index';
import testData from "../../../../fixtures/not_full_reports/organizations/QA-5359-61.fixture";
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

    
});