import ReportDataCreator from "../../../data_creator/reportData.creator";

export default {
    reportCreationData: ReportDataCreator.getDefaultReportData("4572"),
    comparableFirst: {
        address: "200 West 78 Street",
        sizeAdjustment: 20,
        conditionAdjustment: -30,
        otherAdjustment: 40,
        otherNewAdjustment: -20
    },
    comparableSecond: {
        address: "295 Ridgewood Avenue",
        sizeAdjustment: 40,
        conditionAdjustment: -10,
        otherAdjustment: -50,
        otherNewAdjustment: 0
    },
    otherAdjustmentName: "Other Adjustment",
    otherAdjustmentNewName: "test other adj name"
};