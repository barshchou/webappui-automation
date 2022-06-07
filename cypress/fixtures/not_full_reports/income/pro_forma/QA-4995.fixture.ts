import ReportDataCreator from "../../../data_creator/reportData.creator";
import enums from "../../../../enums/enums";

const _buildingDescription: BoweryReports.BuildingDescription = {
    grossArea: 2500,
    numberOfUnits: 5,
  };

const _electricityForecast = 9;
const _fuelForecast = 21;
const _waterForecast = 0.5;
const _utilitiesFuelElectricityForecast = 10;
const _utilitiesFuelElectricityWaterForecast = 100;

const _basis = "sf" as BoweryReports.UnitSF;

const _forecastItems = (): BoweryReports.ForecastItem[] => {
    return [
        {
            name: enums.EXPENSE_CELL.electricity,
            basis: _basis,
            forecast: _electricityForecast
        },
        {
            name: enums.EXPENSE_CELL.fuel,
            basis: _basis,
            forecast: _fuelForecast
        },
        {
            name: enums.EXPENSE_CELL.waterAndSewer,
            basis: _basis,
            forecast: _waterForecast
        }
    ];
};

const _utilitiesFuelAndElectricityItem: BoweryReports.ForecastItem = {
    name: enums.EXPENSE_CELL.utilities,
    basis: _basis,
    forecast: _utilitiesFuelElectricityForecast
};

const _utilitiesFuelElectricityWaterItem: BoweryReports.ForecastItem = {
    name: enums.EXPENSE_CELL.utilities,
    basis: _basis,
    forecast: _utilitiesFuelElectricityWaterForecast
};

const _totalElectricity = _electricityForecast * _buildingDescription.grossArea;
const _totalFuel = _fuelForecast * _buildingDescription.grossArea;
const _totalWater = _waterForecast * _buildingDescription.grossArea;
const _totalElectricityAndFuel = _utilitiesFuelElectricityForecast * _buildingDescription.grossArea;
const _totalElectricityFuelWater = _utilitiesFuelElectricityWaterForecast * _buildingDescription.grossArea;

export default {
    reportCreationData: ReportDataCreator.getReportData("4995"),
    buildingDescription: _buildingDescription,
    basis: _basis,
    expenseModeElectricityFuelWater: enums.UTILITIES_EXPENSES_MODE.combinedElectricityFuelWater,
    expenseModeBrokenOut: enums.UTILITIES_EXPENSES_MODE.brokenOut,
    expenseModeElectricityFuel: enums.UTILITIES_EXPENSES_MODE.combinedElectricityAndFuel,
    forecastItems: _forecastItems(),
    totalElectricity: _totalElectricity,
    totalFuel: _totalFuel,
    totalWater: _totalWater,
    totalElectricityAndFuel: _totalElectricityAndFuel,
    totalElectricityFuelWater: _totalElectricityFuelWater,
    utilitiesFuelElectricityItem: _utilitiesFuelAndElectricityItem,
    utilitiesFuelElectricityWaterItem: _utilitiesFuelElectricityWaterItem
};