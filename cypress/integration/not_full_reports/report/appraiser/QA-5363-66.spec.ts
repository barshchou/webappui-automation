import { _NavigationSection } from '../../../../actions/base';
import { createReport } from '../../../../actions/base/baseTest.actions';
import { Report } from '../../../../actions';
import testData from "../../../../fixtures/not_full_reports/report/appraiser/QA-5363-66.fixture";
import { conditionalDescribe } from "../../../checkIsProd.utils";

/**
 * TODO: probably behavior of this test can change,
 * so need to fix this test later.
 * As for now - we can just adapt it for current behavior.
 * + add `data-qa` attribute to "Add appraiser / inspector" btn in `appraiser.page.ts`
 */
conditionalDescribe("Verify that 'Sign Report' checkbox for different user roles", 
    { tags:[ "@permissions_roles", "@report_status", "@report", "@appraiser", "@QA-7030" ] }, () => {

        before('Create a report', () => {
            cy.stepInfo('Precondition: Create report with Admin user');
            createReport(testData.reportCreationData);

            cy.stepInfo('1. Navigate to Report -> Appraiser page');
            _NavigationSection.navigateToReportAppraiser();
        
            cy.saveLocalStorage();
        });

        testData.appraisersRoles.forEach(appraiserRole => {
            it(`Check Sign Report checkbox for test ${appraiserRole.testId} with ${appraiserRole.role}`, () => {
                cy.stepInfo('2. Verify for each role sign report checkbox default state');
                Report._Appraiser.searchAndAddAppraiser(appraiserRole.fullName)
                    .verifySignCheckbox(appraiserRole.fullName, appraiserRole.canSignReport);
            });
        });

        after('Restore storage', () => {
            cy.restoreLocalStorage();
        });
    
    });