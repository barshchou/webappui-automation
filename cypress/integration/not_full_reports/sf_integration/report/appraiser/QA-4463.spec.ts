import { _NavigationSection } from '../../../../../actions/base';
import { createReport } from '../../../../../actions/base/baseTest.actions';
import { Report } from '../../../../../actions';
import testData from "../../../../../fixtures/not_full_reports/sf_integration/report/appraiser/QA-4463.fixture";

describe(`Prefill Reviewer from Salesforce into the Lead Appraiser Row (Reviewer 2 == Inspector)`,
    { tags: [ "@report", "@appraiser", "@salesforce" ] }, () => {
    
        it("[QA-4463]", () => {
            cy.stepInfo('1. Create a report with SF job');
            createReport(testData.reportData);

            cy.stepInfo('2. Navigate to Report -> Appraiser page');
            _NavigationSection.navigateToReportAppraiser();

            cy.stepInfo(`3. Verify the internal Inspector appears in the table with the 'Personally Inspected' checkbox 
                        checked along with any other information (suffix, state cert, etc.) and 
                        corresponds to the Inspector's name in SF.`);
            Report._Appraiser.verifyPersonallyInspectedCheckbox(testData.reviewer2, true);
        });
    });