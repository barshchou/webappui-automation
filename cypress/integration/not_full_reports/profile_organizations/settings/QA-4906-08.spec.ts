import { loginAction } from '../../../../actions/base/baseTest.actions';
import { Organization } from '../../../../actions/index';
import { _NavigationSection } from '../../../../actions/base/index';
import testData from "../../../../fixtures/not_full_reports/profile_organizations/settings/QA-4906-08.fixture";
import enums from '../../../../enums/enums';

describe("Verify bond rate tooltip and icon", 
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

    it("[QA-4906] Competitive Rates | 10 Year tooltip and icon", () => {
        cy.stepInfo(`2.Verify that by default there is the tooltip 'This info has been automatically updated 
                    from the Federal Reserve Bank of St. Louis' with a green icon next to it in the 
                    10 Year Treasury Bond section`);
        Organization._OrganizationSettingsActions.verifyBondsTooltip(testData.tenYearsBonds, testData.tooltipText, testData.textColor);
    });

    it("[QA-4907] Competitive Rates | 30 Year tooltip and icon", () => {
        cy.stepInfo(`2.Verify that by default there is the tooltip 'This info has been automatically updated 
                    from the Federal Reserve Bank of St. Louis' with a green icon next to it in the 
                    30 Year Treasury Bond section`);
        Organization._OrganizationSettingsActions.verifyBondsTooltip(testData.tenYearsBonds, testData.tooltipText, testData.textColor);
    });

    it("[QA-4908] Competitive Rates | AAA tooltip and icon", () => {
        cy.stepInfo(`2.Verify that by default there is the tooltip 'This info has been automatically updated 
                    from the Federal Reserve Bank of St. Louis' with a green icon next to it in the 
                    Corporate Bonds (AAA) section`);
        Organization._OrganizationSettingsActions.verifyBondsTooltip(testData.tenYearsBonds, testData.tooltipText, testData.textColor);
    });
});
