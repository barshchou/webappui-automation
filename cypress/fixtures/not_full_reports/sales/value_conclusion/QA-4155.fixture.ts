import ReportDataCreator from "../../../data_creator/reportData.creator";

const reportCreationFixture = () => {
    return ReportDataCreator.getReportData("4155");
};

export default {
    reportCreationData: reportCreationFixture(),
    concludedValue: 1573423.98,
    concludedValueUpdated: 9843543.15
};