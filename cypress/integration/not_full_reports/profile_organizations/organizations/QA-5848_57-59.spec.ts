import { loginAction } from '../../../../actions/base/baseTest.actions';
import { Organization } from '../../../../actions/index';
import { _NavigationSection } from '../../../../actions/base/index';
import testData from "../../../../fixtures/not_full_reports/organizations/QA-5848_57-59.fixture";
import enums from '../../../../enums/enums';

describe("Verify users roles to create new clients", 
    { tags:[ "@permissions_roles, @client", "@organizations" ] }, () => {

    it("[QA-5848]]", () => {
        cy.stepInfo('1. Login with Admin user role');
        loginAction(testData.adminUsername, testData.adminPassword);

        cy.stepInfo('2. Navigate to Organization -> Create New Client page');
        _NavigationSection.navigateToProfileOrganization(enums.MENU_LINKS.organization);
        Organization._OrganizationActions.openCreateNewUserPage();

        cy.stepInfo('3. Create new client');
        Organization._CreateNewClient.createNewClient(testData.clientCreationData);

        cy.stepInfo('4. Verify that the client created in the step 5 is displayed in the list of users, delete client');
        cy.contains("Organization Clients").click();
        Organization._OrganizationClientsActions.deleteClient(testData.textToType);
    });
});