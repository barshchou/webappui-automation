import ReportDataCreator from "../../../data_creator/reportData.creator";
import Enums from "../../../../enums/enums";
import { BoweryReports } from "../../../../types/boweryReports.type";
import { BoweryAutomation } from "../../../../types/boweryAutomation.type";

const _grossBuildingArea = 5000;
const _numberOfCommercialUnits = 3;
const _numberOfResidentialUnits = 5;
const _name = Enums.EXPENSE_CELL.custom;
const _basis = "sf" as BoweryReports.UnitSF;
const _projection = 335.44;
const _forecast = 34.01;
const _customExpenseName = _name;

const _forecastItem = (): BoweryReports.ForecastItem => {
    return {
        name: _name,
        basis: _basis,
        projection: _projection,
        forecast: _forecast
    };
};

const _customSfTotal = _forecast * _grossBuildingArea;
const _customSfPerSf = _forecast;
const _customSfPerUnit = _customSfTotal / _numberOfResidentialUnits;

const _customUnitTotal = _forecast * _numberOfResidentialUnits;
const _customUnitPerSf = _customUnitTotal / _grossBuildingArea;
const _customUnitPerUnit = _forecast;

const _reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("5854-56", {
        incomeValue: Enums.INCOME_TYPE.both
    });

export default {
    reportCreationData: _reportCreationData,
    grossBuildingArea: _grossBuildingArea,
    numberOfResidentialUnits: _numberOfResidentialUnits,
    numberOfCommercialUnits: _numberOfCommercialUnits,
    forecastItem: _forecastItem(),
    customSfTotal: _customSfTotal,
    customSfPerSf: _customSfPerSf,
    customSfPerUnit: _customSfPerUnit,
    customUnitTotal: _customUnitTotal,
    customUnitPerSf: _customUnitPerSf,
    customUnitPerUnit: _customUnitPerUnit,
    customExpenseName: _customExpenseName
};