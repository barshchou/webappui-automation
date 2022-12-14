import Enums from "../../../../enums/enums";
import ReportDataCreator from "../../../data_creator/reportData.creator";

export default {
    reportCreationData: ReportDataCreator.getReportData("4635"),
    intendedUser: Enums.PAGES_TEXTBOX_NAMES.intendedUser,
    identificationOfTheClient: Enums.PAGES_TEXTBOX_NAMES.identificationOfTheClient,
    textToType: "=F",
    verifyListValue: "Foreclosure Sale",
    verifyAreaValue: "The above transaction reflects a foreclosure sale of the property. Typically in a " + 
    "foreclosure sale, the buyer assumes all encumbrances on the site, including any outstanding mortgage " + 
    "amount and legal fees (\"upset costs\"), delinquent taxes and water and sewer charges, foreclosure " + 
    "sale fee, and realty transfer taxes. This information was requested from the owner; however, not provided.",
    matcher: "not.contain.text"
};