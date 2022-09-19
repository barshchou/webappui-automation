import ReportDataCreator from "../../../data_creator/reportData.creator";
import Enums from "../../../../enums/enums";
import { BoweryReports } from "../../../../types/boweryReports.type";
import { BoweryAutomation } from "../../../../types/boweryAutomation.type";

const _reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("5053-54", {
    incomeValue: Enums.INCOME_TYPE.both
});

const _grossBuildingArea = 5000;
const _numberOfCommercialUnits = 3;
const _numberOfResidentialUnits = 5;
const _landTaxAssessedValue = 999999;
const _buildingTaxAssessedValue = 456450;
// ToDo: Retreive this value from UI and make calculations in action
const _taxPercent = 10.646;
const _basis = "sf" as BoweryReports.UnitSF;
const _customForecast = 45;
const _waterForecast = 12;
const _reservesForecast = 23;
const _fuelForecast = 34;
const _customCategoriesAmount = 3; //pay attention to custom categories amount added below

//#region Formulas
/*
 * Formulas for calculation Pro Forma table.
 *  Expenses:
 *  Real Estate Taxes = (landTaxAssessed + buildingAssessed) * tax / 100
 *  Water And Reserves = water forecast * GBA
 *  Fuel = fuel forecast * GBA
 *  Custom expense = custom forecast * GBA
 * 
 *  Totals:
 *  Total Operating Expenses = Total of all expenses(included custom) + Real Estate Taxes total
 *  Total Operating Expenses ex Taxed = Total Operating Expenses - Real Estate Taxes total
 *  Total Operating Income = Effective Gross Income - Total Operating Expenses
 */
const _totalRealEstateTax = ((_landTaxAssessedValue + _buildingTaxAssessedValue) * _taxPercent) / 100;
const _totalWater = _waterForecast * _grossBuildingArea;
const _totalReserves = _reservesForecast * _grossBuildingArea;
const _totalFuel = _fuelForecast * _grossBuildingArea;
const _totalCustomCategory = _customForecast * _grossBuildingArea;
const _totalCustoms = _totalCustomCategory * _customCategoriesAmount;

const _totalTOE = _totalFuel + _totalReserves + _totalWater + _totalCustoms + _totalRealEstateTax;
const _totalTOEexTaxes = _totalTOE - _totalRealEstateTax;
const _totalNetOperatingIncome = _totalTOE;

//#endregion

const _customCategoryFirstCapital = (): BoweryReports.ForecastItem => {
    return {
        name: "Verify first capital",
        basis: _basis,
        forecast: _customForecast
    };
};

const _customCategoryAllCapitals = (): BoweryReports.ForecastItem => {
    return {
        name: "Verify All Capitals",
        basis: _basis,
        forecast: _customForecast
    };
};

const _customCategoryMix = (): BoweryReports.ForecastItem => {
    return {
        name: "verify Mix cases",
        basis: _basis,
        forecast: _customForecast
    };
};

const _customCategories = (): BoweryReports.ForecastItem[] => {
    let customCategories = [] as BoweryReports.ForecastItem[];
    customCategories.push(_customCategoryAllCapitals());
    customCategories.push(_customCategoryFirstCapital());
    customCategories.push(_customCategoryMix());
    return customCategories;
};

//Making changes to forecast will impact totals amount in exported values: totalToe, totalToeNetRe, customTotal
const expensesItemsFixture = (): BoweryReports.ForecastItem[] => {
    return [
        {
            name: "waterAndSewer",
            basis: _basis,
            forecast: _waterForecast
        },
        {
            name: "reserves",
            basis: _basis,
            forecast: _reservesForecast
        },
        {
            name: "fuel",
            basis: _basis,
            forecast: _fuelForecast
        },
    ];
};

export default {
    reportCreationData: _reportCreationData,
    expensesItems: expensesItemsFixture(),
    customCategoryFirstCapital: _customCategoryFirstCapital(),
    customCategoryAllCapitals: _customCategoryAllCapitals(),
    customCategoryMix: _customCategoryMix(),
    totalRealEstateTax: _totalRealEstateTax,
    grossBuildingArea: _grossBuildingArea,
    numberOfCommercialUnits: _numberOfCommercialUnits,
    numberOfResidentialUnits: _numberOfResidentialUnits,
    totalToe: _totalTOE,
    totalToeNetRe: _totalTOEexTaxes,
    totalCustomCategory: _totalCustomCategory,
    customTotal: _totalCustoms,
    netOperationIncome: _totalNetOperatingIncome,
    reserversTotal: _totalReserves,
    fuelTotal: _totalFuel,
    waterAndSewerTotal: _totalWater, 
    landTaxAssessedValue: _landTaxAssessedValue,
    buildingTaxAssessedValue: _buildingTaxAssessedValue,
    customCategories: _customCategories()
};
