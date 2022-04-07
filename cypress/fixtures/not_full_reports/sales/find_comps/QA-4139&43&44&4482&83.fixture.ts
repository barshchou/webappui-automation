import ReportDataCreator from "../../../data_creator/reportData.creator";

export default {
    reportCreationData: ReportDataCreator.getDefaultReportData("4139&43&44&4482&83"),
    compAddress: "140 E 14th St, New York, NY 10003, USA",
    condition: "Shell",
    spec4139: {
        numberOfUnitsDefault: 4,
        regularNum: 10000,
        decimalNum: -38.54,
        nonNumberValue: "Some not number",
        longValue: 55555555555555528
    }
};