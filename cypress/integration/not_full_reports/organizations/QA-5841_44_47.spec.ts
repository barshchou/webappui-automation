import { loginAction } from '../../../actions/base/baseTest.actions';
import { Organization } from '../../../actions/index';
import { _NavigationSection } from '../../../actions/base/index';
import testData from "../../../fixtures/not_full_reports/organizations/QA-5841_44_47.fixture";

describe("Verify users roles to create new clients", 
    { tags:[ "@permissions_roles" ] }, () => {

    it("[QA-5844]]", () => {
        cy.stepInfo('1. Login with Lead Appraiser user role');
        loginAction(testData.leadAppraiserUsername, testData.leadAppraiserPassword);

        cy.stepInfo('2. Navigate to Organization -> Create New Client page');
        _NavigationSection.navigateToProfileOrganization("Organization");
        cy.contains("Create New Client").click();

        cy.stepInfo('3. Create new client');
        Organization._CreateNewClient.createNewClient(testData.clientCreationData);

        cy.stepInfo('4. Verify that the client created in the step 5 is displayed in the list of users, delete client');
        cy.contains("Organization Clients").click();
        Organization._OrganizationClientsActions.deleteClient(testData.textToType);
    });

    it("[QA-5847]]", () => {
        cy.stepInfo('1. Login with Lead Appraiser user role');
        loginAction(testData.inspectorUsername, testData.inspectorPassword);

        cy.stepInfo('2. Navigate to Organization -> Create New Client page');
        _NavigationSection.navigateToProfileOrganization("Organization");
        cy.contains("Create New Client").should('not.exist');

    });

    it("[QA-5841]]", () => {
        cy.stepInfo('1. Login with Appraiser user role');
        loginAction(testData.appraiserUsername, testData.appraiserPassword);

        cy.stepInfo('2. Navigate to Organization -> Create New Client page');
        _NavigationSection.navigateToProfileOrganization("Organization");
        cy.contains("Create New Client").click();

        cy.stepInfo('3. Create new client');
        Organization._CreateNewClient.createNewClient(testData.clientCreationData);

        cy.stepInfo('4. Verify that the client created in the step 5 is displayed in the list of users, delete client');
        cy.contains("Organization Clients").click();
        Organization._OrganizationClientsActions.deleteClient(testData.textToType);
    });
});