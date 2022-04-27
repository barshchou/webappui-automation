import Enums from "../../../../enums/enums";
import ReportDataCreator from "../../../data_creator/reportData.creator";

export default {
    reportCreationData: ReportDataCreator.getReportSpecificConclusionValue(Enums.VALUE_CONCLUSION_TYPE.AS_STABILIZED, "4639"),
    textToType: "=Un",
    verifySuggestion: "Unchanged Renovation",
    verifyTextArea: "Upon renovation, the subject unit count and gross building area will remain unchanged."
};