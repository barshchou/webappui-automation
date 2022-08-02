import { _HomePage } from '../../../../actions/base';
import { createReport } from '../../../../actions/base/baseTest.actions';
import { Organization, ReviewExport } from '../../../../actions';
import { _NavigationSection } from '../../../../actions/base';
import testData from "../../../../fixtures/not_full_reports/profile_organizations/settings/QA-4022.fixture";
import enums from '../../../../enums/enums';

describe("[QA-4022] A hard coded sentence is updated on the Organization page", 
    { tags:[ "@organizations", "@settings", "@check_export" ] }, () => {

        it('Create a report and verify sentence on UI. Export report', () => {
            cy.stepInfo('1. Create a report');
            createReport(testData.reportCreationData);

            cy.stepInfo('2. Navigate to Organization -> Settings and verify commentary text');
            _NavigationSection.navigateToProfileOrganization(enums.MENU_LINKS.organization);
            Organization._OrganizationActions.openOrganizationSettingsPage();
            Organization._OrganizationSettingsActions
                .verifyMortgageComponentIntroductionCommentary(testData.commentary);

            cy.stepInfo('3. Open created report and export it');
            _NavigationSection.returnToHomePage();
            _HomePage.openReportByName(testData.reportCreationData.reportNumber);
            _NavigationSection.openReviewAndExport();
            ReviewExport.generateDocxReport().waitForReportGenerated()
                .downloadAndConvertDocxReport(testData.reportCreationData.reportNumber);
        });

        it('Check export', () => {
            cy.task("getFilePath", { _reportName: testData.reportCreationData.reportNumber, _docxHtml: "html" })
                .then(file => {
                    cy.log(<string>file);
                    cy.visit(<string>file);
                    cy.stepInfo("4. Verify commentary text in exported report");
                    cy.contains("Mortgage Component").next().should('have.text', testData.commentary);
                });
        });
    });