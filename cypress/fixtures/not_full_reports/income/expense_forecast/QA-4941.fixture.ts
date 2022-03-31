import ReportDataCreator from "../../../data_creator/reportData.creator";
import {getCurrentMonthName, getYearFromDate} from "../../../../../utils/date.utils";

const _actualFuelItem: BoweryReports.ForecastItem = {
    name: "fuel",
    basis: "sf",
    projection: 12000
}

const _t12FuelItem: BoweryReports.ForecastItem = {
    name: "fuel",
    basis: "sf",
    projection: 13000
}

const _historicalFuelItem: BoweryReports.ForecastItem = {
    name: "fuel",
    basis: "sf",
    projection: 14000
}

const _ownerProjectionFuelItem: BoweryReports.ForecastItem = {
    name: "fuel",
    basis: "sf",
    projection: 15000
}

export default {
    reportCreationData: ReportDataCreator.getDefaultReportData("4941"),
    buildingDescription: {
        grossArea: 5000,
        numberOfUnits: 2
    },
    actual: {
        periodValue: "Actual",
        month: "December",
        expenseYear: Number(getYearFromDate()) - 1,
        fuelExpense: 12000
    },
    t12: {
        periodValue: "Actual T12",
        month: getCurrentMonthName(),
        expenseYear: getYearFromDate(),
        fuelExpense: 13000
    },
    historical: {
        periodValue: "Annualized Historical",
        month: getCurrentMonthName(),
        expenseYear: getYearFromDate(),
        fuelExpense: 14000
    },
    projection: {
        periodValue: "Projection",
        month: "December",
        expenseYear: Number(getYearFromDate()) + 1,
        fuelExpense: 15000
    },
    actualFuelItem: _actualFuelItem,
    t12FuelItem: _t12FuelItem,
    historicalFuelItem: _historicalFuelItem,
    ownerProjectionFuelItem: _ownerProjectionFuelItem,
    fuelCardSnapshotName: "Fuel_Forecast_Item_Component"
}