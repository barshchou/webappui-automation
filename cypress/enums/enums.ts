import * as compplex from "./compplex";
import leaseDateName from "./lease/leaseDateName.enum";
import leaseStatus from "./lease/leaseStatus.enum";
import imageType from "./elements/imageType.enum";
import inputType from "./elements/inputType.enum";
import unitSF from "./unit/unitSF.enum";
import perUnitPerSF from "./inputValues/perUnitPerSF.enum";
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
import rentTypesEnum from "./rent/rentTypes.enum";
import usersEnum from "../enums/users/users.enum";
import propertyConditionsEnum from "./property/propertyConditions.enum";
import propertyConditionsRadiosEnum from "./property/propertyConditionsRadios.enum";
import rentRollOptionsCheckboxesEnum from "./rent/rentRollOptionsCheckboxes.enum";
import featureFlagKeys from "./featureFlags/featureFlagKeys.enum";
import envLaunchDarkly from "./featureFlags/envLaunchDarkly.enum";
import menuLinksNamesEnum from "./menuLinksNames.enum";
import rolesEnum from "./users/roles.enum";
import boweryOfficesEnum from "./organization/boweryOffices.enum";
import reportStatusEnum from "./reportParams/reportStatus.enum";
import bondTypesEnum from "./organization/bondTypes.enum";
import expensesForecastCardNamesEnum from "./expense/expensesForecastCardNames.enum";
import reimbursementColumnsIdEnum from "./reimbursementColumnsId.enum";
import calculationTypesEnum from "./commercial/rent_reconciliation/calculationTypes.enum";
import salePeriodValuesEnum from "./findComps/salePeriodValues.enum";
import sortValues from "./findComps/sortValues.enum";
import conditionValues from "./findComps/propertyInformation/conditionValues.enum";
import comparableTypes from "./findComps/propertyInformation/comparableType.enum";
import saleStatuses from "./findComps/saleInformation/saleStatuses.enum";
import fileSelectionNamesEnum from "./property/fileSelectionNames.enum";
import discussionNamesEnum from "./property/discussionNames.enum";
import basisSquareFootAnalysisEnum from "./property/basisSquareFootAnalysis.enum";
import basisSquareFootAnalysisTextsEnum from "./sales/value_conclusion/basisSquareFootAnalysisTexts.enum";
import renovationTypeEnum from "./property/renovationType.enum";
import valueConclusionEnum from "./property/valueConclusion.enum";
import unitIncomeTypeEnum from "./unit/unitIncomeType.enum";
import rentLossTypeEnum from "./rentLossType.enum";
import commercialUnits from "./commercial/commercial-units";
import adjustComps from "./adjustComps";

export default {
    ...adjustComps,
    ...commercialUnits,
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
    ORGANIZATION_ADDRESSEE_PREFIX: organizationAddresseePrefix,
    ORGANIZATION_STATE: organizationState,
    EXPENSE_PERIOD_TYPE: expensePeriodType,
    UNITS_OF_MEASURE: unitsOfMeasure,
    UTILITY_EXPENSES: utilityExpenses,
    UNIT_TYPE: unitType,
    SOURCE_OF_INFORMATION: sourceOfInformation,
    AMENITIES: amenities,
    MARKET_ANALYSIS_USES: marketAnalysisUsesEnum,
    RENT_TYPE: rentTypesEnum,
    USERS: usersEnum,
    PROPERTY_CONDITIONS: propertyConditionsEnum,
    PROPERTY_CONDITIONS_RADIOS: propertyConditionsRadiosEnum,
    RENT_ROLL_OPTIONS_CHECKBOXES: rentRollOptionsCheckboxesEnum,
    FEATURE_FLAG_KEYS: featureFlagKeys,
    ENV_LAUNCH_DARKLY: envLaunchDarkly,
    MENU_LINKS: menuLinksNamesEnum,
    USER_ROLES: rolesEnum,
    BOWERY_OFFICES: boweryOfficesEnum,
    REPORT_STATUS: reportStatusEnum,
    BOND_TYPES: bondTypesEnum,
    EXPENSES_CARD_NAMES: expensesForecastCardNamesEnum,
    REIMBURSEMENT_COLUMN_ID: reimbursementColumnsIdEnum,
    CALCULATION_TYPE: calculationTypesEnum,
    SALE_PERIOD_VALUES: salePeriodValuesEnum,
    SORT_VALUES: sortValues,
    CONDITION_VALUES: conditionValues,
    COMPARABLE_TYPES: comparableTypes,
    SALE_STATUSES: saleStatuses,
    FILE_SELECTION_NAMES: fileSelectionNamesEnum,
    PROPERTY_DISCUSSION_NAMES: discussionNamesEnum,
    BASIS_SQUARE_FOOT_ANALYSIS: basisSquareFootAnalysisEnum,
    BASIS_SQUARE_FOOT_ANALYSIS_TEXTS: basisSquareFootAnalysisTextsEnum,
    COMPPLEX_ENUM: compplex,
    RENOVATION_TYPE: renovationTypeEnum,
    VALUE_CONCLUSION_NAME: valueConclusionEnum,
    UNIT_INCOME_TYPE: unitIncomeTypeEnum,
    RENT_LOSS_TYPE: rentLossTypeEnum
};
