import { Filter } from "mongodb";
import Enums from "../../../../enums/enums";
import ReportDataCreator from "../../../data_creator/reportData.creator";

const compProperty = Enums.COMP_PROPERTIES_PATHS_DB.compPropertyPathsInDB.saleStatus;
const compStatusDate = Enums.COMP_PROPERTIES_PATHS_DB.saleStatusValuesInDB.date;

const filter: Filter<object> = { $or: [ { [compProperty]: compStatusDate } ] };

export default {
    reportCreationData: ReportDataCreator.getReportData("4572"),
    comparableFirst: {
        address: "200 West 78 Street",
        sizeAdjustment: 20,
        conditionAdjustment: -30,
        otherAdjustment: 40,
        otherNewAdjustment: -20
    },
    comparableSecond: {
        address: "1522 Myrtle Avenue",
        sizeAdjustment: 40,
        conditionAdjustment: -10,
        otherAdjustment: -50,
        otherNewAdjustment: 0
    },
    otherAdjustmentName: "Other Adjustment",
    otherAdjustmentNewName: "test other adj name",
    filter,
    sectionToExport: [ Enums.SECTIONS_TO_INCLUDE_IN_EXPORT.salesComparisonApproach ],
    exportSection: Enums.EXPORT_TITLES.salesComparisonApproach
};