import ReportDataCreator from "../../../data_creator/reportData.creator";
import Enums from "../../../../enums/enums";
import { BoweryReports } from "../../../../types/boweryReports.type";
import { BoweryAutomation } from "../../../../types/boweryAutomation.type";

const _grossBuildingArea = 5000;
const _numberOfCommercialUnits = 3;
const _numberOfResidentialUnits = 5;
const _name = Enums.EXPENSE_CELL.managementFees;
const _basis = "sf" as BoweryReports.UnitSF;
const _projection = 335.44;
const _forecast = 77.01;

const _forecastItem = (): BoweryReports.ForecastItem => {
    return {
        name: _name,
        basis: _basis,
        projection: _projection,
        forecast: _forecast
    };
};

const _managementFeesSfTotal = _forecast * _grossBuildingArea;
const _managementFeesSfPerSf = _forecast;
const _managementFeesSfPerUnit = _managementFeesSfTotal / _numberOfResidentialUnits;

const _managementFeesUnitTotal = _forecast * _numberOfResidentialUnits;
const _managementFeesUnitPerSf = _managementFeesUnitTotal / _grossBuildingArea;
const _managementFeesUnitPerUnit = _forecast;

const _reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("5846_49-50", {
    incomeValue: Enums.INCOME_TYPE.both
});

export default {
    reportCreationData: _reportCreationData,
    grossBuildingArea: _grossBuildingArea,
    numberOfResidentialUnits: _numberOfResidentialUnits,
    numberOfCommercialUnits: _numberOfCommercialUnits,
    forecastItem: _forecastItem(),
    managementFeesSfTotal: _managementFeesSfTotal,
    managementFeesSfPerSf: _managementFeesSfPerSf,
    managementFeesSfPerUnit: _managementFeesSfPerUnit,
    managementFeesUnitTotal: _managementFeesUnitTotal,
    managementFeesUnitPerSf: _managementFeesUnitPerSf,
    managementFeesUnitPerUnit: _managementFeesUnitPerUnit
};