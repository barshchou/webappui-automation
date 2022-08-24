import Enums from "../../../../enums/enums";
import ReportDataCreator from "../../../data_creator/reportData.creator";

const checkboxes = Object.values(Enums.AMENITIES_CHECKBOXES);

export default {
    reportCreationData: ReportDataCreator.getReportData("4626"),
    checkboxes
};