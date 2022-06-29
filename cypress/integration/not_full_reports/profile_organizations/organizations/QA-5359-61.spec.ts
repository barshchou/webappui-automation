import { _NavigationSection, _HomePage } from './../../../../actions/base/index';
import { createReport, deleteReport } from './../../../../actions/base/baseTest.actions';
import { loginAction } from '../../../../actions/base/baseTest.actions';
import { ReviewExport } from '../../../../actions/index';
import testData from "../../../../fixtures/not_full_reports/organizations/QA-5359-61.fixture";

describe("Verify users roles to create new clients", 
    { tags:[ "@permissions_roles", "report_status" ] }, () => {

    before('Prepare test data', () => {
        cy.stepInfo('Precondition: Create test user');
        createReport(testData.reportCreationData);
    });

    it('[QA-5359]', () => {
        cy.stepInfo('1. On a Review & Export page change report status');
        _NavigationSection.openReviewAndExport();
        ReviewExport.changeReportStatus(testData.reviewStatus);
        // cy.pause();
        ReviewExport.changeReportStatus(testData.draftStatus);

       

        // cy.stepInfo('2. Verify report status is changed');
        // ReviewExport.verifyReportStatusChanged(testData.reviewStatus);
        
        // cy.stepInfo('3. Navigate to Home page and verify report status is changed');
        // _NavigationSection.returnToHomePage();
        // _HomePage.verifyReportStatus(testData.reviewStatus);

        // deleteReport(testData.reportCreationData.reportNumber);
    });



    
});