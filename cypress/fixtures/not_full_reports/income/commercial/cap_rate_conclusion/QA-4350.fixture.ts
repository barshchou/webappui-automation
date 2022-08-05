import Enums from "../../../../../enums/enums";
import { BoweryReports } from "../../../../../types/boweryReports.type";
import ReportDataCreator from "../../../../data_creator/reportData.creator";

const reportCreationFixtureAsIs = () => {
    return ReportDataCreator.getReportData("4350", {
        incomeValue: Enums.INCOME_TYPE.both,
        conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_IS
    });
};

const reportCreationFixtureAsStabilized = () => {
    return ReportDataCreator.getReportData("4350", {
        incomeValue: Enums.INCOME_TYPE.both,
        conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_STABILIZED
    });
};

const reportCreationFixtureAsComplete = () => {
    return ReportDataCreator.getReportData("4350", {
        incomeValue: Enums.INCOME_TYPE.both,
        conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE
    });
};

const _interestAppraisedLeasedFee = {
    asIsMarket: "Leased Fee Interest",
};

const _interestAppraisedFeeSimple = {
    asIsMarket: "Fee Simple Interest",
    asStabilized: "Fee Simple Interest"
};

const _interestAppraisedLeaseHold = {
    asIsMarket: "Leasehold Interest",
    asComplete: "Leasehold Interest",
    asStabilized: "Leasehold Interest"
};

const keyInfoPurposeFixture = () => {
    return {
        purposeValue: "Loan underwriting",
        interestAppraisedLeasedFee: _interestAppraisedLeasedFee,
        interestAppraisedFeeSimple: _interestAppraisedFeeSimple,
        interestAppraisedLeaseHold: _interestAppraisedLeaseHold
    };
};

export const keyInfoPurposeData = () => {
    return Object.freeze(keyInfoPurposeFixture());
};

const _asCompleteCommentary = "The purpose of the appraisal is to provide an opinion of As Is Market Value of " + 
"the Leasehold Interest as of August 1, 2020﻿, the Prospective Market Value Upon Completion of the Leasehold " + 
"Interest as of August 1, 2020﻿﻿, and the Prospective Market Value Upon Stabilization of " + 
"the Leasehold Interest as of August 1, 2020﻿.";

const _asStabilizedCommentary = "The purpose of the appraisal is to provide an opinion of As Is Market Value of " + 
"the Fee Simple Interest as of August 1, 2020﻿﻿, and the Prospective Market Value Upon Stabilization of the " + 
"[As Stabilized Interest Appraised] as of August 1, 2020﻿.";

const _asIsCommentary = "The purpose of the appraisal is to provide an opinion of As Is Market Value of " + 
"the Leasehold Interest as of August 1, 2020﻿, the Prospective Market Value Upon Completion of the Leasehold " + 
"Interest as of August 1, 2020﻿﻿, and the Prospective Market Value Upon Stabilization of " + 
"the Leasehold Interest as of August 1, 2020﻿.";

export default {
    reportCreationDataAsIs: reportCreationFixtureAsIs(),
    reportCreationDataAsStabilized: reportCreationFixtureAsStabilized(),
    reportCreationDataAsComplete: reportCreationFixtureAsComplete(),
    keyInfoPurposeData: keyInfoPurposeData(),
    inspectionDateType: "inspectionDate",
    valuationDateType: "dateOfValuation",
    verifyValuationDate: "08-01-2020",
    verifyInspectionDate: "08-30-2020",
    asCompleteCommentary: _asCompleteCommentary
};