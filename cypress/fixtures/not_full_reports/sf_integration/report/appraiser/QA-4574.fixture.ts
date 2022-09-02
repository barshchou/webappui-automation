import ReportDataCreator from "../../../../data_creator/reportData.creator";
import Enums from "../../../../../enums/enums";

const appraisers = [
    {   
        specName: "[QA-4445]",
        reportData: ReportDataCreator.getReportData(Enums.APPRAISER_SF.leadReviewerReviewer2, {}, true),
        leadAppraiser: "Scott  Powell",
        appraisers: [ "Carolyn Yates", "Harry  Newstreet" ]
    }
];

export default {
    appraisers
};