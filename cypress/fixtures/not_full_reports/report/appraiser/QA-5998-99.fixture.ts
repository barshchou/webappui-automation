import ReportDataCreator from "../../../data_creator/reportData.creator";


const reportCreationFixture = () => {
    return ReportDataCreator.getReportData("5998-99");
};


export default {
    reportCreationData: reportCreationFixture(),
    appraiserName: "Matt Roman",
    inspectorName: "Robocop Inspector"
};