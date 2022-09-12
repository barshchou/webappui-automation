import Enums from "../../../../enums/enums";
import ReportDataCreator from "../../../data_creator/reportData.creator";

const inputValues = [
    {
        clientName: "Andrew Winston",
        clientFileNumber: "342354",
        nycbNumber: "543623",
        organization: "Greystone Servicing Corporation, Inc."
    },
    {
        clientName: "Betsy Lim",
        clientFileNumber: "675653",
        nycbNumber: "867834",
        organization: "Alpine Bank"
    },
    {
        clientName: "Joseph Weishaar",
        clientFileNumber: "654678",
        nycbNumber: "596416",
        organization: "Manhatten Valley LM Apartment"
    },
    {
        clientName: "Jorge Lopez",
        clientFileNumber: "435662",
        nycbNumber: "534530",
        organization: "Flip That House"
    }
];

export default {
    reportFreddieMac: ReportDataCreator.getReportData("6769", { templateValue: Enums.TEMPLATE_TYPE.freddieMac }),
    reportCreationData: ReportDataCreator.getReportData("6768"),
    inputValues
};