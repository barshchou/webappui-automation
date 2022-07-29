import { Organization } from '../../../../actions/index';
import { _NavigationSection } from '../../../../actions/base/index';
import testData from "../../../../fixtures/not_full_reports/profile_organizations/settings/QA-4025.fixture";
import enums from '../../../../enums/enums';
import { loginAction } from '../../../../actions/base/baseTest.actions';

describe("Verify bond rates UI against API", 
    { tags:[ "@organizations", "@settings" ] }, () => {

        it("[QA-4025] Check the Survey of Competitive Rates Discussion with it's logic", () => {
       
            cy.stepInfo('1. Navigate to Organization -> Settings and verify commentary text');
            loginAction(testData.adminUsername, testData.adminPassword);
            _NavigationSection.navigateToProfileOrganization(enums.MENU_LINKS.organization);
            Organization._OrganizationActions.openOrganizationSettingsPage();
            Organization._OrganizationSettingsActions.
                verifySurveyOfCompetitiveRatesDiscussion(testData.tenYearsBondType);
        });
    });