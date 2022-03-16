import ReportDataCreator from "../../../data_creator/reportData.creator";
import {getCurrentMonthName, getYearFromDate} from "../../../../../utils/date.utils";

export default {
    reportCreationData: ReportDataCreator.getDefaultReportData("4876"),
    grossBuildingArea: 5000,
    actual: {
        periodValue: "Actual",
        expenseYear: Number(getYearFromDate()) - 1
    },
    t12: {
        periodValue: "Actual T12",
        month: getCurrentMonthName(),
        expenseYear: getYearFromDate()
    },
    historical: {
        periodValue: "Annualized Historical",
        month: getCurrentMonthName(),
        expenseYear: getYearFromDate()
    },
    projection: {
        periodValue: "Projection",
        month: "December",
        expenseYear: Number(getYearFromDate()) + 1
    }
}