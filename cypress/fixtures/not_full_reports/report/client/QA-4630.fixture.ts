import ReportDataCreator from "../../../data_creator/reportData.creator";

export default {
    reportCreationData: ReportDataCreator.getReportData("4630"),
    clientFileNumber: `clientFileNumber-${Date.now()}_QA_4630`,
};