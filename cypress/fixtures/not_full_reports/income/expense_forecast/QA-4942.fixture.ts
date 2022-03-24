import ReportDataCreator from "../../../data_creator/reportData.creator";

export default {
    reportCreationData: ReportDataCreator.getDefaultReportData("4942"),
    comparables: [
        {
            address: "6001 S Sacramento Ave",
            squareFeet: 6608,
            fuel: 12675
        },
        {
            address: "7955 S Emerald Ave",
            squareFeet: 9000,
            fuel: 6754
        },
        {
            address: "7613 S Kingston Ave",
            squareFeet: 9750,
            fuel: 15917
        }
    ],
    fuelItem: {
        name: "fuel",
        basis: "sf"
    },
    fuelCardSnapshotName: "Fuel_Forecast_Item_Component"
}