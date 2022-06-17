import Enums from "../../../../enums/enums";
import { BoweryReports } from "../../../../types";
import ReportDataCreator from "../../../data_creator/reportData.creator";


export const reportCreationData = conclusionValue => {
    return ReportDataCreator.getReportData("4230", {
        incomeValue: Enums.INCOME_TYPE.both,
            conclusionValue: conclusionValue
    });
};  

const comparableFixture = () => {
    return {
        address: "200 West 78 Street",
    };
};

const _initialCommentaryValues = [
    "and no adjustment was warranted.",
    "The subject property was constructed in",
    "The comparables sold in similar condition to the subject, and no adjustment was warranted.",
];

const _generateCommentaryValues = [
    "in an inferior condition, and thus required a positive adjustment.",
    "in a superior condition, and thus required a negative adjustment."
];

export default {
    initialCommentaryValues: _initialCommentaryValues,
    generateCommentaryValues: _generateCommentaryValues,
    otherAdjustment: [ 42, -42 ],
    comparable: Object.freeze(comparableFixture()),
    calculationUnits: [ "Per Residential Units", "PSF", "Per Total Units" ], 
    basis: "Price per Unit",
    marketConditions: [ "marketConditions" ],
    conclusionValues: [
        Enums.VALUE_CONCLUSION_TYPE.AS_IS,
        Enums.VALUE_CONCLUSION_TYPE.AS_STABILIZED,
    ] as Array<BoweryReports.ConclusionValue>
};