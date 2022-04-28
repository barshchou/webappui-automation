import ReportDataCreator from "../../../data_creator/reportData.creator";

export default {
    reportCreationData: ReportDataCreator.getDefaultReportData("4628"),
    clientFileNumber: `clientFileNumber-${Cypress._.random(0,1e6)}_QA_4628`,
};