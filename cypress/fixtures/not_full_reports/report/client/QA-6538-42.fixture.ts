import Enums from "../../../../enums/enums";
import ReportDataCreator from "../../../data_creator/reportData.creator";

const clientNames = [
    "Andrew Winston",
    "Brent Carter",
    "Joseph Weishaar",
    "Jorge Lopez"
];

const intendedUserText = {
    oneClient: "The Intended User is Greystone Servicing Corporation, Inc.." +
    " This appraisal is not intended for any other use or user. No party or parties other" + 
    " than the intended user may use or rely on the information, opinions and conclusions" + 
    " contained in this report.",

    manyClient:  "The Intended Users are Greystone Servicing Corporation, Inc.," +
    " Manhatten Valley LM Apartment, LLC, Flip That House, Inc. This appraisal is not intended" + 
    " for any other use or user. No party or parties other than the intended user may use or rely" +
    " on the information, opinions and conclusions contained in this report."
};

const identificationOfTheClientText = {
    oneClient: "Greystone Servicing Corporation, Inc. has engaged Bowery Valuation and is Bowery Valuation’s" +
    " client for this assignment.",

    manyClient: "Greystone Servicing Corporation, Inc., Manhatten Valley LM Apartment, LLC," + 
    " Flip That House, Inc have engaged Bowery Valuation and are Bowery Valuation’s clients for" +
    " this assignment"
};

export default {
    reportCreationData: ReportDataCreator.getReportData("6538-42"),
    intendedUser: Enums.PAGES_TEXTBOX_NAMES.intendedUser,
    identificationOfTheClient: Enums.PAGES_TEXTBOX_NAMES.identificationOfTheClient,
    clientNames,
    intendedUserText,
    identificationOfTheClientText
};