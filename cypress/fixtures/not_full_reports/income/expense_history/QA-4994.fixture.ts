import { BoweryAutomation } from "../../../../types/boweryAutomation.type";
import ReportDataCreator from "../../../data_creator/reportData.creator";
import Enums from "../../../../enums/enums";
import { getYearFromDate } from "../../../../../utils/date.utils";
import { BoweryReports } from "../../../../types/boweryReports.type";

const _getReportCreationData = (utilityExpenses: BoweryReports.UtilityExpenses
): BoweryAutomation.ReportCreationData => {
    return ReportDataCreator.getReportData(`4994-${utilityExpenses}`);
};

export default {
    getReportCreationData: _getReportCreationData,
    expensePeriodType: Enums.EXPENSE_PERIOD_TYPE.actual,
    expenseYear: Number(getYearFromDate()) - 1,
    electricity: 2000,
    fuel: 999.55,
    waterAndSewer: 5555,
    sectionToExport: [ Enums.SECTIONS_TO_INCLUDE_IN_EXPORT.incomeCapitalizationApproach ]
};