import enums from "../../../../../enums/enums";
import { BoweryReports } from "../../../../../types/boweryReports.type";
import chipsDataCreator from "../../../../data_creator/chipsData.creator";
import reportDataCreator from "../../../../data_creator/reportData.creator";

const _numberOfCommercialUnits = 3;
const _numberOfResidentialUnits = 2;
const _buildingName = 'Test Building Name QA-4598-00';
const _grossBuildingArea = 5999;
const _siteArea = 735000;
const _currentNumberOfCommercialUnits = 5;
const _currentNumberOfResidentialUnits = 4;

const _chipsOptions: BoweryReports.ChipsCreationOptions = {
    buildingName: _buildingName,
    grossBuildingArea: _grossBuildingArea,
    numberOfCommercialUnits: _numberOfCommercialUnits,
    numberOfResidentialUnits: _numberOfResidentialUnits,
    siteArea: _siteArea,
    currentCommercialUnits: _currentNumberOfCommercialUnits,
    currentResidentialUnits: _currentNumberOfResidentialUnits
};
export default {
    reportCreationDataAsIs: reportDataCreator.getReportData("4598-00", {
        incomeValue: enums.INCOME_TYPE.both,
        conclusionValue: enums.VALUE_CONCLUSION_TYPE.AS_IS
    }),
    reportCreationDataAsStabilized: reportDataCreator.getReportData("4598-00", {
        incomeValue: enums.INCOME_TYPE.both,
        conclusionValue: enums.VALUE_CONCLUSION_TYPE.AS_STABILIZED
    }),
    reportCreationDataAsComplete: reportDataCreator.getReportData("4598-00", {
        incomeValue: enums.INCOME_TYPE.both,
        conclusionValue: enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE
    }),
    numberOfCommercialUnits: _numberOfCommercialUnits,
    numberOfResidentialUnits: _numberOfResidentialUnits,
    asIsChips: chipsDataCreator.getChipsData(_chipsOptions),
    asStabilizedChips: chipsDataCreator.getChipsData(_chipsOptions, enums.VALUE_CONCLUSION_TYPE.AS_STABILIZED),
    asCompletedChips: chipsDataCreator.getChipsData(_chipsOptions, enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE),
    currentNumberOfCommercialUnits: _currentNumberOfCommercialUnits,
    currentNumberOfResidentialUnits: _currentNumberOfResidentialUnits,
    grossBuildingArea: _grossBuildingArea,
    siteArea: _siteArea,
    buildingName: _buildingName,
    exportSectionName: enums.EXPORT_TITLES.commercialStabilizedRentRoll
};
