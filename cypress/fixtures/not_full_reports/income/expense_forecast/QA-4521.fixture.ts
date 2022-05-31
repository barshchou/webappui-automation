import ReportDataCreator from "../../../data_creator/reportData.creator";
import { getCurrentMonthName, getYearFromDate } from "../../../../../utils/date.utils";

const _actualInsuranceItem: BoweryReports.ForecastItem = {
    name: "insurance",
    basis: "unit",
    projection: 10000
};

const _t12InsuranceIItem: BoweryReports.ForecastItem = {
    name: "insurance",
    basis: "unit",
    projection: 13000
};

const _historicalInsuranceIItem: BoweryReports.ForecastItem = {
    name: "insurance",
    basis: "unit",
    projection: 15000
};

const _ownerProjectionInsuranceIItem: BoweryReports.ForecastItem = {
    name: "insurance",
    basis: "unit",
    projection: 17000
};

const _buildingDescription: BoweryReports.BuildingDescription = {
    grossArea: 2500,
    numberOfUnits: 5,
};

const _periods: BoweryReports.Periods[] = [
    {
        expensePeriodType: "Actual",
        year: Number(getYearFromDate()) - 1,
        insurance: 10000,
    },
    {
        expensePeriodType: "Projection",
        year: Number(getYearFromDate()) + 1,
        insurance: 17000,
    }
];

const _periodsMonth: BoweryReports.Periods[] = [
    {
        expensePeriodType: "Actual T12",
        month: getCurrentMonthName(),
        year: getYearFromDate(),
        insurance: 13000,
    },
    {
        expensePeriodType: "Annualized Historical",
        month: getCurrentMonthName(),
        year: getYearFromDate(),
        insurance: 15000,
    },
];

export default {
    reportCreationData: ReportDataCreator.getReportData("4521"),
    actualInsuranceItem: _actualInsuranceItem,
    t12InsuranceIItem: _t12InsuranceIItem,
    historicalInsuranceIItem: _historicalInsuranceIItem,
    ownerProjectionInsuranceIItem: _ownerProjectionInsuranceIItem,
    buildingDescription: _buildingDescription,
    periods: _periods,
    periodsMonth: _periodsMonth,
    insuranceICardSnapshotName: "InsuranceI_Forecast_Item_Component",
};