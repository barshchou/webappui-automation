import { BoweryReports } from "../../../../types";
import ReportDataCreator from "../../../data_creator/reportData.creator";

const _repairsAndMaintenanceItem: BoweryReports.ForecastItem = {
    name: "repairsAndMaintenance",
    basis: "sf"
};

export default {
    reportCreationData: ReportDataCreator.getReportData("4925"),
    repairsAndMaintenanceCardSnapshotName: "RepairsAndMaintenance_Forecast_Item_Component",

    comparables: [
        {
            address: "6001 S Sacramento Ave",
            squareFeet: 6608,
            repairsAndMaintenance: 12000
        },
        {
            address: "7955 S Emerald Ave",
            squareFeet: 9000,
            repairsAndMaintenance: 6000
        },
        {
            address: "7613 S Kingston Ave",
            squareFeet: 9750,
            repairsAndMaintenance: 15000
        }
    ],

    repairsAndMaintenanceItem: _repairsAndMaintenanceItem
};