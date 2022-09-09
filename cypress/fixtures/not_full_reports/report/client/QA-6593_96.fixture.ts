import ReportDataCreator from "../../../data_creator/reportData.creator";

const clientNames = [
    "Andrew Winston",
    "Betsy Lim",
    "Joseph Weishaar",
    "Jorge Lopez"
];

const organizationNames = [
    "Greystone Servicing Corporation, Inc.",
    "Alpine Bank",
    "Manhatten Valley LM Apartment",
    "LLC, Flip That House"
];

const clientFileNumbers = [
    "342354",
    "543643",
    "143245",
    "767654"
];

export default {
    reportCreationData: ReportDataCreator.getReportData("6593_96"),
    clientNames,
    organizationNames,
    clientFileNumbers,
    nycbNumber: "424242"
};