import ReportDataCreator from "../../../data_creator/reportData.creator";
import { getCurrentMonthName, getYearFromDate } from "../../../../../utils/date.utils";
import { BoweryReports } from "../../../../types/boweryReports.type";
import { BoweryAutomation } from "../../../../types/boweryAutomation.type";
import Enums from "../../../../enums/enums";


const reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("5771", {
    incomeValue: Enums.INCOME_TYPE.both,
    conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE
});

const buildingDescription: BoweryReports.BuildingDescription = {
    grossArea: 2897,
    numberOfUnits: 7
};

const _basis = "sf" as BoweryReports.UnitSF;

const actualPayrollAndBenefitsItem: BoweryReports.ForecastItem = {
    name: "payrollAndBenefits",
    basis: _basis,
    projection: 12119
};

const t12PayrollAndBenefitsItem: BoweryReports.ForecastItem = {
    name: "payrollAndBenefits",
    basis: _basis,
    projection: 4967
};

const historicalPayrollAndBenefitsItem: BoweryReports.ForecastItem = {
    name: "payrollAndBenefits",
    basis: _basis,
    projection: 3426
};

const ownerProjectionPayrollAndBenefitsItem: BoweryReports.ForecastItem = {
    name: "payrollAndBenefits",
    basis: _basis,
    projection: 19191
};

const periods = [
    {
        expensePeriodType: "Actual",
        year: Number(getYearFromDate()) - 1,
        payrollAndBenefits: 12119
    },
    {
        expensePeriodType: "Projection",
        year: Number(getYearFromDate()) + 1,
        payrollAndBenefits: 19191
    },
];

const periodsMonth = [
    {
        expensePeriodType: "Actual T12",
        month: getCurrentMonthName(),
        year: getYearFromDate(),
        payrollAndBenefits: 4967
    },
    {
        expensePeriodType: "Annualized Historical",
        month: getCurrentMonthName(),
        year: getYearFromDate(),
        payrollAndBenefits: 3426
    },
];

const payrollAndBenefitsPerSfCardSnapshotName = "PayrollAndBenefits_PerSF_Forecast_Item_Component";

export default {
    reportCreationData,
    actualPayrollAndBenefitsItem,
    t12PayrollAndBenefitsItem,
    historicalPayrollAndBenefitsItem,
    ownerProjectionPayrollAndBenefitsItem,
    buildingDescription,
    periods,
    periodsMonth,
    payrollAndBenefitsPerSfCardSnapshotName,
};