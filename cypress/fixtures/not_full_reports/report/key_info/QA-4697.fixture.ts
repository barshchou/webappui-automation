import Enums from "../../../../enums/enums";
import ReportDataCreator from "../../../data_creator/reportData.creator";

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

const dataFixture = [
    {
        conclusionValue:  Enums.VALUE_CONCLUSION_TYPE.AS_IS,
        interestAppraised: _interestAppraisedLeasedFee,
        reportInclude: { isAsStabilized: false, asCompleteInterests: false },
        commentToBe: "In this appraisal we provide an opinion of As Is Market Value of the leased fee interest"
    },
    {
        conclusionValue:  Enums.VALUE_CONCLUSION_TYPE.AS_STABILIZED,
        interestAppraised: _interestAppraisedFeeSimple,
        reportInclude: { isAsStabilized: true, asCompleteInterests: false },
        commentToBe: "In this appraisal we provide an opinion of As Is Market Value of the Interest Appraised" +
        " As Is Market Value selection and the Prospective Market Value Upon Stabilization of occupancy" +
        " of the fee simple interest"
    },
    {
        conclusionValue:  Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE,
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