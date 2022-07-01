import { loginAction } from '../../../../actions/base/baseTest.actions';
import { Organization } from '../../../../actions/index';
import { _NavigationSection } from '../../../../actions/base/index';
import testData from "../../../../fixtures/not_full_reports/profile_organizations/organizations/QA-5355-58.fixture";
import enums from '../../../../enums/enums';

describe("", 
    { tags:[ "@organizations", "@settings" ] }, () => {

    it("[QA-4659] 10-Year Treasury Bond Rate is automatically updated every day at 2:00 AM, 2:00 PM, 5:45 PM UTC/GMT+3", () => {
        cy.stepInfo('1. Navigate to Organization Users page');
        loginAction(testData.adminUsername, testData.adminPassword);
        _NavigationSection.navigateToProfileOrganization(enums.MENU_LINKS.organization);
        Organization._OrganizationActions.openOrganizationSettingsPage();
        Organization._OrganizationSettingsActions.Page.treasuryBondsLastUpdated.invoke('attr', 'value').then(date => {
           
            let formattedDate = new Date(date);
            const offset = formattedDate.getTimezoneOffset();
            formattedDate = new Date(formattedDate.getTime() - (offset * 60 * 1000));
            cy._mapSet('date', formattedDate.toISOString().split('T')[0]);

        });

        cy._mapGet('date').then(date => {
            cy.request(
                { 
                    method: 'GET', 
                    url: `https://api.stlouisfed.org/fred/series/observations?series_id=DGS10&api_key=7ab383546af7583fae8a058915edc868&observation_start=${date}` 
                }).then((response) => {
                    expect(response.status).to.eq(200);
                    let rate =  new DOMParser().parseFromString(response.body, "text/xml").getElementsByTagName("observation")[0].getAttribute("value");
                    cy._mapSet("rate", rate);
                });
            
            Organization._OrganizationSettingsActions.Page.treasuryBondsRateInput.invoke('attr', 'value').then((rateValueUI) => {
                cy._mapGet("rate").then((rateValueAPI) => {
                    rateValueUI = Number(rateValueUI).toFixed(2);
                    expect(rateValueUI).to.eq(rateValueAPI);
                });
            });
        });
    });
});