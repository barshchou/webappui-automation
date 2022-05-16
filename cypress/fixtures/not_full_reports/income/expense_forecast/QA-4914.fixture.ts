import ReportDataCreator from "../../../data_creator/reportData.creator";

const _forecasItem: BoweryReports.ForecastItem = {
    name: "waterAndSewer", basis: "unit", forecast: 4000
};
const _buildingDescription: BoweryReports.BuildingDescription = {
    grossArea: 5000,
    numberOfUnits: 2
};

export default {
    reportCreationData: ReportDataCreator.getReportData("4914"),
    buildingDescription: _buildingDescription,
    forecastItem: _forecasItem,
};