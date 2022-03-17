import ReportDataCreator from "../../../data_creator/reportData.creator";
import {getCurrentMonthName, getYearFromDate} from "../../../../../utils/date.utils";

export default {
    reportCreationData: ReportDataCreator.getDefaultReportData("4876"),
    grossBuildingArea: 5000,
    actual: {
        periodValue: "Actual",
        month: "December",
        expenseYear: Number(getYearFromDate()) - 1,
        electricityExpense: 12000
    },
    t12: {
        periodValue: "Actual T12",
        month: getCurrentMonthName(),
        expenseYear: getYearFromDate(),
        electricityExpense: 13000
    },
    historical: {
        periodValue: "Annualized Historical",
        month: getCurrentMonthName(),
        expenseYear: getYearFromDate(),
        electricityExpense: 14000
    },
    projection: {
        periodValue: "Projection",
        month: "December",
        expenseYear: Number(getYearFromDate()) + 1,
        electricityExpense: 15000
    }
}