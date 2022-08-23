import ReportDataCreator from "../../../data_creator/reportData.creator";


const reportCreationFixture = () => {
    return ReportDataCreator.getReportData("5998-99_6012");
};


export default {
    reportCreationData: reportCreationFixture(),
    appraiserName: "Matt Roman",
    inspectorName: "Robocop Inspector",
    validationText: "This appraiser / inspector isn't in the system. Please select 'External Inspector' "
};