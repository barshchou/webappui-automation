import { _NavigationSection } from './../../../../actions/base/index';
import { createReport } from './../../../../actions/base/baseTest.actions';
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
        cy.stepInfo(`1. Change report status`);
        _NavigationSection.openReviewAndExport();
        ReviewExport.changeReportStatus(testData.reviewStatus);
        ReviewExport.changeReportStatus(testData.draftStatus);
        ReviewExport.changeReportStatus(testData.submittedStatus);
        ReviewExport.changeReportStatus(testData.approvedStatus);
    });

    
});