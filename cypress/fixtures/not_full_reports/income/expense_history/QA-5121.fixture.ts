import { BoweryAutomation } from "../../../../types/boweryAutomation.type";
import ReportDataCreator from "../../../data_creator/reportData.creator";
import Enums from "../../../../enums/enums";
import { getYearFromDate } from "../../../../../utils/date.utils";

const _reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("5121");

export default {
    reportCreationData: _reportCreationData,
    customCategory: "Custom",
    expensePeriodType: Enums.EXPENSE_PERIOD_TYPE.actual,
    expenseYear: Number(getYearFromDate()) - 1,
    grossRevenue: 5000,
    expensesToCheck: [ "Real Estate Taxes", "Insurance", "Electricity", "Fuel",
        "Water & Sewer", "Repairs & Maintenance", "Payroll & Benefits", "General & Administrative",
        "Legal & Professional Fees", "Miscellaneous", "Management Fees", "Replacement Reserves", "Custom" ]
};