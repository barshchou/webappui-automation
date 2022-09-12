import ReportDataCreator from "../../../data_creator/reportData.creator";

const reportCreationFixture = () => {
    return ReportDataCreator.getReportData("4573");
};

export default {
    reportCreationData: reportCreationFixture(),
    sourceText: "Source: Federal Reserve Economic Data (FRED)"
};