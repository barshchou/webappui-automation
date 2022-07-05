import { loginAction } from '../../../../actions/base/baseTest.actions';
import { Organization } from '../../../../actions/index';
import { _NavigationSection } from '../../../../actions/base/index';
import testData from "../../../../fixtures/not_full_reports/profile_organizations/settings/QA-4659-61.fixture";
import enums from '../../../../enums/enums';

describe("", 
    { tags:[ "@organizations", "@settings" ] }, () => {

    before('Save local storage', () => {
        cy.stepInfo('1. Navigate to Organization Users page');
        loginAction(testData.adminUsername, testData.adminPassword);
        _NavigationSection.navigateToProfileOrganization(enums.MENU_LINKS.organization);
        Organization._OrganizationActions.openOrganizationSettingsPage();

        cy.saveLocalStorage();
    });

    beforeEach('Restore local storage', () => {
        cy.restoreLocalStorage();
    });

    it("[QA-4659] 10-Year Treasury Bond Rate is automatically updated every day at 2:00 AM, 2:00 PM, 5:45 PM UTC/GMT+3", () => {
        cy.stepInfo('2. Verify rate gotten from UI against API');
        Organization._OrganizationSettingsActions.verifyTreasuryBondRateAgainstApi(testData.url10YearsBonds, testData.tenYearsBondType);
    });

    it("[QA-4660] 30-Year Treasury Bond Rate is automatically updated every day at 2:00 AM, 2:00 PM, 5:45 PM UTC/GMT+3", () => {
        cy.stepInfo('2. Verify rate gotten from UI against API');
        Organization._OrganizationSettingsActions.verifyTreasuryBondRateAgainstApi(testData.url30YearsBonds, testData.thirtyYearsBondType );
    });

    it("[QA-4661] Corporate Bonds Rate is automatically updated every day at 2:00 AM, 2:00 PM, 5:45 PM UTC/GMT+3", () => {
        cy.stepInfo('2. Verify rate gotten from UI against API');
        Organization._OrganizationSettingsActions.verifyTreasuryBondRateAgainstApi(testData.urlCorporateBonds, testData.corporateBondType );
    });
});
