import Enums from "../../../../enums/enums";
import ReportDataCreator from "../../../data_creator/reportData.creator";

export default {
    reportCreationData: ReportDataCreator.getReportData("4067", {
        incomeValue: Enums.INCOME_TYPE.both,
        conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE
    }),
    leaseStatus: Enums.LEASE_STATUS.occupied,
    defaultValue: "Average",
    sectionToExport: Enums.SECTIONS_TO_INCLUDE_IN_EXPORT.descriptionOfImprovements
};