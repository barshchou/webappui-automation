import ReportDataCreator from "../../../data_creator/reportData.creator";

export default {
    reportCreationData: ReportDataCreator.getReportData("4628"),
    clientFileNumber: `clientFileNumber-${Date.now()}_QA_4628`,
};