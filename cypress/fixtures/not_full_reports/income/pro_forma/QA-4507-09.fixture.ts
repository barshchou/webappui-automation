import ReportDataCreator from "../../../data_creator/reportData.creator";
import Enums from "../../../../enums/enums";
import { BoweryAutomation, BoweryReports } from "../../../../types";

const _grossBuildingArea = 5000;
const _numberOfCommercialUnits = 3;
const _numberOfResidentialUnits = 5;
const _laundryIncome = 4567.99;

const _laundryIncomePerSf = _laundryIncome / _grossBuildingArea;
const _laundryIncomePerUnit = _laundryIncome / _numberOfResidentialUnits;

const _reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("4507-09", {
        incomeValue: Enums.INCOME_TYPE.both
    });

const _leaseStatuses: Array<BoweryReports.LeaseStatus> = [ "Occupied", "Occupied", "Occupied" ];

export default {
    reportCreationData: _reportCreationData,
    grossBuildingArea: _grossBuildingArea,
    numberOfResidentialUnits: _numberOfResidentialUnits,
    numberOfCommercialUnits: _numberOfCommercialUnits,
    leaseStatuses: _leaseStatuses,
    laundryIncome: _laundryIncome,
    laundryIncomePerSf: _laundryIncomePerSf,
    laundryIncomePerUnit: _laundryIncomePerUnit,
};