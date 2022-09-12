import Enums from "../../../../enums/enums";
import ReportDataCreator from "../../../data_creator/reportData.creator";

export default {
    reportCreationData: ReportDataCreator.getReportData("4636"),
    intendedUser: Enums.PAGES_TEXTBOX_NAMES.intendedUser,
    identificationOfTheClient:  Enums.PAGES_TEXTBOX_NAMES.identificationOfTheClient,
    textToType: "=Un",
    verifySuggestion: "Unchanged Renovation",
    verifyTextArea: "Upon renovation, the subject unit count and gross building area will remain unchanged."
};