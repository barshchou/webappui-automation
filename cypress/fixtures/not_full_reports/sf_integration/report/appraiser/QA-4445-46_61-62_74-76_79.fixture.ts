import ReportDataCreator from "../../../../data_creator/reportData.creator";
import Enums from "../../../../../enums/enums";

const appraisers = [
    {   
        specName: "[QA-4445]",
        reportData: ReportDataCreator.getReportData(Enums.APPRAISER_SF.appraiserLeadReviewer, {}, true),
        leadAppraiser: "Andrew Babienco",
    },
    {
        specName: "[QA-4446]",
        reportData: ReportDataCreator.getReportData(Enums.APPRAISER_SF.appraiserLeadReviewerReviewer2, {}, true),
        leadAppraiser: "James Dunne",
    },
    {
        specName: "[QA-4461]",
        reportData: ReportDataCreator.getReportData(Enums.APPRAISER_SF.reviewerReviewer2, {}, true),
        leadAppraiser: "Cynthia Xu",
    },
    {
        specName: "[QA-4462]",
        reportData: ReportDataCreator.getReportData(Enums.APPRAISER_SF.noMatches, {}, true),
        leadAppraiser: "Cynthia Xu",
    },
    {
        specName: "[QA-4474]",
        reportData: ReportDataCreator.getReportData(Enums.APPRAISER_SF.appraiserLead, {}, true),
        leadAppraiser: "Diana Zlatkina",
    },
    {
        specName: "[QA-4475]",
        reportData: ReportDataCreator.getReportData(Enums.APPRAISER_SF.appraiser, {}, true),
        leadAppraiser: "Cynthia Xu",
    },
    {
        specName: "[QA-4476]",
        reportData: ReportDataCreator.getReportData(Enums.APPRAISER_SF.reviewer2, {}, true),
        leadAppraiser: "Cynthia Xu",
    },
    {
        specName: "[QA-4479]",
        reportData: ReportDataCreator.getReportData(Enums.APPRAISER_SF.emptyTeam, {}, true),
        leadAppraiser: "Brandon Gollotti",
    }
];

export default {
    appraisers
};