import { _NavigationSection } from '../../../../../actions/base';
import { createReport } from '../../../../../actions/base/baseTest.actions';
import { Report } from '../../../../../actions';
import testData from 
    "../../../../../fixtures/not_full_reports/sf_integration/report/appraiser/QA-4445-46_61-62_74-76_79.fixture";


// TODO: https://bowery.atlassian.net/browse/QA-7060    
describe("Prefill Reviewer from Salesforce into the Lead Appraiser Row",
    { tags: [ "@report", "@appraiser", "@salesforce", "@QA-7060" ] }, () => {
    
        testData.appraisers.forEach(data => {
            it(`${data.specName}`, () => {
                cy.stepInfo('1. Create a report with SF job');
                createReport(data.reportData);
                Report._Appraiser.interceptAppraisersRequest();
            
                cy.stepInfo('2. Navigate to Report -> Appraiser page');
                _NavigationSection.navigateToReportAppraiser();
    
                cy.stepInfo(`3. Verify Prefill Reviewer(s) from Salesforce into the Lead Appraiser Row in WebApp. 
                            (Appraiser, Lead Appraiser, Reviewer)`);
                Report._Appraiser.verifyAppraisersFromRequest();
                if (data.specName === "[QA-4475]") {
                    Report._Appraiser.verifySignCheckbox(data.leadAppraiser, true)
                        .Page.leadAppraiser.should("not.have.text", data.leadAppraiser);
                } else {
                    Report._Appraiser.Page.leadAppraiser.should("have.text", data.leadAppraiser);
                }
            });
        });
    });