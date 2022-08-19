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
        reportData: ReportDataCreator.getReportData(Enums.APPRAISER_SF.appraiserLeadReviewerReviewer2, {}, true),
        leadAppraiser: "James Dunne",
    },
    {
        specName: "[QA-4462]",
        reportData: ReportDataCreator.getReportData(Enums.APPRAISER_SF.noMatches, {}, true),
        leadAppraiser: "Brandon Gollotti",
    },
    {
        specName: "[QA-4474]",
        reportData: ReportDataCreator.getReportData(Enums.APPRAISER_SF.appraiserLead, {}, true),
        leadAppraiser: "Diana Zlatkina",
    },
];

export default {
    appraisers
};