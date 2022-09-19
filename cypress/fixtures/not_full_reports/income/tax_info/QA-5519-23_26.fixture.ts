import ReportDataCreator from "../../../data_creator/reportData.creator";

export default {
    reportCreationData: ReportDataCreator.getReportData("5519-23_26"),
    enterName: "Test Name",
    rowNames: {
        additional: "Additional Tax Rate", 
        special: "Special Assessment Row"
    },
    additionalTaxRateValue: 10.1234567890,
    specialAssessmentRowValue: 42.45
};