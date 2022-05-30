import ReportDataCreator from "../../../data_creator/reportData.creator";
import Enums from "../../../../enums/enums";

const _grossBuildingArea = 5000;
const _numberOfCommercialUnits = 3;
const _numberOfResidentialUnits = 5;
const _name = Enums.EXPENSE_CELL.fuel;
const _basis = "sf" as BoweryReports.UnitSF;
const _projection = 567.89;
const _forecast = 322;

const _forecastItem: BoweryReports.ForecastItem = {
    name: _name,
    basis: _basis,
    projection: _projection,
    forecast: _forecast
};

const _fuelSfTotal = _forecast * _grossBuildingArea;
const _fuelSfPerSf = _forecast;
const _fuelSfPerUnit = _fuelSfTotal / _numberOfResidentialUnits;

const _reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("4854_55_58", {
        incomeValue: Enums.INCOME_TYPE.BOTH
    });

export default {
    reportCreationData: _reportCreationData,
    grossBuildingArea: _grossBuildingArea,
    numberOfResidentialUnits: _numberOfResidentialUnits,
    numberOfCommercialUnits: _numberOfCommercialUnits,
    forecastItem: _forecastItem,
    fuelSfTotal: _fuelSfTotal,
    fuelSfPerSf: _fuelSfPerSf,
    fuelSfPerUnit: _fuelSfPerUnit

};