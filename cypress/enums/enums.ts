import leaseDateName from "./leaseDateName.enum";
import leaseStatus from "./leaseStatus.enum";
import imageType from "./imageType.enum";
import inputType from "./inputType.enum";
import unitSF from "./unitSF.enum";
import commercialUnitsUseValues from "./commercialUnitsUseValues.enum";
import perUnitPerSF from "./perUnitPerSF.enum";
import commercialUnitsUseTexts from "./commercialUnitsUseTexts.enum";
import commercialUnitsGroups from "./commercialUnitsGroups.enum";
import commercialUnitsGradeValues from "./commercialUnitsGradeValues.enum";
import commercialUnitsFacadeValues from "./commercialUnitsFacadeValues.enum";
import commercialUnitsStateValues from "./commercialUnitsStateValues.enum";
import commercialUnitsCeilingHeightValues from "./commercialUnitsCeilingHeightValues.enum";
import commercialUnitsLocationValues from "./commercialUnitsLocationValues.enum";
import commercialUnitsStreetTypeValues from "./commercialUnitsStreetTypeValues.enum";
import commercialUnitsFloorValues from "./commercialUnitsFloorValues.enum";
import commercialUnitsFrontageValues from "./commercialUnitsFrontageValues.enum";
import organizationAddresseePrefix from "./organizationAddresseePrefix.enum";
import organizationState from "./organizationState.enum";
import expensePeriodType from "./expensePeriodType.enum";
import unitsOfMeasure from "./unitsOfMeasure.enum";
import utilityExpenses from "./utilityExpenses.enum";
import unitType from "./unitType.enum";
import sourceOfInformation from "./sourceOfInformation.enum";
import amenities from "./amenities.enum";
import templateTypesEnum from "./templateTypes.enum";
import incomeTypesEnum from "./incomeTypes.enum";
import valueConclusionTypesEnum from "./valueConclusionTypes.enum";
import envUrlsEnum from "./envUrls.enum";
import proFormaTypesEnum from "./proFormaTypes.enum";
import expenseCellNames from "./expenseCellNames";
import expenseHistoryTableRowsEnum from "./expenseHistoryTableRows.enum";
import reimbursementTypes from "./reimbursementTypes.enum";
import incomeTypesCellNamesEnum from "./incomeTypesCellNames.enum";
import parkingVcLossType from "./parkingVcLossType.enum";
import laundryVcLossType from "./laundryVcLossType.enum";
import storageVcLossType from "./storageVcLossType.enum";
import knownInformation from "./knownInformationType.enum";
import compGroupsColumnsEnum from "./compGroupsColumns.enum";
import marketAnalysisUsesEnum from "./marketAnalysisUses.enum";

export default {
    TEMPLATE_TYPE: templateTypesEnum,
    INCOME_TYPE: incomeTypesEnum,
    VALUE_CONCLUSION_TYPE: valueConclusionTypesEnum,
    ENV_URLS: envUrlsEnum,
    PRO_FORMA_TYPES: proFormaTypesEnum,
    EXPENSE_CELL: expenseCellNames,
    EXPENSE_HISTORY_TABLE_ROWS: expenseHistoryTableRowsEnum,
    REIMBURSEMENT_TYPES: reimbursementTypes,
    INCOME_TYPES_CELL_NAMES: incomeTypesCellNamesEnum,
    PARKING_VC_LOSS_TYPE: parkingVcLossType,
    LAUNDRY_VC_LOSS_TYPE: laundryVcLossType,
    STORAGE_VC_LOSS_TYPE: storageVcLossType,
    KNOWN_INFORMATION: knownInformation,
    COMP_GROUP_COLUMNS: compGroupsColumnsEnum,
    LEASE_DATE_NAME: leaseDateName,
    LEASE_STATUS: leaseStatus,
    IMAGE_TYPE: imageType,
    INPUT_TYPE: inputType,
    UNIT_SF: unitSF,
    PER_UNIT_PER_SF: perUnitPerSF,
    COMMERCIAL_UNITS_USE_VALUES: commercialUnitsUseValues,
    COMMERCIAL_UNITS_USE_TEXTS:  commercialUnitsUseTexts,
    COMMERCIAL_UNITS_GROUPS: commercialUnitsGroups,
    COMMERCIAL_UNITS_GRADE_VALUES: commercialUnitsGradeValues,
    COMMERCIAL_UNITS_FACADE_VALUES: commercialUnitsFacadeValues,
    COMMERCIAL_UNITS_STATE_VALUES: commercialUnitsStateValues,
    COMMERCIAL_UNITS_CEILING_HEIGHT_VALUES: commercialUnitsCeilingHeightValues,
    COMMERCIAL_UNITS_LOCATION_VALUES: commercialUnitsLocationValues,
    COMMERCIAL_UNITS_STREET_TYPE_VALUES: commercialUnitsStreetTypeValues,
    COMMERCIAL_UNITS_FLOOR_VALUES: commercialUnitsFloorValues,
    COMMERCIAL_UNITS_FRONTAGE_VALUES: commercialUnitsFrontageValues,
    ORGANIZATION_ADDRESSEE_PREFIX: organizationAddresseePrefix,
    ORGANIZATION_STATE: organizationState,
    EXPENSE_PERIOD_TYPE: expensePeriodType,
    UNITS_OF_MEASURE: unitsOfMeasure,
    UTILITY_EXPENSES: utilityExpenses,
    UNIT_TYPE: unitType,
    SOURCE_OF_INFORMATION: sourceOfInformation,
    AMENITIES: amenities,
    MARKET_ANALYSIS_USES: marketAnalysisUsesEnum
};