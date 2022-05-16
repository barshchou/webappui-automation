import ReportDataCreator from "../../../data_creator/reportData.creator";

export default {
    reportCreationData: ReportDataCreator.getReportData("4650"),
    clientName: `client-${Cypress._.random(0, 1e6)}_QA_4650`,
    clientFileNumber: `clientFileNumber-${Cypress._.random(0, 1e6)}_QA_4650`,
};