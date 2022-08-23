import ReportDataCreator from "../../../data_creator/reportData.creator";

const reportCreationFixture = () => {
    return ReportDataCreator.getReportData("6126");
};

const inspectorName = "Robocop Inspector";

const certificationInspectionComment = "Brandon Gollotti has not made a personal inspection of the" + 
" property that is the subject of this report.";

export default {
    reportCreationData: reportCreationFixture(),
    inspectorName,
    certificationInspectionComment,
    
};