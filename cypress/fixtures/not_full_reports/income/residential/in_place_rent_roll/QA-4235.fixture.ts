import ReportDataCreator from "../../../../data_creator/reportData.creator";

export default {
    reportCreationData: ReportDataCreator.getReportData("4235"),
    numberOfUnits: 1,
    column: "# Bathrooms",
    label: "Bathrooms",
    wholeNumber: 5,
    halfNumber: 5.5,
    wrongDecimal: "5.57",
    negativeNumber: -2
};