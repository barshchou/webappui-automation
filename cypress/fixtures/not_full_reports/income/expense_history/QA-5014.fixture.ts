import { BoweryAutomation } from "../../../../types/boweryAutomation.type";
import ReportDataCreator from "../../../data_creator/reportData.creator";
import Enums from "../../../../enums/enums";
import { getYearFromDate } from "../../../../../utils/date.utils";

const _reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("5014");

export default {
    reportCreationData: _reportCreationData,
    existCategory: "Groundskeeping",
    expenseCategory: "Test name",
    categoryValue: 3000,
    expensePeriodType: Enums.EXPENSE_PERIOD_TYPE.actual,
    expenseYear: Number(getYearFromDate()) - 1,
    electricity: 3550.87,
    replacementReserves: 25,
    taxes: 1250,
    grossRevenue: 10000,
    toeExportValue: "$7,826"
};