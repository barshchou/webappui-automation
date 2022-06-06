import ReportDataCreator from "../../../data_creator/reportData.creator";
import { getYearFromDate } from "../../../../../utils/date.utils";
import enums from "../../../../enums/enums";

const _buildingDescription: BoweryReports.BuildingDescription = {
    grossArea: 2500,
    numberOfUnits: 5,
  };

const _basis = "sf" as BoweryReports.UnitSF;

const _forecastItems = (): BoweryReports.ForecastItem[] => {
    return [
        {
            name: enums.EXPENSE_CELL.electricity,
            basis: _basis,
            forecast: 9
        },
        {
            name: enums.EXPENSE_CELL.fuel,
            basis: _basis,
            forecast: 53
        },
        {
            name: enums.EXPENSE_CELL.waterAndSewer,
            basis: _basis,
            forecast: 41
        }
    ];
};

const _periods = {
        expensePeriodType: "Actual",
        year: Number(getYearFromDate()) - 1,
        insurance: 10000,
};

const _expenseModeElectricityFuel = "combinedElectricityAndFuel";
const _expenseModeElectricityFuelWater = "combinedAll";
const _expenseModeBrokenOut = "brokenOut";

export default {
    reportCreationData: ReportDataCreator.getReportData("4995"),
    buildingDescription: _buildingDescription,
    periods: _periods,
    basis: _basis,
    expenseModeElectricityFuelWater: _expenseModeElectricityFuelWater,
    expenseModeBrokenOut: _expenseModeBrokenOut,
    expenseModeElectricityFuel: _expenseModeElectricityFuel,
    forecastItems: _forecastItems()
};