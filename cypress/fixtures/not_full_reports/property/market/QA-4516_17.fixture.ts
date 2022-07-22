import ReportDataCreator from "../../../data_creator/reportData.creator";

const reportCreationFixture = () => {
    return ReportDataCreator.getReportData("4516_17");
};

export default {
    reportCreationData: reportCreationFixture(),
    fileName: "test.docx",
    fileSelectionName: "summaryOfRentStabilizationLaws",
    sectionBeforeName: "Comparable Sales Outline",
    sectionAfterName: "Qualifications"
};