import ReportDataCreator from "../../../../data_creator/reportData.creator";
import Enums from "../../../../../enums/enums";

const appraisers = [
    {   
        specName: "[QA-4445]",
        reportData: ReportDataCreator.getReportData(Enums.APPRAISER_SF.appraiserLeadReviewer, {}, true),
        leadAppraiser: "Andrew Babienco",
    }
];

export default {
    appraisers
};