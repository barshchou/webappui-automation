import ReportDataCreator from "../../../data_creator/reportData.creator";

const forecastItemFixture: BoweryReports.ForecastItem = {
    name: "insurance",
    basis: "sf",
    forecast: 5
};

export default {
    reportCreationData: ReportDataCreator.getDefaultReportData("4861"),
    buildingDescription: {
        grossArea: 5000,
        numberOfUnits: 11
    },
    insuranceItem: forecastItemFixture
};