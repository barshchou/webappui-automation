import { BoweryReports } from "../../../../types";
import ReportDataCreator from "../../../data_creator/reportData.creator";

const reportCreationFixture = () => {
    return ReportDataCreator.getReportData("4903");
};

const _waterAndSewerPerUnitItem: BoweryReports.ForecastItem = {
    name: "waterAndSewer",
    basis: "unit"
};

const _waterAndSewerPerSfItem: BoweryReports.ForecastItem = {
    name: "waterAndSewer",
    basis: "sf"
};

const _comparables: BoweryReports.Comparable[] = [
    {
        address: "6001 S Sacramento Ave",
        squareFeet: 6608,
        resUnits: 3,
        waterAndSewer: 5678.12,
    },
    {
        address: "7955 S Emerald Ave",
        squareFeet: 9000,
        resUnits: 2,
        waterAndSewer: 2345.56,
    },
    {
        address: "7613 S Kingston Ave",
        squareFeet: 9750,
        resUnits: 5,
        waterAndSewer: 76123.00,
    },
];

export default {
    reportCreationData: reportCreationFixture(),
    comparables: _comparables,
    waterAndSewerPerUnitItem: _waterAndSewerPerUnitItem,
    waterAndSewerPerSfItem: _waterAndSewerPerSfItem,
    waterAndSewerPerUnitCardSnapshotName: "WaterAndSewer_PerUnit_Forecast_Item_Component",
    waterAndSewerPerSfCardSnapshotName: "WaterAndSewer_PerSf_Forecast_Item_Component"
};