import ReportDataCreator from "../../../data_creator/reportData.creator";

const _customCategory: BoweryReports.ForecastItem = {
    name: "customExpence"
};

export default {
    reportCreationData: ReportDataCreator.getReportData("5008-10"),
    customCategory: _customCategory
};