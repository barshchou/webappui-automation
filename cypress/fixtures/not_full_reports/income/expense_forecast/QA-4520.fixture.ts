import { BoweryReports } from "../../../../types";
import ReportDataCreator from "../../../data_creator/reportData.creator";

const _insuranceItem: BoweryReports.ForecastItem = {
    name: "insurance",
    basis: "sf"
};

const _comparables: BoweryReports.Comparable[] = [
    {
        address: "6001 S Sacramento Ave",
        squareFeet: 6608,
        insurance: 10600
    },
    {
        address: "7955 S Emerald Ave",
        squareFeet: 9000,
        insurance: 7777
    },
    {
        address: "7613 S Kingston Ave",
        squareFeet: 9750,
        insurance: 17777
    },
];

export default {
    reportCreationData: ReportDataCreator.getReportData("4520"),
    insuranceItem: _insuranceItem,
    insuranceCardSnapshotName: "Insurance_Forecast_Item_Component",
    comparables: _comparables,
    cellName: "insurance"
};