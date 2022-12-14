import { BoweryReports } from "../../../../types/boweryReports.type";
import ReportDataCreator from "../../../data_creator/reportData.creator";

const _forecastItem: BoweryReports.ForecastItem = {
    name: "repairsAndMaintenance", basis: "unit", forecast: 27460
};
const _buildingDescription: BoweryReports.BuildingDescription = {
    grossArea: 2367,
    numberOfUnits: 2
};

export default {
    reportCreationData: ReportDataCreator.getReportData("4936"),
    buildingDescription: _buildingDescription,
    forecastItem: _forecastItem,
};