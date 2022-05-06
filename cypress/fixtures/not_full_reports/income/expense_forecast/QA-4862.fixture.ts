import ReportDataCreator from "../../../data_creator/reportData.creator";

const forecastItemFixture: BoweryReports.ForecastItem = {
    name: "insurance",
    basis: "unit",
    forecast: 4000
};

export default {
    reportCreationData: ReportDataCreator.getDefaultReportData("4862"),
    buildingDescription: {
        grossArea: 5000,
        numberOfUnits: 2
    },
    insuranceItem: forecastItemFixture
};