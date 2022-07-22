import ReportDataCreator from "../../../data_creator/reportData.creator";
import enums from "../../../../enums/enums";

const reportCreationFixture = () => {
    return ReportDataCreator.getReportData("4516_17");
};

export default {
    reportCreationData: reportCreationFixture(),
    fileName: "test.docx",
    fileSelectionName: enums.FILE_SELECTION_NAMES.summaryOfRentStabilizationLaws,
    sectionBeforeName: "Comparable Sales Outline",
    sectionAfterName: "Qualifications"
};