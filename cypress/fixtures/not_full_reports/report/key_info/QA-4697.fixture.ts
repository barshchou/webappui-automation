import Enums from "../../../../enums/enums";
import ReportDataCreator from "../../../data_creator/reportData.creator";

const _feeSimple = [ 
    Enums.INTEREST_APPRAISED.simpleInterest,
];

const _interestAppraisedLeasedFee = [ 
    Enums.INTEREST_APPRAISED.leasedFee
];

const _leasehold = [
    Enums.INTEREST_APPRAISED.leasehold,
    Enums.INTEREST_APPRAISED.leasehold
];

const _interestAppraisedFeeSimple = [
    Enums.INTEREST_APPRAISED.simpleInterest,
    Enums.INTEREST_APPRAISED.simpleInterest
];

const _leasedFee = [
    Enums.INTEREST_APPRAISED.leasedFee,
    Enums.INTEREST_APPRAISED.leasedFee,
    Enums.INTEREST_APPRAISED.leasedFee
];

const _interestAppraisedLeaseHold = [
    Enums.INTEREST_APPRAISED.leasehold,
    Enums.INTEREST_APPRAISED.leasehold,
    Enums.INTEREST_APPRAISED.leasehold
];

const dataFixture = [
    {
        conclusionValue:  Enums.VALUE_CONCLUSION_TYPE.AS_IS,
        firstCheck: _feeSimple,
        interestAppraised: _interestAppraisedLeasedFee,
        reportInclude: { isAsStabilized: false, asCompleteInterests: false },
        commentToBe: "In this appraisal we provide an opinion of As Is Market Value of the leased fee interest"
    },
    {
        conclusionValue:  Enums.VALUE_CONCLUSION_TYPE.AS_STABILIZED,
        firstCheck: _leasehold,
        interestAppraised: _interestAppraisedFeeSimple,
        reportInclude: { isAsStabilized: true, asCompleteInterests: false },
        commentToBe: "In this appraisal we provide an opinion of As Is Market Value of the fee simple interest" +
        " and the Prospective Market Value Upon Stabilization of occupancy of the fee simple interest"
    },
    {
        conclusionValue:  Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE,
        firstCheck: _leasedFee,
        interestAppraised: _interestAppraisedLeaseHold,
        asCompleteInterests: true,
        reportInclude: { isAsStabilized: true, asCompleteInterests: true },
        commentToBe: "In this appraisal we provide an opinion of As Is Market Value of the leasehold interest," +
        " the Prospective Market Value Upon Completion of the proposed renovations of the leasehold interest and" +
        " the Prospective Market Value Upon Stabilization of occupancy of the leasehold interest"
    }
];

export const reportCreationFixture = (conclusionValue) => {
    return ReportDataCreator.getReportData("4697", {
        templateValue: Enums.TEMPLATE_TYPE.freddieMac,
        incomeValue: Enums.INCOME_TYPE.both,
        conclusionValue
    });
};

export default {
    dataFixture,
    propertyRightsAppraised: Enums.PAGES_TEXTBOX_NAMES.propertyRightsAppraised,
    letterOfTransmittalPurpose: Enums.PAGES_TEXTBOX_NAMES.letterOfTransmittalPurpose
};