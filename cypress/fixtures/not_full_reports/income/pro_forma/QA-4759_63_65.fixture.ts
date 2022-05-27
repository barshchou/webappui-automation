import ReportDataCreator from "../../../data_creator/reportData.creator";
import Enums from "../../../../enums/enums";

const _grossBuildingArea = 5000;
const _numberOfCommercialUnits = 3;
const _numberOfResidentialUnits = 5;
const _name = Enums.EXPENSE_CELL.insurace;
const _basis = "sf" as BoweryReports.UnitSF;
const _projection = 465.01;
const _forecast = 99.99;

const _forecastItem: BoweryReports.ForecastItem = {
    name: _name,
    basis: _basis,
    projection: _projection,
    forecast: _forecast
};

const _insuranceSFTotal = _forecast * _grossBuildingArea;
const _insuranceSFPerUnit = _insuranceSFTotal / _numberOfResidentialUnits;

const _reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("4759_63_65", {
        incomeValue: Enums.INCOME_TYPE.BOTH
    });

export default {
    reportCreationData: _reportCreationData,
    grossBuildingArea: _grossBuildingArea,
    numberOfResidentialUnits: _numberOfResidentialUnits,
    numberOfCommercialUnits: _numberOfCommercialUnits,
    forecastItem: _forecastItem,
    insuranceSFTotal: _insuranceSFTotal,
    insuranceSFPerUnit: _insuranceSFPerUnit,
    insuranceSFPerSf: _forecast

};