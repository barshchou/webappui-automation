import Enums from "../../../../enums/enums";
import ReportDataCreator from "../../../data_creator/reportData.creator";

enum _aliases {
    PropertyRightsAppraised = "Property Rights Appraised",
    PreviewEditText = "aliasPreviewEditText"
}

export default {
    reportCreationData: ReportDataCreator.getReportData("4465", { conclusionValue: "AS_IS" }),
    textToVerify: [ "It's over, Anakin, I have the high ground", "You underestimate my power" ],
    aliases:_aliases,
    backLinkName: Enums.INTRODUCTION_TEXTBOX_NAMES.propertyRightsAppraised
};