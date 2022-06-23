import ReportDataCreator from "../../../data_creator/reportData.creator";
import Enums from "../../../../enums/enums";
import { BoweryReports } from "../../../../types/boweryReports.type";
import { BoweryAutomation } from "../../../../types/boweryAutomation.type";

const _grossBuildingArea = 5000;
const _numberOfCommercialUnits = 3;
const _numberOfResidentialUnits = 5;
const _name = Enums.EXPENSE_CELL.payrollBenefits;
const _basis = "sf" as BoweryReports.UnitSF;
const _projection = 335.44;
const _forecast = 12.01;

const _forecastItem = (): BoweryReports.ForecastItem => {
    return {
        name: _name,
        basis: _basis,
        projection: _projection,
        forecast: _forecast
    };
};

const _payrollBenefitsSfTotal = _forecast * _grossBuildingArea;
const _payrollBenefitsSfPerSf = _forecast;
const _payrollBenefitsSfPerUnit = _payrollBenefitsSfTotal / _numberOfResidentialUnits;

const _payrollBenefitsUnitTotal = _forecast * _numberOfResidentialUnits;
const _payrollBenefitsUnitPerSf = _payrollBenefitsUnitTotal / _grossBuildingArea;
const _payrollBenefitsUnitPerUnit = _forecast;

const _reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("5832-34", {
        incomeValue: Enums.INCOME_TYPE.both
    });

export default {
    reportCreationData: _reportCreationData,
    grossBuildingArea: _grossBuildingArea,
    numberOfResidentialUnits: _numberOfResidentialUnits,
    numberOfCommercialUnits: _numberOfCommercialUnits,
    forecastItem: _forecastItem(),
    payrollBenefitsSfTotal: _payrollBenefitsSfTotal,
    payrollBenefitsSfPerSf: _payrollBenefitsSfPerSf,
    payrollBenefitsSfPerUnit: _payrollBenefitsSfPerUnit,
    payrollBenefitsUnitTotal: _payrollBenefitsUnitTotal,
    payrollBenefitsUnitPerSf: _payrollBenefitsUnitPerSf,
    payrollBenefitsUnitPerUnit: _payrollBenefitsUnitPerUnit
};