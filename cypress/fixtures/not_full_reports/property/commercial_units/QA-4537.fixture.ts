import ReportDataCreator from "../../../data_creator/reportData.creator";
import Enums from "../../../../enums/enums";

const _reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("4536", {
    incomeValue: Enums.INCOME_TYPE.BOTH,
    conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE
});

export default {
    reportCreationData: _reportCreationData,
    numberOfCommercialUnits: 3,
    leaseStatus: "Occupied" as BoweryReports.LeaseStatus,
    sfValues: [3043, 4040, 2500]
};