import { loginAction } from '../../../../actions/base/baseTest.actions';
import { Organization } from '../../../../actions/index';
import { _NavigationSection } from '../../../../actions/base/index';
import testData from "../../../../fixtures/not_full_reports/profile_organizations/organizations/QA-5841_44_47.fixture";
import enums from '../../../../enums/enums';

describe("Verify users roles to create new clients", 
    { tags:[ "@permissions_roles", "@client", "@organizations" ] }, () => {

        it("[QA-5844]]", () => {
            cy.stepInfo(`1. Login with Lead Appraiser user role`);
            loginAction(testData.leadAppraiserUsername, testData.leadAppraiserPassword);

            cy.stepInfo(`2. Navigate to Organization -> Create New Client page`);
            _NavigationSection.navigateToProfileOrganization(enums.MENU_LINKS.organization);
            Organization._OrganizationActions.openCreateNewClientPage();

            cy.stepInfo(`3. Create new client`);
            Organization._CreateNewClient.createNewClient(testData.clientCreationData);

            cy.stepInfo(`4. Verify that the client created in the step 5 is displayed 
            in the list of users, delete client`);
            Organization._OrganizationActions.openOrganizationClientsPage();
            Organization._OrganizationClientsActions.deleteClient(testData.textToType);
        });

        it("[QA-5847]]", () => {
            cy.stepInfo(`1. Login with Lead Appraiser user role`);
            loginAction(testData.inspectorUsername, testData.inspectorPassword);

            cy.stepInfo(`2. Navigate to Organization -> Create New Client page`);
            _NavigationSection.navigateToProfileOrganization(enums.MENU_LINKS.organization);
            cy.contains(testData.createNewClientTitle).should('not.exist');

        });

        it("[QA-5841]]", () => {
            cy.stepInfo(`1. Login with Appraiser user role`);
            loginAction(testData.appraiserUsername, testData.appraiserPassword);

            cy.stepInfo(`2. Navigate to Organization -> Create New Client page`);
            _NavigationSection.navigateToProfileOrganization(enums.MENU_LINKS.organization);
            Organization._OrganizationActions.openCreateNewClientPage();

            cy.stepInfo(`3. Create new client`);
            Organization._CreateNewClient.createNewClient(testData.clientCreationData);

            cy.stepInfo(`4. Verify that the client created in the step 5 
            is displayed in the list of users, delete client`);
            Organization._OrganizationActions.openOrganizationClientsPage();
            Organization._OrganizationClientsActions.deleteClient(testData.textToType);
        });
    });