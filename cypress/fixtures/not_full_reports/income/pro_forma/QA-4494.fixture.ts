import ReportDataCreator from "../../../data_creator/reportData.creator";

const _reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("4494");

export default {
    reportCreationData: _reportCreationData,
    resUnit: 3,
    monthlyRent: [ 60, 500, 450 ]
};