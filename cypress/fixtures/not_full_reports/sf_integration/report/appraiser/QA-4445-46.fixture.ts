import ReportDataCreator from "../../../../data_creator/reportData.creator";
import Enums from "../../../../../enums/enums";

const appraisers = [
    {   
        specName: "[QA-4445]",
        reportData: ReportDataCreator.getReportData(Enums.SALESFORCE_JOBS.withoutFreddieMac, {}, true),
        leadAppraiser: "Andrew Babienco",
    },
    {
        specName: "[QA-4446]",
        reportData: ReportDataCreator.getReportData(Enums.SALESFORCE_JOBS.retail, {}, true),
        leadAppraiser: "James Dunne",
    },
];

export default {
    appraisers
};