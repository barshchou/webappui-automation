import ReportDataCreator from "../../../data_creator/reportData.creator";
import { getCurrentMonthName, getYearFromDate } from "../../../../../utils/date.utils";
import { BoweryReports } from "../../../../types/boweryReports.type";
import { BoweryAutomation } from "../../../../types/boweryAutomation.type";
import Enums from "../../../../enums/enums";


const reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("5772", {
    incomeValue: Enums.INCOME_TYPE.both,
    conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE
});

const buildingDescription: BoweryReports.BuildingDescription = {
    grossArea: 2897,
    numberOfUnits: 7
};

const _basis = "sf" as BoweryReports.UnitSF;

const actualGeneralAndAdministrativeItem: BoweryReports.ForecastItem = {
    name: "generalAndAdministrative",
    basis: _basis,
    projection: 12119
};

const t12GeneralAndAdministrativeItem: BoweryReports.ForecastItem = {
    name: "generalAndAdministrative",
    basis: _basis,
    projection: 4967
};

const historicalGeneralAndAdministrativeItem: BoweryReports.ForecastItem = {
    name: "generalAndAdministrative",
    basis: _basis,
    projection: 3426
};

const ownerProjectionGeneralAndAdministrativeItem: BoweryReports.ForecastItem = {
    name: "generalAndAdministrative",
    basis: _basis,
    projection: 19191
};

const periods = [
    {
        expensePeriodType: "Actual",
        year: Number(getYearFromDate()) - 1,
        generalAndAdministrative: 12119
    },
    {
        expensePeriodType: "Projection",
        year: Number(getYearFromDate()) + 1,
        generalAndAdministrative: 19191
    },
];

const periodsMonth = [
    {
        expensePeriodType: "Actual T12",
        month: getCurrentMonthName(),
        year: getYearFromDate(),
        generalAndAdministrative: 4967
    },
    {
        expensePeriodType: "Annualized Historical",
        month: getCurrentMonthName(),
        year: getYearFromDate(),
        generalAndAdministrative: 3426
    },
];

const generalAndAdministrativePerSfCardSnapshotName = "GeneralAndAdministrative_PerSF_Forecast_Item_Component";

export default {
    reportCreationData,
    actualGeneralAndAdministrativeItem,
    t12GeneralAndAdministrativeItem,
    historicalGeneralAndAdministrativeItem,
    ownerProjectionGeneralAndAdministrativeItem,
    buildingDescription,
    periods,
    periodsMonth,
    generalAndAdministrativePerSfCardSnapshotName,
};