import ReportDataCreator from "../../../data_creator/reportData.creator";
import Enums from "../../../../enums/enums";

const _grossBuildingArea = 5000;
const _numberOfCommercialUnits = 3;
const _numberOfResidentialUnits = 5;
const _name = Enums.EXPENSE_CELL.insurace;
const _basis = "unit" as BoweryReports.UnitSF;
const _projection = 465.01;
const _forecast = 99.99;

const _forecastItem: BoweryReports.ForecastItem = {
    name: _name,
    basis: _basis,
    projection: _projection,
    forecast: _forecast
};

const _insuranceUnitTotal = _forecast * _numberOfResidentialUnits;
const _insuranceUnitPerSf = _insuranceUnitTotal / _grossBuildingArea;

const _reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("4779-81", {
        incomeValue: Enums.INCOME_TYPE.BOTH
    });

export default {
    reportCreationData: _reportCreationData,
    grossBuildingArea: _grossBuildingArea,
    numberOfResidentialUnits: _numberOfResidentialUnits,
    numberOfCommercialUnits: _numberOfCommercialUnits,
    forecastItem: _forecastItem,
    insuranceUnitTotal: _insuranceUnitTotal,
    insuranceUnitPerSf: _insuranceUnitPerSf,
    insuranceUnitPerUnit: _forecast

};