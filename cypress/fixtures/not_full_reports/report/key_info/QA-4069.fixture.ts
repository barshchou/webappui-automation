import ReportDataCreator from "../../../data_creator/reportData.creator";

const reportCreationFixture = () => {
    return ReportDataCreator.getReportData("4069");
};

export default {
    reportCreationData: reportCreationFixture(),
    pdfFileName: "test_files/Upload_PDF_File.pdf",
};