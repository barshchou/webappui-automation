import ReportDataCreator from "../../../data_creator/reportData.creator";
import Enums from "../../../../enums/enums";
import { BoweryReports } from "../../../../types/boweryReports.type";
import { BoweryAutomation } from "../../../../types/boweryAutomation.type";

const _grossBuildingArea = 5000;
const _numberOfCommercialUnits = 3;
const _numberOfResidentialUnits = 5;
const _name = Enums.EXPENSE_CELL.generalAndAdministrative;
const _basis = "sf" as BoweryReports.UnitSF;
const _projection = 335.44;
const _forecast = 99.01;

const _forecastItem = (): BoweryReports.ForecastItem => {
    return {
        name: _name,
        basis: _basis,
        projection: _projection,
        forecast: _forecast
    };
};

const _generalAndAdministrativeSfTotal = _forecast * _grossBuildingArea;
const _generalAndAdministrativeSfPerSf = _forecast;
const _generalAndAdministrativeSfPerUnit = _generalAndAdministrativeSfTotal / _numberOfResidentialUnits;

const _generalAndAdministrativeUnitTotal = _forecast * _numberOfResidentialUnits;
const _generalAndAdministrativeUnitPerSf = _generalAndAdministrativeUnitTotal / _grossBuildingArea;
const _generalAndAdministrativeUnitPerUnit = _forecast;

const _reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("5835-37", {
        incomeValue: Enums.INCOME_TYPE.both
    });

export default {
    reportCreationData: _reportCreationData,
    grossBuildingArea: _grossBuildingArea,
    numberOfResidentialUnits: _numberOfResidentialUnits,
    numberOfCommercialUnits: _numberOfCommercialUnits,
    forecastItem: _forecastItem(),
    generalAndAdministrativeSfTotal: _generalAndAdministrativeSfTotal,
    generalAndAdministrativeSfPerSf: _generalAndAdministrativeSfPerSf,
    generalAndAdministrativeSfPerUnit: _generalAndAdministrativeSfPerUnit,
    generalAndAdministrativeUnitTotal: _generalAndAdministrativeUnitTotal,
    generalAndAdministrativeUnitPerSf: _generalAndAdministrativeUnitPerSf,
    generalAndAdministrativeUnitPerUnit: _generalAndAdministrativeUnitPerUnit
};