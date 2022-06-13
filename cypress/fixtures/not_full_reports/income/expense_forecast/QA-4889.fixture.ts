import { BoweryReports } from "../../../../types";
import ReportDataCreator from "../../../data_creator/reportData.creator";

const _electricityItem: BoweryReports.ForecastItem = { name: "electricity", basis: "unit", };
const _comparables: BoweryReports.Comparable[] = [
    {
        address: "6001 S Sacramento Ave",
        resUnits: 3,
        electricity: 10300,
    },
    {
        address: "7955 S Emerald Ave",
        resUnits: 2,
        electricity: 5805,
    },
    {
        address: "7613 S Kingston Ave",
        resUnits: 5,
        electricity: 18800,
    },
];

export default {
    reportCreationData: ReportDataCreator.getReportData("4889"),
    electricityItem: _electricityItem,
    comparables: _comparables,
    electricityCardSnapshotName: "Electricity_Forecast_Item_Component",
};
