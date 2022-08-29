import ReportDataCreator from "../../../data_creator/reportData.creator";
import Enums from "../../../../enums/enums";

export default {
    reportCreationData: ReportDataCreator.getReportData("4721_24-26"),
    enterValue: "=Unc",
    enterSecondValue: "=Blo",
    listValue: "Unchanged Renovations",
    secondListValue: "Block",
    verifyTaxValue: "Upon renovation, the subject unit count and gross building area will remain unchanged.",
    verifySecondTaxValue: "962",
    propertyRightsAppraisedTitle: Enums.PAGES_TEXTBOX_NAMES.propertyRightsAppraised,
    definitionOfMarketValueTitle: Enums.PAGES_TEXTBOX_NAMES.definitionOfMarketValue
};