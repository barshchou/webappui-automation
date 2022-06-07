import ReportDataCreator from "../../../data_creator/reportData.creator";

export default {
    reportCreationData: ReportDataCreator.getReportData("4650"),
    clientName: `client-${Date.now()}_QA_4650`,
    clientFileNumber: `clientFileNumber-${Date.now()}_QA_4650`,
};