import ReportDataCreator from "../../../data_creator/reportData.creator";
import Enums from "../../../../enums/enums";
import { BoweryAutomation } from "../../../../types/boweryAutomation.type";

const _grossBuildingArea = 5000;
const _numberOfCommercialUnits = 3;
const _numberOfResidentialUnits = 5;
const _landTaxAssessedValue = 999999;
const _buildingTaxAssessedValue = 456450;

const _reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("4756-58", {
    incomeValue: Enums.INCOME_TYPE.both
});

export default {
    reportCreationData: _reportCreationData,
    grossBuildingArea: _grossBuildingArea,
    numberOfResidentialUnits: _numberOfResidentialUnits,
    numberOfCommercialUnits: _numberOfCommercialUnits,
    landTaxAssessedValue: _landTaxAssessedValue,
    buildingTaxAssessedValue: _buildingTaxAssessedValue
};