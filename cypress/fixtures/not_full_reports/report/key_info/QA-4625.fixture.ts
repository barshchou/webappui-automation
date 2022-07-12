import ReportDataCreator from "../../../data_creator/reportData.creator";

export const reportCreationFixture = () => {
    return ReportDataCreator.setReportNumber("2200018572", true).build();
};

export default {
    reportCreationData: reportCreationFixture(),
    verifyValue: "228 West 10th Street__New York, NY 10014 - Bowery EL - signed.pdf"
};