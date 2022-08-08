import { _NavigationSection } from '../../../../actions/base';
import { createReport } from '../../../../actions/base/baseTest.actions';
import { Report } from '../../../../actions';
import testData from "../../../../fixtures/not_full_reports/report/appraiser/QA-4327.fixture";


describe(`Verify the Inspector's name is pre-filled in the Appraisers section on WebApp with the name 
        corresponding to the Inspector value for that job in SalesForce.`,
{ tags: [ "@permissions_roles", "@report", "@appraiser", "@salesforce" ] }, () => {

    before('Create a report with SF job', () => {
        cy.stepInfo('Precondition: Create report with Admin user');
        createReport(testData.reportCreationData);

        cy.stepInfo('1. Navigate to Report -> Appraiser page');
        _NavigationSection.navigateToReportAppraiser();
    });

    
    it("[QA-4227]", () => {
        cy.stepInfo(`2. Verify the internal Inspector appears in the table with the ‘Personally Inspected’ checkbox 
                    checked along with any other information (suffix, state cert, etc.) and 
                    corresponds to the Inspector’s name in SF.`);

        testData.appraisers.forEach(appraiser => {
            Report._Appraiser.verifyPersonallyInspectedCheckbox(appraiser.name, appraiser.isPersonallyInspected);
        });
    });
});