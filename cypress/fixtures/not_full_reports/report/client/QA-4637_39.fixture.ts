import Enums from "../../../../enums/enums";
import ReportDataCreator from "../../../data_creator/reportData.creator";

const data = [
    {
        specName: "[QA-4637]",
        textToType: "=F",
        verifySuggestion: "Foreclosure Sale",
        verifyTextArea: "The above transaction reflects a foreclosure sale of the property. Typically " + 
        "in a foreclosure sale, the buyer assumes all encumbrances on the site, including any outstanding " + 
        "mortgage amount and legal fees (\"upset costs\"), delinquent taxes and water and sewer charges, " + 
        "foreclosure sale fee, and realty transfer taxes. This information was requested from the owner; " + 
        "however, not provided."
    },
    {
        specName: "[QA-4639]",
        textToType: "=Un",
        verifySuggestion: "Unchanged Renovation",
        verifyTextArea: "Upon renovation, the subject unit count and gross building area will remain unchanged."
    }
];

export default {
    reportCreationData: ReportDataCreator.getReportData("4637_39"),
    intendedUser: Enums.PAGES_TEXTBOX_NAMES.intendedUser,
    identificationOfTheClient: Enums.PAGES_TEXTBOX_NAMES.identificationOfTheClient,
    data
};