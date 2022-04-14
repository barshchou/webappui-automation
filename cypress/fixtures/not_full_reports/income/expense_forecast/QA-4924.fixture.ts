import ReportDataCreator from "../../../data_creator/reportData.creator";
import { getCurrentMonthName, getYearFromDate } from "../../../../../utils/date.utils";

const _buildingDescription: BoweryReports.BuildingDescription = {
    grossArea: 200,
    numberOfUnits: 2
};

const _actualRepairsAndMaintenanceItem: BoweryReports.ForecastItem = {
    name: "repairsAndMaintenance",
    basis: "sf",
    projection: 12000
}

const _t12RepairsAndMaintenanceItem: BoweryReports.ForecastItem = {
    name: "repairsAndMaintenance",
    basis: "sf",
    projection: 13000
}

const _historicalRepairsAndMaintenanceItem: BoweryReports.ForecastItem = {
    name: "repairsAndMaintenance",
    basis: "sf",
    projection: 14000
}

const _ownerProjectionRepairsAndMaintenanceItem: BoweryReports.ForecastItem = {
    name: "repairsAndMaintenance",
    basis: "sf",
    projection: 15000
}




export default {
    reportCreationData: ReportDataCreator.getDefaultReportData("4924"),
    buildingDescription: _buildingDescription,
    actualRepairsAndMaintenanceItem: _actualRepairsAndMaintenanceItem,
    t12RepairsAndMaintenanceItem: _t12RepairsAndMaintenanceItem,
    historicalRepairsAndMaintenanceItem: _historicalRepairsAndMaintenanceItem,
    ownerProjectionRepairsAndMaintenanceItem: _ownerProjectionRepairsAndMaintenanceItem,
    repairsAndMaintenanceCardSnapshotName: "RepairsAndMaintenance_Forecast_Item_Component",
    actual: {
        periodValue: "Actual",
        month: "December",
        expenseYear: Number(getYearFromDate()) - 1,
        repairsAndMaintenanceExpense: 12000
    },
    t12: {
        periodValue: "Actual T12",
        month: getCurrentMonthName(),
        expenseYear: getYearFromDate(),
        repairsAndMaintenanceExpense: 13000
    },
    historical: {
        periodValue: "Annualized Historical",
        month: getCurrentMonthName(),
        expenseYear: getYearFromDate(),
        repairsAndMaintenanceExpense: 14000
    },
    projection: {
        periodValue: "Projection",
        month: "December",
        expenseYear: Number(getYearFromDate()) + 1,
        repairsAndMaintenanceExpense: 15000
    }


}

