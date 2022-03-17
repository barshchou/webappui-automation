import ReportDataCreator from "../../../data_creator/reportData.creator";
import {getCurrentMonthName, getYearFromDate} from "../../../../../utils/date.utils";

export default {
    reportCreationData: ReportDataCreator.getDefaultReportData("4876"),
    buildingDescription: {
        grossArea: 5000,
        numberOfUnits: 1
    },
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
    },
    actualElectricityItem: {
        name: "electricity",
        basis: "sf",
        projection: 12000
    },
    t12ElectricityItem: {
        name: "electricity",
        basis: "sf",
        projection: 13000
    },
    historicalElectricityItem: {
        name: "electricity",
        basis: "sf",
        projection: 14000
    },
    ownerProjectionElectricityItem: {
        name: "electricity",
        basis: "sf",
        projection: 15000
    }
}