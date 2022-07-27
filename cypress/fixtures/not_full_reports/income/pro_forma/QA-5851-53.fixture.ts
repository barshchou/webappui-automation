import ReportDataCreator from "../../../data_creator/reportData.creator";
import Enums from "../../../../enums/enums";
import { BoweryReports } from "../../../../types/boweryReports.type";
import { BoweryAutomation } from "../../../../types/boweryAutomation.type";

const _grossBuildingArea = 5000;
const _numberOfCommercialUnits = 3;
const _numberOfResidentialUnits = 5;
const _name = Enums.EXPENSE_CELL.replacementsAndReserves;
const _basis = "sf" as BoweryReports.UnitSF;
const _projection = 335.44;
const _forecast = 88.01;

const _forecastItem = (): BoweryReports.ForecastItem => {
    return {
        name: _name,
        basis: _basis,
        projection: _projection,
        forecast: _forecast
    };
};

const _replacementReservesSfTotal = _forecast * _grossBuildingArea;
const _replacementReservesSfPerSf = _forecast;
const _replacementReservesSfPerUnit = _replacementReservesSfTotal / _numberOfResidentialUnits;

const _replacementReservesUnitTotal = _forecast * _numberOfResidentialUnits;
const _replacementReservesUnitPerSf = _replacementReservesUnitTotal / _grossBuildingArea;
const _replacementReservesUnitPerUnit = _forecast;

const _reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("5851-53", {
    incomeValue: Enums.INCOME_TYPE.both
});

export default {
    reportCreationData: _reportCreationData,
    grossBuildingArea: _grossBuildingArea,
    numberOfResidentialUnits: _numberOfResidentialUnits,
    numberOfCommercialUnits: _numberOfCommercialUnits,
    forecastItem: _forecastItem(),
    replacementReservesSfTotal: _replacementReservesSfTotal,
    replacementReservesSfPerSf: _replacementReservesSfPerSf,
    replacementReservesSfPerUnit: _replacementReservesSfPerUnit,
    replacementReservesUnitTotal: _replacementReservesUnitTotal,
    replacementReservesUnitPerSf: _replacementReservesUnitPerSf,
    replacementReservesUnitPerUnit: _replacementReservesUnitPerUnit
};