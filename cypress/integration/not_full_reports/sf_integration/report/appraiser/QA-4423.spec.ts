import { _NavigationSection } from '../../../../../actions/base';
import { createReport } from '../../../../../actions/base/baseTest.actions';
import { Organization, Report } from '../../../../../actions';
import testData from "../../../../../fixtures/not_full_reports/sf_integration/report/appraiser/QA-4423.fixture";
import Enums from '../../../../../enums/enums';

describe(`Verify that the alphabetical sorting by the Last Name in the Full Name dropdown doesn't affect 
        the selected by default Lead Appraiser`, { tags: [ "@report", "@appraiser" ] }, () => {

    beforeEach("Login. Create report", () => {
        cy.stepInfo("Create report");
        createReport(testData.reportData);
    });
            
    it("[QA-4423]", () => {
        cy.stepInfo("1. Proceed to the Organization > Create New User page and save Main Lead Appraiser");
        _NavigationSection.navigateToProfileOrganization(Enums.MENU_LINKS.organization);
        Organization._Info.Page.mainLeadAppraiser.invoke("text").then(appraiserName => {
            cy._mapSet(testData.mainLeadAppraiser, appraiserName);
        });
       
        cy.stepInfo("2. Return to Report -> Appraiser page");
        for (let i = 0; i < 2; i++) {
            cy.go("back");
        }
        _NavigationSection.navigateToReportAppraiser();

        cy.stepInfo(`3. Verify that the Lead Appraisers are sorted alphabetically by the Last name in the 
                    Full Name dropdown but the Lead Appraiser of your organization from step 2 is still selected 
                    by default on the page`);
        cy._mapGet(testData.mainLeadAppraiser).then(appraiserName => {
            Report._Appraiser.Page.leadAppraiser.should("have.text", appraiserName);
        });
    });
});