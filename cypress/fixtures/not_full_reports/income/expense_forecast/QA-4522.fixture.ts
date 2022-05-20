import ReportDataCreator from "../../../data_creator/reportData.creator";

const reportCreationFixture = () => {
    return ReportDataCreator.getReportData("4522");
};

const _insuranceItem: BoweryReports.ForecastItem = {
    name: "insurance",
    basis: "unit"
};

const _comparables: BoweryReports.Comparable[] = [
    {
        address: "6001 S Sacramento Ave",
        resUnits: 3,
        insurance: 1500.27,
    },
    {
        address: "7955 S Emerald Ave",
        resUnits: 6,
        insurance: 1200.99,
    },
    {
        address: "7613 S Kingston Ave",
        resUnits: 12,
        insurance: 2569.01,
    },
];

export default {
    reportCreationData: reportCreationFixture(),
    comparables: _comparables,
    insuranceItem: _insuranceItem,
    insuranceCardSnapshotName: "Insurance_Forecast_Item_Component",
};