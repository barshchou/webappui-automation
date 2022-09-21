import ReportDataCreator from "../../../../data_creator/reportData.creator";
import Enums from "../../../../../enums/enums";

export default {
    reportData: ReportDataCreator.getReportData(Enums.APPRAISER_SF.appraiserLeadReviewerReviewer2, {}, true),
    reviewer2: "James Dunne",
    state: Enums.ORGANIZATION_STATE.newYork,
};