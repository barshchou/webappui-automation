import Enums from "../../../../enums/enums";
import ReportDataCreator from "../../../data_creator/reportData.creator";

const reportCreationFixture = () => {
    return ReportDataCreator.getReportData("4069");
};

export default {
    reportCreationData: reportCreationFixture(),
    pdfFileName: "test_files/Upload_PDF_File.pdf",
    exportSectionName: Enums.EXPORT_TITLES.letterOfEngagement,
    sectionToExport: Enums.SECTIONS_TO_INCLUDE_IN_EXPORT.addenda
};