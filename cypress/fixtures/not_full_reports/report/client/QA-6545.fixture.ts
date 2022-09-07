import ReportDataCreator from "../../../data_creator/reportData.creator";
import ClientCreationData from "../../../data_creator/clientData.creator";

export default {
    reportCreationData: ReportDataCreator.getReportData("6535"),
    clientNumber: "8675309",
    clientCreationData: ClientCreationData.getDefaultClientData(),
    clientName: "Andrew Winston",
    addedClient: "Harley Young",
    enterAddedClient: "Harley"
};