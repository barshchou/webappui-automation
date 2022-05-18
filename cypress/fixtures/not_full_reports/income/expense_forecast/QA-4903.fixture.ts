import ReportDataCreator from "../../../data_creator/reportData.creator";

const reportCreationFixture = () => {
    return ReportDataCreator.getReportData("4903");
};

const _waterAndSewerItem: BoweryReports.ForecastItem = {
    name: "waterAndSewer",
    basis: "unit"
};

const _comparables: BoweryReports.Comparable[] = [
    {
        address: "6001 S Sacramento Ave",
        resUnits: 3,
        waterAndSewer: 5,
    },
    {
        address: "7955 S Emerald Ave",
        resUnits: 2,
        waterAndSewer: 2,
    },
    {
        address: "7613 S Kingston Ave",
        resUnits: 5,
        waterAndSewer: 40,
    },
];

export default {
    reportCreationData: reportCreationFixture(),
    comparables: _comparables,
    waterAndSewerItem: _waterAndSewerItem,
    waterAndSewerCardSnapshotName: "WaterAndSewer_Forecast_Item_Component",
};