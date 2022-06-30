import { _NavigationSection, _HomePage } from '../../../../actions/base/index';
import { createReport, deleteReport } from '../../../../actions/base/baseTest.actions';
import { ReviewExport } from '../../../../actions/index';
import testData from "../../../../fixtures/not_full_reports/organizations/QA-5359-62.fixture";

describe("Verify users roles permissions to change report status", 
    { tags:[ "@permissions_roles", "report_status" ] }, () => {

    afterEach('Open Home page', () => {
        _NavigationSection.logout(); 
    });

    it('[QA-5359]', () => {
        cy.stepInfo('Precondition: Create report with Admin user');
        createReport(testData.reportCreationData, testData.adminUsername, testData.adminPassword);

        cy.stepInfo('2. On a Review & Export page change report status');
        ReviewExport.changeReportStatus(testData.reviewStatus);

        cy.stepInfo('3. Verify report status is changed');
        ReviewExport.verifyReportStatusChanged(testData.reviewStatus);
       
        cy.stepInfo('4. Navigate to Home page and verify report status is changed');
        _NavigationSection.returnToHomePage();
        _HomePage.filterReportsByReportNumber(testData.reportCreationData.reportNumber)
            .verifyReportStatus(testData.reviewStatus);
        
        deleteReport(testData.reportCreationData.reportNumber);
    });

    it('[QA-5360]', () => {

        cy.stepInfo('Precondition: Create report with Lead Appraiser user');
        createReport(testData.reportCreationData, testData.leadAppraiserUsername, testData.leadAppraiserPassword);

        cy.stepInfo('2. On a Review & Export page change report status');
        ReviewExport.changeReportStatus(testData.reviewStatus);

        cy.stepInfo('3. Verify report status is changed');
        ReviewExport.verifyReportStatusChanged(testData.reviewStatus);
       
        cy.stepInfo('4. Navigate to Home page and verify report status is changed');
        _NavigationSection.returnToHomePage();
        _HomePage.filterReportsByReportNumber(testData.reportCreationData.reportNumber)
            .verifyReportStatus(testData.reviewStatus);
        
        deleteReport(testData.reportCreationData.reportNumber);
    });

    it('[QA-5361]', () => {

        cy.stepInfo('Precondition: Create report with Appraiser user');
        createReport(testData.reportCreationData, testData.appraiserUsername, testData.appraiserPassword);

        cy.stepInfo('2. On a Review & Export page change report status');
        ReviewExport.changeReportStatus(testData.reviewStatus);

        cy.stepInfo('3. Verify report status is changed');
        ReviewExport.verifyReportStatusChanged(testData.reviewStatus);
       
        cy.stepInfo('4. Navigate to Home page and verify report status is changed');
        _NavigationSection.returnToHomePage();
        _HomePage.filterReportsByReportNumber(testData.reportCreationData.reportNumber)
            .verifyReportStatus(testData.reviewStatus);
        
        deleteReport(testData.reportCreationData.reportNumber);
    });

    it('[QA-5362]', () => {

        cy.stepInfo('Precondition: Create report with Inspector user');
        createReport(testData.reportCreationData, testData.inspectorUsername, testData.inspectorPassword);

        cy.stepInfo('2. On a Review & Export page verify there is no change report status buttons');
        ReviewExport.Page.reportStatus.should('not.exist');

        deleteReport(testData.reportCreationData.reportNumber);
    });
});