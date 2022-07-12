import ReportDataCreator from "../../../data_creator/reportData.creator";
import ClientCreationData from "../../../data_creator/clientData.creator";

export default {
    reportCreationData: ReportDataCreator.getReportData("4627"),
    clientCreationData: ClientCreationData.getDefaultClientData(),
    shortTextToType: "Harl",
    textToType: "Harley Young",
    companyName: "Test Company & CO",
};