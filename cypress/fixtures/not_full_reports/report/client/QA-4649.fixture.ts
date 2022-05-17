import ReportDataCreator from "../../../data_creator/reportData.creator";

export default {
    reportCreationData: ReportDataCreator.getReportData("4649"),
    clientName: `client-${Date.now()}_QA_4649`,
    clientFileNumber: `clientFileNumber-${Date.now()}_QA_4649`,
};