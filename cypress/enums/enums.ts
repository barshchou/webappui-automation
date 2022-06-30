import leaseDateName from "./lease/leaseDateName.enum";
import leaseStatus from "./lease/leaseStatus.enum";
import imageType from "./elements/imageType.enum";
import inputType from "./elements/inputType.enum";
import unitSF from "./unit/unitSF.enum";
import commercialUnitsUseValues from "./commercial/commercialUnitsUseValues.enum";
import perUnitPerSF from "./inputValues/perUnitPerSF.enum";
import commercialUnitsUseTexts from "./commercial/commercialUnitsUseTexts.enum";
import commercialUnitsGroups from "./commercial/commercialUnitsGroups.enum";
import commercialUnitsGradeValues from "./commercial/commercialUnitsGradeValues.enum";
import commercialUnitsFacadeValues from "./commercial/commercialUnitsFacadeValues.enum";
import commercialUnitsStateValues from "./commercial/commercialUnitsStateValues.enum";
import commercialUnitsCeilingHeightValues from "./commercial/commercialUnitsCeilingHeightValues.enum";
import commercialUnitsLocationValues from "./commercial/commercialUnitsLocationValues.enum";
import commercialUnitsStreetTypeValues from "./commercial/commercialUnitsStreetTypeValues.enum";
import commercialUnitsFloorValues from "./commercial/commercialUnitsFloorValues.enum";
import commercialUnitsFrontageValues from "./commercial/commercialUnitsFrontageValues.enum";
import organizationAddresseePrefix from "./organization/organizationAddresseePrefix.enum";
import organizationState from "./organization/organizationState.enum";
import expensePeriodType from "./expense/expensePeriodType.enum";
import unitsOfMeasure from "./unit/unitsOfMeasure.enum";
import utilityExpenses from "./utilityExpenses.enum";
import unitType from "./unit/unitType.enum";
import sourceOfInformation from "./sourceOfInformation.enum";
import amenities from "./amenities.enum";
import templateTypesEnum from "./reportParams/templateTypes.enum";
import incomeTypesEnum from "./income/incomeTypes.enum";
import valueConclusionTypesEnum from "./reportParams/valueConclusionTypes.enum";
import envUrlsEnum from "./envUrls.enum";
import proFormaTypesEnum from "./proFormaTypes.enum";
import expenseCellNames from "./expense/expenseCellNames";
import expenseHistoryTableRowsEnum from "./expense/expenseHistoryTableRows.enum";
import reimbursementTypes from "./reimbursementTypes.enum";
import incomeTypesCellNamesEnum from "./income/incomeTypesCellNames.enum";
import expenseForecast from "./expense/expenseForecast.enum";
import parkingVcLossType from "./inputValues/parkingVcLossType.enum";
import laundryVcLossType from "./inputValues/laundryVcLossType.enum";
import storageVcLossType from "./inputValues/storageVcLossType.enum";
import knownInformation from "./knownInformationType.enum";
import compGroupsColumnsEnum from "./compGroupsColumns.enum";
import marketAnalysisUsesEnum from "./marketAnalysisUses.enum";
import usersEnum from "../enums/users/users.enum";
import propertyConditionsEnum from "./property/propertyConditions.enum";
import propertyConditionsRadiosEnum from "./property/propertyConditionsRadios.enum";
import featureFlagKeys from "./featureFlags/featureFlagKeys.enum";
import envLaunchDarkly from "./featureFlags/envLaunchDarkly.enum";


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
    EXPENSE_FORECAST_ITEMS: expenseForecast,
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
    MARKET_ANALYSIS_USES: marketAnalysisUsesEnum,
    USERS: usersEnum,
    PROPERTY_CONDITIONS: propertyConditionsEnum,
    PROPERTY_CONDITIONS_RADIOS: propertyConditionsRadiosEnum,
    FEATURE_FLAG_KEYS: featureFlagKeys,
    ENV_LAUNCH_DARKLY: envLaunchDarkly
};