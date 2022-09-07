import ReportDataCreator from "../../../data_creator/reportData.creator";

const clientNames = [
    "Andrew Winston",
    "Brent Carter",
    "Joseph Weishaar",
    "Jorge Lopez"
];

const textOneClient = "The Intended User is Greystone Servicing Corporation, Inc.. The Intended Users are Greystone" + 
" Servicing Corporation, Inc.. This appraisal is not intended for any other use or user. No party or parties other" + 
" than the intended user may use or rely on the information, opinions and conclusions contained in this report.";

const textWithManyClient = "The Intended User is Greystone Servicing Corporation, Inc., Manhatten Valley" +
" LM Apartment, LLC, Flip That House, Inc. The Intended Users are Greystone Servicing Corporation, Inc.," +
" Manhatten Valley LM Apartment, LLC, Flip That House, Inc. This appraisal is not intended for any other" +
" use or user. No party or parties other than the intended user may use or rely on the information, opinions" +
" and conclusions contained in this report.";

export default {
    reportCreationData: ReportDataCreator.getReportData("6538-40"),
    clientNumber: "8675309",
    clientNames,
    textOneClient,
    textWithManyClient
};