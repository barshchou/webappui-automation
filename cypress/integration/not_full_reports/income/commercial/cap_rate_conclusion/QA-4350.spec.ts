import { _NavigationSection } from '../../../../../actions/base';
import testData from 
    "../../../../../fixtures/not_full_reports/income/commercial/cap_rate_conclusion/QA-4350.fixture";
import { Income, Report } from "../../../../../actions";
import { createReport } from "../../../../../actions/base/baseTest.actions";

describe(`Verify the "Purpose & Date of Value Discussion" generated commentary on the Cap Rate Conclusion page`, 
    { tags:[ "@income", "@commercial", "@cap_rate_conclusion" ] }, () => {

        testData.reportCreationDataFixture.forEach(report => {
            it(`[QA-4350] Verify Purpose & Date of Value Discussion with ${report.valueConclusion} report`, () => {
                cy.stepInfo(`1. Create report`);
                createReport(report.reportType);
    
                cy.stepInfo(`2. Navigate to Key Info page and set Interest Appraised and Inspection Date`);
                _NavigationSection.navigateToReportInformation();
                Report._KeyInfo.Actions
                    .checkAllInterestAppraisedByValues(report.interestAppraised);
                Report._KeyInfo.enterDateByType(testData.valuationDate)
                    .enterDateByType(testData.inspectionDate, false);
    
                cy.stepInfo(`3. Navigate to Cap Rate Conclusion and verify the "Purpose & Date of Value Discussion" 
                            generated commentary`);
                _NavigationSection.navigateToCapRateConclusion();
                Income._CapRateConclusion.verifyGeneratedPurposeCommentary(report.commentary);
            });
        });
    });