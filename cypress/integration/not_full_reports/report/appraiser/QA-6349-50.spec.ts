import { _HomePage, _NavigationSection } from '../../../../actions/base';
import { createReport, loginAction } from '../../../../actions/base/baseTest.actions';
import { Report } from '../../../../actions';
import testData from "../../../../fixtures/not_full_reports/report/appraiser/QA-6349-50.fixture";

describe(`Verify the correct State is displayed in the State Certification after the user added a new appraiser
         who has a license for this state`, { tags:[ "@report", "@appraiser" ] }, () => {

    testData.dataFixture.forEach(value => {
        it(`${value.specName}, NY report`, () => {
            cy.stepInfo("Login, create report");
            createReport(testData.reportCreationData);
    
            cy.stepInfo("1. Proceed to the Report > Appraiser page");
            _NavigationSection.navigateToReportAppraiser();
    
            cy.stepInfo(`2. Click on the “Add Appraiser/Inspector” button. Select the appraiser from preconditions 
                        - someone who has licenses`);
            Report._Appraiser.searchAndAddAppraiser(value.appraiserName);
    
            cy.stepInfo("3 Verify that the correct state for this NY property is displayed");
            Report._Appraiser.verifyAppraiserStateCertification(value.appraiserName, value.state);
        });
    });

    it("[QA-6349], Other report", () => {
        cy.stepInfo("1. Login, create report");
        loginAction();
        _HomePage.createReport(testData.otherReport);

        cy.stepInfo("1. Proceed to the Report > Appraiser page");
        _NavigationSection.navigateToReportAppraiser();

        cy.stepInfo(`2. Click on the “Add Appraiser/Inspector” button. Select the appraiser from preconditions 
                    - someone who has licenses`);
        Report._Appraiser.searchAndAddAppraiser(testData.appraiserName);

        cy.stepInfo("3 Verify that the correct state for this NY property is displayed");
        Report._Appraiser.verifyAppraiserStateCertification(testData.appraiserName, testData.pennsylvania);
    });
});