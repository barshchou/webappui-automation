import { loginAction } from '../../../../actions/base/baseTest.actions';
import { _NavigationSection } from '../../../../actions/base/index';
import testData from "../../../../fixtures/not_full_reports/organizations/QA-5516-17.fixture";
import enums from '../../../../enums/enums';

describe("Verify users roles access to 'Settings' page", 
    { tags:[ "@permissions_roles", "@users", "@organizations" ] }, () => {

    afterEach('Log out', () => {
        _NavigationSection.logout();
    });

    it(`[QA-5516] Verify that user with an Admin role has access to the "Settings" tab on "Organization Info" page`, () => {
        cy.stepInfo('1. Login to the application as an Admin');
        loginAction(testData.adminUsername, testData.adminPassword);

        cy.stepInfo('2. Navigate to Organization & Profile page');
        _NavigationSection.navigateToProfileOrganization(enums.MENU_LINKS.organization);

        cy.stepInfo('3. Verify that the “Settings” tab is displayed in the left navigation menu of the page');
        cy.contains("Settings").should('exist');
    });

    testData.usersRoles.forEach(userRole => {
        it(`[QA-5517] Verify that '${userRole.roleName}' without admin role has no access to the "Settings" tab on "Organization info" page`, () => {
            cy.stepInfo(`1. Login to the application as an '${userRole.roleName}'`);
            loginAction(userRole.username, userRole.password);
    
            cy.stepInfo('2. Navigate to Organization & Profile page');
            _NavigationSection.navigateToProfileOrganization(enums.MENU_LINKS.organization);
    
            cy.stepInfo('3. Verify that the “Settings” tab is NOT displayed in the left navigation menu of the page');
            cy.contains("Settings").should('not.exist');
        });
    });
});