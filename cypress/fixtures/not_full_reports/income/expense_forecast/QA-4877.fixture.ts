import ReportDataCreator from "../../../data_creator/reportData.creator";

const electricityItemFixture: BoweryReports.ForecastItem = {
    name: "electricity",
    basis: "sf"
};

export default {
    reportCreationData: ReportDataCreator.getDefaultReportData("4877"),
    comparables: [
        {
            address: "6001 S Sacramento Ave",
            squareFeet: 6608,
            electricity: 12675
        },
        {
            address: "7955 S Emerald Ave",
            squareFeet: 9000,
            electricity: 6754
        },
        {
            address: "7613 S Kingston Ave",
            squareFeet: 9750,
            electricity: 15917
        }
    ],
    electricityItem: electricityItemFixture,
    electricityCardSnapshotName: "Electricity_Forecast_Item_Component"
};