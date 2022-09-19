import Enums from "../../../../enums/enums";
import ReportDataCreator from "../../../data_creator/reportData.creator";

export default {
    reportCreationData: ReportDataCreator.getReportData("4630"),
    clientFileNumber: `clientFileNumber-${Date.now()}_QA_4630`,
    applicationNumber: Enums.COVER_PAGE_LOCATOR_NAMES.applicationNumber
};