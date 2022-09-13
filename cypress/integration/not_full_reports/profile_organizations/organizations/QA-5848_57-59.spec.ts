import { loginAction } from '../../../../actions/base/baseTest.actions';
import { Organization } from '../../../../actions';
import { _NavigationSection } from '../../../../actions/base';
import testData from "../../../../fixtures/not_full_reports/profile_organizations/organizations/QA-5848_57-59.fixture";
import enums from '../../../../enums/enums';

describe("Verify users roles to create new users", 
    { tags:[ "@permissions_roles", "@users", "@organizations", "@fix" ] }, () => {

        it("[QA-5848]", () => {
            cy.stepInfo('1. Login with Admin user role');
            loginAction(testData.adminUsername, testData.adminPassword);

            cy.stepInfo('2. Navigate to Organization -> Create New User page');
            _NavigationSection.navigateToProfileOrganization(enums.MENU_LINKS.organization);
            Organization._OrganizationActions.openCreateNewUserPage();

            cy.stepInfo('3. Create new user');
            Organization._CreateNewUser.createNewUser(testData.clientCreationData);

            cy.stepInfo('4. Verify that new user is created ');
            Organization._OrganizationActions.openOrganizationUsersPage();
            Organization._OrganizationUsersActions.deleteUser(testData.userToFind);
        });

        it("[QA-5857]", () => {
            cy.stepInfo('1. Login with Lead Appraiser user role');
            loginAction(testData.leadAppraiserUsername, testData.leadAppraiserPassword);

            cy.stepInfo(`2. Navigate to Organization -> Verify “Create New User” does not 
                    appear as an option in the Organization navigation for Lead Appraiser`);
            _NavigationSection.navigateToProfileOrganization(enums.MENU_LINKS.organization);
            cy.contains(testData.createNewUserTitle).should('not.exist');

            cy.stepInfo(`3. Organization Info page is opened if Appraiser user tries 
                    to open “Create New User” by direct link`);
            cy.visit(testData.createNewUserDirectLink);
            Organization._Info.Page.pageTitle.should('be.visible');
        });

        it("[QA-5858]", () => {
            cy.stepInfo('1. Login with Appraiser user role');
            loginAction(testData.appraiserUsername, testData.appraiserPassword);

            cy.stepInfo(`2. Navigate to Organization -> Verify “Create New User” does not 
                    appear as an option in the Organization navigation for Appraiser`);
            _NavigationSection.navigateToProfileOrganization(enums.MENU_LINKS.organization);
            cy.contains(testData.createNewUserTitle).should('not.exist');

            cy.stepInfo(`3. Organization Info page is opened if Appraiser user tries 
                    to open “Create New User” by direct link`);
            cy.visit(testData.createNewUserDirectLink);
            Organization._Info.Page.pageTitle.should('be.visible');
        });

        it("[QA-5859]", () => {
            cy.stepInfo('1. Login with Inspector user role');
            loginAction(testData.inspectorUsername, testData.inspectorPassword);

            cy.stepInfo(`2. Navigate to Organization -> Verify “Create New User” does not 
                    appear as an option in the Organization navigation for Inspector`);
            _NavigationSection.navigateToProfileOrganization(enums.MENU_LINKS.organization);
            cy.contains(testData.createNewUserTitle).should('not.exist');

            cy.stepInfo(`3. Organization Info page is opened if Appraiser user tries 
                    to open “Create New User” by direct link`);
            cy.visit(testData.createNewUserDirectLink);
            Organization._Info.Page.pageTitle.should('be.visible');
        });
    });