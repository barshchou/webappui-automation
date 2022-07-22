import ReportDataCreator from "../../../data_creator/reportData.creator";

const reportCreationFixture = () => {
    return ReportDataCreator.getReportData("4517");
};

export default {
    reportCreationData: reportCreationFixture(),
    sectionBeforeName: "Comparable Sales Outline",
    sectionAfterName: "Qualifications",
};