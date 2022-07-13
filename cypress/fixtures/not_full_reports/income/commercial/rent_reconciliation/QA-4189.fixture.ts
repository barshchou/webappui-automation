import ReportDataCreator from "../../../../data_creator/reportData.creator";
import Enums from "../../../../../enums/enums";
import { BoweryAutomation } from "../../../../../types/boweryAutomation.type";
import { BoweryReports } from "../../../../../types/boweryReports.type";

const _reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("4189", {
    incomeValue: Enums.INCOME_TYPE.both
});

const _leaseStatuses: BoweryReports.LeaseStatus[] = [ "Occupied", "Occupied" ];
const _rentPSFs: number[] = [ 100, 200 ];

export default {
    reportCreationData: _reportCreationData,
    leaseStatuses: _leaseStatuses,
    unitsNumber: 2,
    numberOfComparables: 2,
    rentPSFs: _rentPSFs,
    compGroupName: "TestCompGroup_4189",
    rentPSFLabelName: "Rent/SF/Month"
};