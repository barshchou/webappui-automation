import { BoweryAutomation } from "../../../../types/boweryAutomation.type";
import ReportDataCreator from "../../../data_creator/reportData.creator";
import Enums from "../../../../enums/enums";
import { getYearFromDate } from "../../../../../utils/date.utils";

const _reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("6239_6388");

export default {
    reportCreationData: _reportCreationData,
    gba: 5000,
    expensePeriodType: Enums.EXPENSE_PERIOD_TYPE.actual,
    expenseYear: Number(getYearFromDate()) - 1,
    customCategory: "Category",
    customCategoryValue: 5500,
    grossRevenue: 10000,
    electricityValue: 6666

};