import ReportDataCreator from "../../../data_creator/reportData.creator";
import Enums from "../../../../enums/enums";
import { BoweryReports } from "../../../../types/boweryReports.type";
import { BoweryAutomation } from "../../../../types/boweryAutomation.type";

const _grossBuildingArea = 5000;
const _numberOfCommercialUnits = 3;
const _numberOfResidentialUnits = 5;

const _otherIncomeItem: BoweryReports.OtherIncomeItem = {
    vcLossType: "Other",
    vcPercent: 2,
    incomeCategory: "Billboard",
    annualAmount: 4422.79
};

const _annualIncomePerSf = _otherIncomeItem.annualAmount / _grossBuildingArea;
const _annualIncomePerUnit = _otherIncomeItem.annualAmount / _numberOfResidentialUnits;

const _reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("4513-15", {
    incomeValue: Enums.INCOME_TYPE.both
});

export default {
    reportCreationData: _reportCreationData,
    grossBuildingArea: _grossBuildingArea,
    numberOfResidentialUnits: _numberOfResidentialUnits,
    numberOfCommercialUnits: _numberOfCommercialUnits,
    annualIncomePerSf: _annualIncomePerSf,
    annualIncomePerUnit: _annualIncomePerUnit,
    otherIncomeItem: _otherIncomeItem
};