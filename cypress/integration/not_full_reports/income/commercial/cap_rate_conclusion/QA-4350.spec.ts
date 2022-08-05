import { _NavigationSection } from '../../../../../actions/base';
import testData from 
    "../../../../../fixtures/not_full_reports/income/commercial/cap_rate_conclusion/QA-4350.fixture";
import { Income, Report } from "../../../../../actions";
import { createReport } from "../../../../../actions/base/baseTest.actions";

describe(`Verify the "Purpose & Date of Value Discussion" generated commentary on the Cap Rate Conclusion page`, 
    { tags:[ "@income", "@commercial", "@cap_rate_conclusion" ] }, () => {
        it("[QA-4350] Verify Purpose & Date of Value Discussion with AS COMPLETE report", () => {
            cy.stepInfo(`1. Create report`);
            createReport(testData.reportCreationDataAsComplete);

            cy.stepInfo(`2. Navigate to Key Info page and set Interest Appraised and Inspection Date`);
            _NavigationSection.navigateToReportInformation();
            Report._KeyInfo.Actions
                .checkAllInterestAppraisedByValues(testData.keyInfoPurposeData.interestAppraisedLeaseHold);
            Report._KeyInfo.enterDateByType({ type: testData.valuationDateType, date: testData.verifyValuationDate })
                .enterDateByType({ type: testData.inspectionDateType, date: testData.verifyInspectionDate }, false);

            cy.stepInfo(`3. Navigate to Cap Rate Conclusion and verify the "Purpose & Date of Value Discussion" 
            generated commentary`);
            _NavigationSection.navigateToCapRateConclusion();
            Income._CapRateConclusion.verifyGeneratedPurposeCommentary(testData.asCompleteCommentary);
        });

        it("[QA-4350] Verify Purpose & Date of Value Discussion with AS STABILIZED report", () => {
            cy.stepInfo(`1. Create report`);
            createReport(testData.reportCreationDataAsStabilized);

            cy.stepInfo(`2. Navigate to Key Info page and set Interest Appraised and Inspection Date`);
            _NavigationSection.navigateToReportInformation();
            Report._KeyInfo.Actions
                .checkAsIsMarketInterestByValue(testData.keyInfoPurposeData.interestAppraisedFeeSimple.asIsMarket)
                .checkAsStabilizedInterestByValue(testData.keyInfoPurposeData.interestAppraisedFeeSimple.asStabilized);

            Report._KeyInfo.enterDateByType({ type: testData.valuationDateType, date: testData.verifyValuationDate })
                .enterDateByType({ type: testData.inspectionDateType, date: testData.verifyInspectionDate }, false);

            cy.stepInfo(`3. Navigate to Cap Rate Conclusion and verify the "Purpose & Date of Value Discussion" 
            generated commentary`);
            _NavigationSection.navigateToCapRateConclusion();
            Income._CapRateConclusion.verifyGeneratedPurposeCommentary(testData.asStabilizedCommentary);
        });

        it("[QA-4350] Verify Purpose & Date of Value Discussion with AS IS report", () => {
            cy.stepInfo(`1. Create report`);
            createReport(testData.reportCreationDataAsIs);

            cy.stepInfo(`2. Navigate to Key Info page and set Interest Appraised and Inspection Date`);
            _NavigationSection.navigateToReportInformation();
            Report._KeyInfo.Actions
                .checkAsIsMarketInterestByValue(testData.keyInfoPurposeData.interestAppraisedLeasedFee.asIsMarket);
            Report._KeyInfo.enterDateByType({ type: testData.valuationDateType, date: testData.verifyValuationDate })
                .enterDateByType({ type: testData.inspectionDateType, date: testData.verifyInspectionDate }, false);

            cy.stepInfo(`3. Navigate to Cap Rate Conclusion and verify the "Purpose & Date of Value Discussion" 
            generated commentary`);
            _NavigationSection.navigateToCapRateConclusion();
            Income._CapRateConclusion.verifyGeneratedPurposeCommentary(testData.asIsCommentary);
        });
    });