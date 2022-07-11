import ReportDataCreator from "../../../../data_creator/reportData.creator";

export default {
    reportCreationData: ReportDataCreator.getReportData("4220"),
    numberOfUnits: 1,
    forecastNumber: 2321,
    labelNames: [
        {
            checkLabel: "Summarize current rent roll",
            columnLabel: ""
        },
        {
            checkLabel: "Developer's Forecast",
            columnLabel: "Rent Forecast"
        }, 
        {
            checkLabel: "Include Per Room Analysis in Report",
            columnLabel: "Rooms"
        },
        {
            checkLabel: "Bathrooms",
            columnLabel: "# Bathrooms"
        },
        {
            checkLabel: "Outdoor Space",
            columnLabel: "Outdoor Space"
        },
        {
            checkLabel: "Unit Type",
            columnLabel: "Unit Type"
        }
    ]
};