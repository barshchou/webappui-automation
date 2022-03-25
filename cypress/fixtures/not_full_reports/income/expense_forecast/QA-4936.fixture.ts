import ReportDataCreator from "../../../data_creator/reportData.creator";
import {getCurrentMonthName, getYearFromDate} from "../../../../../utils/date.utils";

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
    actualFuelItem: {
        name: "fuel",
        basis: "sf",
        projection: 12000
    },
    t12FuelItem: {
        name: "fuel",
        basis: "sf",
        projection: 13000
    },
    historicalFuelItem: {
        name: "fuel",
        basis: "sf",
        projection: 14000
    },
    ownerProjectionFuelItem: {
        name: "fuel",
        basis: "sf",
        projection: 15000
    },
    fuelCardSnapshotName: "Fuel_Forecast_Item_Component"
}