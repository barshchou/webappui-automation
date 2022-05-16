import ReportDataCreator from "../../../data_creator/reportData.creator";

export default {
    reportCreationData: ReportDataCreator.getReportData("4628"),
    clientFileNumber: `clientFileNumber-${Cypress._.random(0, 1e6)}_QA_4628`,
};