import ReportDataCreator from "../../../data_creator/reportData.creator";
import { BoweryReports } from "../../../../types/boweryReports.type";
import expensesCardsNames from " ../../../cypress/enums/expenseForecast.enum";

const _customCategory: BoweryReports.ForecastItem = {
    name: "customExpence"
};

export default {
    reportCreationData: ReportDataCreator.getReportData("5008-10"),
    customCategory: _customCategory,
    expenseCardsIDArray : expensesCardsNames.expenseCardsIDArray
};