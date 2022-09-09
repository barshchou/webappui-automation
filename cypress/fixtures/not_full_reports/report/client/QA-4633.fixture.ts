import Enums from "../../../../enums/enums";
import ReportDataCreator from "../../../data_creator/reportData.creator";

export default {
    reportCreationData: ReportDataCreator.getReportData("4633"),
    intendedUser: Enums.PAGES_TEXTBOX_NAMES.intendedUser,
    identificationOfTheClient: Enums.PAGES_TEXTBOX_NAMES.identificationOfTheClient,
    textToType: "=Un",
    verifySuggestion: "Unchanged Renovation",
    verifyIntendedUserTextArea: "The Intended User is Client Organization. This appraisal is not intended for " + 
    "any other use or user. No party or parties other than the intended user may use or rely on the " + 
    "information, opinions and conclusions contained in this report.",
    verifyIdentificationOfTheClientTextArea: "Client Company has engaged Bowery Valuation and is " + 
    "Bowery Valuation’s client for this assignment."
};