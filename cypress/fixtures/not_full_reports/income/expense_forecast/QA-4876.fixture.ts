import ReportDataCreator from "../../../data_creator/reportData.creator";
import { getCurrentMonthName, getYearFromDate } from "../../../../../utils/date.utils";
import { BoweryReports } from "../../../../types/boweryReports.type";

const actualElectricityFixture: BoweryReports.ForecastItem = {
    name: "electricity",
    basis: "sf",
    projection: 12000
};

const t12ElectricityItemFixture: BoweryReports.ForecastItem = {
    name: "electricity",
    basis: "sf",
    projection: 13000
};

const historicalElectricityItemFixture: BoweryReports.ForecastItem = {
    name: "electricity",
    basis: "sf",
    projection: 14000
};

const ownerProjectionElectricityItemFixture: BoweryReports.ForecastItem = {
    name: "electricity",
    basis: "sf",
    projection: 15000
};

export default {
    reportCreationData: ReportDataCreator.getReportData("4876"),
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
    actualElectricityItem: actualElectricityFixture,
    t12ElectricityItem: t12ElectricityItemFixture,
    historicalElectricityItem: historicalElectricityItemFixture,
    ownerProjectionElectricityItem: ownerProjectionElectricityItemFixture,
    electricityCardSnapshotName: "Electricity_Forecast_Item_Component"
};