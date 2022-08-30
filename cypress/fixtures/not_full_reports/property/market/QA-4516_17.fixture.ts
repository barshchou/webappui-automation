import ReportDataCreator from "../../../data_creator/reportData.creator";
import Enums from "../../../../enums/enums";

const reportCreationFixture = () => {
    return ReportDataCreator.getReportData("4516_17");
};

export default {
    reportCreationData: reportCreationFixture(),
    fileName: "QA-4516.docx",
    fileSelectionName: Enums.FILE_SELECTION_NAMES.summaryOfRentStabilizationLaws,
    sectionBeforeName: Enums.EXPORT_TITLES.comparableSalesOutline,
    sectionAfterName: Enums.EXPORT_TITLES.qualifications
};