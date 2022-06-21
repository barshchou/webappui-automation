import { BoweryAutomation, BoweryReports } from "../../../../../types";
import ReportDataCreator from "../../../../data_creator/reportData.creator";
import Enums from "../../../../../enums/enums";

const _reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("4135", {
    incomeValue: Enums.INCOME_TYPE.both
});

const _allOccupiedStatuses: BoweryReports.LeaseStatus[] = [ "Occupied", "Occupied", "Occupied" ];
const _rentPSFs: number[] = [ 100, 200, 300 ];
const _someZeroRentPSFs: number[] = [ 100, 0, 300 ];
const _oneVacantStatus: BoweryReports.LeaseStatus[] = [ "Occupied", "Vacant", "Occupied" ];
const _allVacantStatuses: BoweryReports.LeaseStatus[] = [ "Vacant", "Vacant", "Vacant" ];

export default {
    reportCreationData: _reportCreationData,
    allOccupiedStatuses: _allOccupiedStatuses,
    unitsNumber: 3,
    rentPSFs: _rentPSFs,
    someZeroRentPSFs: _someZeroRentPSFs,
    oneVacantStatus: _oneVacantStatus,
    allVacantStatuses: _allVacantStatuses
};