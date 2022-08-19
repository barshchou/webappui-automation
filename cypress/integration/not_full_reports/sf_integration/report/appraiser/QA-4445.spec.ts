import { ReviewExport } from '../../../../../actions/index';
import { _NavigationSection } from '../../../../../actions/base';
import { createReport } from '../../../../../actions/base/baseTest.actions';
import { Report } from '../../../../../actions';
import testData from "../../../../../fixtures/not_full_reports/sf_integration/report/appraiser/QA-4445.fixture";

describe(`Prefill Reviewer from Salesforce into the Lead Appraiser Row (one reviewer)`,
    { tags: [ "@report", "@appraiser", "@salesforce" ] }, () => {
    
        it("[QA-4445]", () => {
            cy.stepInfo('1. Create a report with SF job');
            createReport(testData.reportCreationData);

            cy.stepInfo('2. Navigate to Report -> Appraiser page');
            _NavigationSection.navigateToReportAppraiser();

            cy.stepInfo(`3. Verify Prefill Reviewer(s) from Salesforce into the Lead Appraiser Row in WebApp. 
                        (Appraiser, Lead Appraiser, Reviewer)`);
            Report._Appraiser.Page.leadAppraiser.should("have.text", testData.leadAppraiser);
            testData.appraisers.forEach(appraiser => {
                Report._Appraiser.verifyPersonallyInspectedCheckbox(appraiser.name, appraiser.isPersonallyInspected);
            });
        });
    });