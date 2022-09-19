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
    reportFreddieMac: ReportDataCreator.getReportData("6770_6816", { templateValue: Enums.TEMPLATE_TYPE.freddieMac }),
    inputValues,
    locatorContains: "The report is for the use and benefit of, and may be relied upon by",
    formCommentName: Enums.PAGES_TEXTBOX_NAMES.clientGuidelinesDiscussion
};