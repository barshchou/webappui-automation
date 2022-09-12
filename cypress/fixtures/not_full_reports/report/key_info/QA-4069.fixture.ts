import ReportDataCreator from "../../../data_creator/reportData.creator";

const reportCreationFixture = () => {
    return ReportDataCreator.getReportData("4069");
};

export default {
    reportCreationData: reportCreationFixture(),
    pdfFileName: "not_full_reports/Upload_PDF_File.pdf",
};