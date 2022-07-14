import ReportDataCreator from "../../../data_creator/reportData.creator";
import { BoweryReports } from "../../../../types/boweryReports.type";
import expensesForecast from " ../../../cypress/enums/expense/expenseForecast.enum";

const _customCategory: BoweryReports.ForecastItem = {
    name: "customExpence"
};

export default {
    reportCreationData: ReportDataCreator.getReportData("5008-10"),
    customCategory: _customCategory,
    expenseCardsIDArray : expensesForecast.expenseCardsIDArray
};