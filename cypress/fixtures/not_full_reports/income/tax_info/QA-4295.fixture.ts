import Enums from "../../../../enums/enums";
import ReportDataCreator from "../../../data_creator/reportData.creator";


export default {
    reportCreationData: ReportDataCreator.getReportData("4295"),
    title: "Tax Calculation Discussion",
    commentary: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    tooltip: "The following text will appear below the Tax Liability table in your export",
    exportSectionName: Enums.EXPORT_TITLES.assessedValueAndRealEstateTaxes
};