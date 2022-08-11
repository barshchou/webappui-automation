import ReportDataCreator from "../../../data_creator/reportData.creator";
import Enums from "../../../../enums/enums";
import { BoweryReports } from "../../../../types/boweryReports.type";
import { BoweryAutomation } from "../../../../types/boweryAutomation.type";

const _reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("4537", {
    incomeValue: Enums.INCOME_TYPE.both,
    conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE
});

export default {
    reportCreationData: _reportCreationData,
    numberOfCommercialUnits: 3,
    leaseStatus: "Occupied" as BoweryReports.LeaseStatus,
    verifySFValues: [ "3,043", "4,040", "2,500" ],
    sfValues: [ 3043, 4040, 2500 ]
};