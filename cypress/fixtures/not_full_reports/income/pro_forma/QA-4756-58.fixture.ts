import ReportDataCreator from "../../../data_creator/reportData.creator";
import Enums from "../../../../enums/enums";
import { BoweryAutomation } from "../../../../types/boweryAutomation.type";

const _grossBuildingArea = 5000;
const _numberOfCommercialUnits = 3;
const _numberOfResidentialUnits = 5;
const _landTaxAssessedValue = 999999;
const _buildingTaxAssessedValue = 456450;
const _taxPercent = 10.646;

const _totalRealEstateTax = ((_landTaxAssessedValue + _buildingTaxAssessedValue) * _taxPercent) / 100;
const _totalRealEstateTaxPerSf = _totalRealEstateTax / _grossBuildingArea;
const _totalRealEstateTaxPerUnit = _totalRealEstateTax / _numberOfResidentialUnits;

const _reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("4756-58", {
    incomeValue: Enums.INCOME_TYPE.both
});

export default {
    reportCreationData: _reportCreationData,
    grossBuildingArea: _grossBuildingArea,
    numberOfResidentialUnits: _numberOfResidentialUnits,
    numberOfCommercialUnits: _numberOfCommercialUnits,
    totalRealEstateTaxPerSf: _totalRealEstateTaxPerSf,
    totalRealEstateTaxPerUnit: _totalRealEstateTaxPerUnit,
    totalRealEstateTax: _totalRealEstateTax, 
    landTaxAssessedValue: _landTaxAssessedValue,
    buildingTaxAssessedValue: _buildingTaxAssessedValue,
    taxPercent: _taxPercent,
    featureFlagKey: Enums.FEATURE_FLAG_KEYS.flexibleTaxes,
    onFeatureFlag: 0,
};