import ReportDataCreator from "../../../data_creator/reportData.creator";

export default {
    reportCreationData: ReportDataCreator.getDefaultReportData("4862"),
    buildingDescription: {
        grossArea: 5000,
        numberOfUnits: 2
    },
    insuranceItem: {
        name: "insurance",
        basis: "unit",
        forecast: 4000
    }
};