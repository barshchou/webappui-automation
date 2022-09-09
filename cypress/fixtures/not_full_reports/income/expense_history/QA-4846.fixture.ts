import { BoweryAutomation } from "../../../../types/boweryAutomation.type";
import ReportDataCreator from "../../../data_creator/reportData.creator";
import Enums from "../../../../enums/enums";
import { getYearFromDate } from "../../../../../utils/date.utils";

const _reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("4846");

export default {
    reportCreationData: _reportCreationData,
    expensePeriodType: Enums.EXPENSE_PERIOD_TYPE.actual,
    year: Number(getYearFromDate()) - 1,
    electricity: 2000,
    fuel: 999.55,
    waterAndSewer: 5555
};