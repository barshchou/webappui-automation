import ReportDataCreator from "../../../data_creator/reportData.creator";


const reportCreationFixture = () => {
    return ReportDataCreator.getReportData("5998");
};


export default {
    reportCreationData: reportCreationFixture(),
    inspectorName: "Robocop Inspector"
};