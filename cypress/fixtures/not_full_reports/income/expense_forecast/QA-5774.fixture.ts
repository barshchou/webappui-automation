import ReportDataCreator from "../../../data_creator/reportData.creator";
import { getCurrentMonthName, getYearFromDate } from "../../../../../utils/date.utils";
import { BoweryReports } from "../../../../types/boweryReports.type";
import { BoweryAutomation } from "../../../../types/boweryAutomation.type";
import Enums from "../../../../enums/enums";


const reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("5774", {
    incomeValue: Enums.INCOME_TYPE.both,
    conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE
});

const buildingDescription: BoweryReports.BuildingDescription = {
    grossArea: 2897,
    numberOfUnits: 7
};

const _basis = "sf" as BoweryReports.UnitSF;

const actualMiscellaneousItem: BoweryReports.ForecastItem = {
    name: "miscellaneous",
    basis: _basis,
    projection: 12119
};

const t12MiscellaneousItem: BoweryReports.ForecastItem = {
    name: "miscellaneous",
    basis: _basis,
    projection: 4967
};

const historicalMiscellaneousItem: BoweryReports.ForecastItem = {
    name: "miscellaneous",
    basis: _basis,
    projection: 3426
};

const ownerProjectionMiscellaneousItem: BoweryReports.ForecastItem = {
    name: "miscellaneous",
    basis: _basis,
    projection: 19191
};

const periods = [
    {
        expensePeriodType: "Actual",
        year: Number(getYearFromDate()) - 1,
        miscellaneous: 12119
    },
    {
        expensePeriodType: "Projection",
        year: Number(getYearFromDate()) + 1,
        miscellaneous: 19191
    },
];

const periodsMonth = [
    {
        expensePeriodType: "Actual T12",
        month: getCurrentMonthName(),
        year: getYearFromDate(),
        miscellaneous: 4967
    },
    {
        expensePeriodType: "Annualized Historical",
        month: getCurrentMonthName(),
        year: getYearFromDate(),
        miscellaneous: 3426
    },
];

const miscellaneousPerSfCardSnapshotName = "Miscellaneous_PerSF_Forecast_Item_Component";

export default {
    reportCreationData,
    actualMiscellaneousItem,
    t12MiscellaneousItem,
    historicalMiscellaneousItem,
    ownerProjectionMiscellaneousItem,
    buildingDescription,
    periods,
    periodsMonth,
    miscellaneousPerSfCardSnapshotName,
};