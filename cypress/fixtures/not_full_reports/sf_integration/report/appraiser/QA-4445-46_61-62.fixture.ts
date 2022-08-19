import ReportDataCreator from "../../../../data_creator/reportData.creator";
import Enums from "../../../../../enums/enums";

const appraisers = [
    {   
        specName: "[QA-4445]",
        reportData: ReportDataCreator.getReportData(Enums.APPRAISER_SF.appraiserLeadReviewer, {}, true),
        leadAppraiser: "Andrew Babienco",
    },
    {
        specName: "[QA-4446_61]",
        reportData: ReportDataCreator.getReportData(Enums.APPRAISER_SF.reviewerReviewer2, {}, true),
        leadAppraiser: "James Dunne",
    },
    {
        specName: "[QA-4462]",
        reportData: ReportDataCreator.getReportData(Enums.APPRAISER_SF.noMatches, {}, true),
        leadAppraiser: "Helen Peng",
    },
];

export default {
    appraisers
};