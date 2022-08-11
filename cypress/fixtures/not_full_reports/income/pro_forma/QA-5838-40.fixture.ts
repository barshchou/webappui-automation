import ReportDataCreator from "../../../data_creator/reportData.creator";
import Enums from "../../../../enums/enums";
import { BoweryReports } from "../../../../types/boweryReports.type";
import { BoweryAutomation } from "../../../../types/boweryAutomation.type";

const _grossBuildingArea = 5000;
const _numberOfCommercialUnits = 3;
const _numberOfResidentialUnits = 5;
const _name = Enums.EXPENSE_CELL.legalAndProfessional;
const _basis = "sf" as BoweryReports.UnitSF;
const _projection = 335.44;
const _forecast = 55.01;

const _forecastItem = (): BoweryReports.ForecastItem => {
    return {
        name: _name,
        basis: _basis,
        projection: _projection,
        forecast: _forecast
    };
};

const _legalAndProfessionalFeesSfTotal = _forecast * _grossBuildingArea;
const _legalAndProfessionalFeesSfPerSf = _forecast;
const _legalAndProfessionalFeesSfPerUnit = _legalAndProfessionalFeesSfTotal / _numberOfResidentialUnits;

const _legalAndProfessionalFeesUnitTotal = _forecast * _numberOfResidentialUnits;
const _legalAndProfessionalFeesUnitPerSf = _legalAndProfessionalFeesUnitTotal / _grossBuildingArea;
const _legalAndProfessionalFeesUnitPerUnit = _forecast;

const _reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("5838-40", {
    incomeValue: Enums.INCOME_TYPE.both
});

export default {
    reportCreationData: _reportCreationData,
    grossBuildingArea: _grossBuildingArea,
    numberOfResidentialUnits: _numberOfResidentialUnits,
    numberOfCommercialUnits: _numberOfCommercialUnits,
    forecastItem: _forecastItem(),
    legalAndProfessionalFeesSfTotal: _legalAndProfessionalFeesSfTotal,
    legalAndProfessionalFeesSfPerSf: _legalAndProfessionalFeesSfPerSf,
    legalAndProfessionalFeesSfPerUnit: _legalAndProfessionalFeesSfPerUnit,
    legalAndProfessionalFeesUnitTotal: _legalAndProfessionalFeesUnitTotal,
    legalAndProfessionalFeesUnitPerSf: _legalAndProfessionalFeesUnitPerSf,
    legalAndProfessionalFeesUnitPerUnit: _legalAndProfessionalFeesUnitPerUnit
};