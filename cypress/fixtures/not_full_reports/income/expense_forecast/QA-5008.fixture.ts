import ReportDataCreator from "../../../data_creator/reportData.creator";

const _customCategory: BoweryReports.ForecastItem = {
    name: "customExpence"

};

export default {
    reportCreationData: ReportDataCreator.getReportData("5008&09&10"),
    customCategory: _customCategory,
   // checkBoxLabel: "Include Expense on Pro Forma"
};