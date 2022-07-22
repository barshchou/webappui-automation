import ReportDataCreator from "../../../data_creator/reportData.creator";
import { getCurrentMonthName, getYearFromDate } from "../../../../../utils/date.utils";
import { BoweryReports } from "../../../../types/boweryReports.type";
import { BoweryAutomation } from "../../../../types/boweryAutomation.type";
import Enums from "../../../../enums/enums";


const reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("5812", {
    incomeValue: Enums.INCOME_TYPE.both,
    conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE
});

const buildingDescription: BoweryReports.BuildingDescription = {
    grossArea: 2897,
    numberOfUnits: 7
};

const _basis = "sf" as BoweryReports.UnitSF;

const periods = [
    {
        expensePeriodType: "Actual",
        year: Number(getYearFromDate()) - 1,
        replacementReserves: 12119,
        managementFees: 14232,
        miscellaneous: 24312
    },
    {
        expensePeriodType: "Projection",
        year: Number(getYearFromDate()) + 1,
        replacementReserves: 19191,
        managementFees: 32412,
        miscellaneous: 2121
    },
];

const periodsMonth = [
    {
        expensePeriodType: "Actual T12",
        month: getCurrentMonthName(),
        year: getYearFromDate(),
        replacementReserves: 4967,
        managementFees: 2345,
        miscellaneous: 6345
    },
    {
        expensePeriodType: "Annualized Historical",
        month: getCurrentMonthName(),
        year: getYearFromDate(),
        replacementReserves: 3426,
        managementFees: 4321,
        miscellaneous: 3290
    },
];

const actualTotalOperatingExpensesItem: BoweryReports.ForecastItem = {
    name: "total",
    basis: _basis,
    projection: periods[0].replacementReserves + periods[0].managementFees + periods[0].miscellaneous
};

const t12TotalOperatingExpensesItem: BoweryReports.ForecastItem = {
    name: "total",
    basis: _basis,
    projection: periodsMonth[0].replacementReserves + periodsMonth[0].managementFees + periodsMonth[0].miscellaneous
};

const historicalTotalOperatingExpensesItem: BoweryReports.ForecastItem = {
    name: "total",
    basis: _basis,
    projection: periodsMonth[1].replacementReserves + periodsMonth[1].managementFees + periodsMonth[1].miscellaneous
};

const ownerProjectionTotalOperatingExpensesItem: BoweryReports.ForecastItem = {
    name: "total",
    basis: _basis,
    projection: periods[1].replacementReserves + periods[1].managementFees + periods[1].miscellaneous
};

const totalOperatingExpensesPerSfCardSnapshotName = "TotalOperatingExpenses_PerSF_Forecast_Item_Component";

export default {
    reportCreationData,
    actualTotalOperatingExpensesItem,
    t12TotalOperatingExpensesItem,
    historicalTotalOperatingExpensesItem,
    ownerProjectionTotalOperatingExpensesItem,
    buildingDescription,
    periods,
    periodsMonth,
    totalOperatingExpensesPerSfCardSnapshotName,
};