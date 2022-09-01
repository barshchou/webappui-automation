import Enums from "../../../../enums/enums";
import ReportDataCreator from "../../../data_creator/reportData.creator";

export default {
    reportCreationData: ReportDataCreator.getReportData("4529"),
    comparableFirst: {
        address: "200 West 78 Street",
        otherUtilityAdjustment: 40,
        otherNewUtilityAdjustment: -20
    },
    comparableSecond: {
        address: "1522 Myrtle Avenue",
        otherUtilityAdjustment: -50,
        otherNewUtilityAdjustment: 0
    },
    customUtilitiesAdjustmentDefaultName: "Other Utilities Adjustment",
    newCustomUtilitiesAdjustmentName: "new custom utilities adj name",
    otherUtilitiesCommentaries: "Other Utilities Adjustment:  Comparable 1 required a 40% " + 
    "upward adjustment. Comparable 2 required a 50% downward adjustment.",
    exportSectionName: Enums.EXPORT_TITLES.comparableSalesAdjustmentGrid,
    sectionToExport: [ Enums.SECTIONS_TO_INCLUDE_IN_EXPORT.salesComparisonApproach ]
};