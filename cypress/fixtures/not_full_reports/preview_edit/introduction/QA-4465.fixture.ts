import ReportDataCreator from "../../../data_creator/reportData.creator";

enum _aliases {
    PropertyRightsAppraised = "Property Rights Appraised",
    PreviewEditText = "aliasPreviewEditText"
}

const _backLinkName = "Property Rights Appraised";

export default {
    reportCreationData: ReportDataCreator.getReportData("4465", { conclusionValue: "AS_IS" }),
    textToVerify: [ "It's over, Anakin, I have the high ground", "You underestimate my power" ],
    aliases:_aliases,
    backLinkName: _backLinkName
};