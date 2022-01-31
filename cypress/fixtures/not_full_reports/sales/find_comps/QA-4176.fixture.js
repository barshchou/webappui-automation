import ReportDataCreator from "../../../data_creator/reportData.creator";

const comparableFixture = () => {
    return {
        address: "200 West 78 Street"
    };
};

export default {
    reportCreationData: ReportDataCreator.getDefaultReportData("4176"),
    comparable: Object.freeze(comparableFixture())
};