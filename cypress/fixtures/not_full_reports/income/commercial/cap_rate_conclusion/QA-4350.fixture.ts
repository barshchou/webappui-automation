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
    asIsMarket: Enums.INTEREST_APPRAISED.leasedFee,
};

const _interestAppraisedFeeSimple = {
    asIsMarket: Enums.INTEREST_APPRAISED.simpleInterest,
    asStabilized: Enums.INTEREST_APPRAISED.simpleInterest
};

const _interestAppraisedLeaseHold = {
    asIsMarket: Enums.INTEREST_APPRAISED.leasehold,
    asComplete: Enums.INTEREST_APPRAISED.leasehold,
    asStabilized: Enums.INTEREST_APPRAISED.leasehold
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
"the Leasehold Interest as of August 22, 2022﻿, the Prospective Market Value Upon Completion of the Leasehold " + 
"Interest as of August 22, 2022﻿﻿, and the Prospective Market Value Upon Stabilization of " + 
"the Leasehold Interest as of August 22, 2022﻿.";

const _asStabilizedCommentary = "The purpose of the appraisal is to provide an opinion of As Is Market Value of " + 
"the Fee Simple Interest as of August 22, 2022﻿﻿, and the Prospective Market Value Upon Stabilization of " + 
"the Fee Simple Interest as of August 22, 2022﻿.";

const _asIsCommentary = "The purpose of the appraisal is to provide an opinion of As Is Market Value of " + 
"the Leased Fee Interest as of August 22, 2022﻿﻿.";

const _inspectionDateFixture: BoweryReports.KeyInfoDateType = {
    type: Enums.DATE_TYPE.inspectionDate,
    date: "08-30-2022"
};

const _valuationDateFixture: BoweryReports.KeyInfoDateType = {
    type: Enums.DATE_TYPE.dateOfValuation,
    date: "08-22-2022"
};

export default {
    reportCreationDataAsIs: reportCreationFixtureAsIs(),
    reportCreationDataAsStabilized: reportCreationFixtureAsStabilized(),
    reportCreationDataAsComplete: reportCreationFixtureAsComplete(),
    keyInfoPurposeData: keyInfoPurposeData(),
    inspectionDate: _inspectionDateFixture,
    valuationDate: _valuationDateFixture,
    asCompleteCommentary: _asCompleteCommentary,
    asStabilizedCommentary: _asStabilizedCommentary,
    asIsCommentary: _asIsCommentary
};