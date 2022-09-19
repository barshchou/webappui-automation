import * as compplex from "./compplex";
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
import salesAdjustmentGridEnum from "./adjustComps/salesadjustment.enum";
import reportStatusEnum from "./reportParams/reportStatus.enum";
import bondTypesEnum from "./organization/bondTypes.enum";
import rowsMarketAdjustmentEnum from "./adjustComps/marketadjustment.enum";
import cumulativepriceSalesadjustEnum from "./adjustComps/cumulativeprice.salesadjust.enum";
import expensesForecastCardNamesEnum from "./expense/expensesForecastCardNames.enum";
import reimbursementColumnsIdEnum from "./reimbursementColumnsId.enum";
import calculationUnitsEnum from "./adjustComps/calculationUnits.enum";
import calculationTypesEnum from "./commercial/rent_reconciliation/calculationTypes.enum";
import salePeriodValuesEnum from "./findComps/salePeriodValues.enum";
import sortValues from "./findComps/sortValues.enum";
import conditionValues from "./findComps/propertyInformation/conditionValues.enum";
import comparableTypes from "./findComps/propertyInformation/comparableType.enum";
import saleStatuses from "./findComps/saleInformation/saleStatuses.enum";
import fileSelectionNamesEnum from "./property/fileSelectionNames.enum";
import discussionNamesEnum from "./property/discussionNames.enum";
import salesAdjustmentGridDiscussionsEnum from "./adjustComps/salesAdjustmentGridDiscussions.enum";
import salesAdjustmentGridRowsEnum from "./adjustComps/salesAdjustmentGridRows.enum";
import basisSquareFootAnalysisEnum from "./property/basisSquareFootAnalysis.enum";
import introductionTextboxNamesEnum from "./textboxNames/introductionTextboxNames.enum";
import pagesTextboxNamesEnum from "./textboxNames/pagesTextboxNames.enum";
import basisSquareFootAnalysisTextsEnum from "./sales/value_conclusion/basisSquareFootAnalysisTexts.enum";
import renovationTypeEnum from "./property/renovationType.enum";
import valueConclusionEnum from "./property/valueConclusion.enum";
import unitIncomeTypeEnum from "./unit/unitIncomeType.enum";
import rentLossTypeEnum from "./rentLossType.enum";
import dateTypeEnum from "./keyInfo/dateType.enum";
import interestAppraisedEnum from "./keyInfo/interestAppraised.enum";
import feasiblePropertyTypesEnum from "./property/feasiblePropertyTypes.enum";
import highestAndBestUseCommentsEnum from "./highestAndBestUseComments.enum";
import letterOfTransmittalEnum from "./cms/letterOfTransmittal.enum";
import swotAnalysisEnum from "./cms/swotAnalysis.enum";
import reportTypesEnum from "./salesforceJobs/reportTypes.enum";
import incomeCapitalizationApproachEnum from "./cms/incomeCapitalizationApproach.enum";
import certificationEnum from "./cms/certification.enum";
import appraiserSFEnum from "./salesforceJobs/appraiserSF.enum";
import otherAdjustmentsExpansionRowsEnum from "./adjustComps/otherAdjustmentsExpansionRows.enum";
import utilitiesAdjustmentsExpansionRowsEnum from "./adjustComps/utilitiesAdjustmentsExpansionRows.enum";
import adjustmentExpansionLabelsEnum from "./sales/adjustComps/adjustmentExpansionLabels.enum";
import amenitiesCheckboxesEnum from "./property/amenities/amenitiesCheckboxes.enum";
import amenitiesUploadsEnum from "./property/amenities/amenitiesUploads.enum";
import amenitiesInputsEnum from "./property/amenities/amenitiesInputs.enum";
import projectedTaxesSectionsEnum from "./income/taxInfo/projectedTaxesSections.enum";
import projectedTaxesInputsNamesEnum from "./income/taxInfo/projectedTaxesInputsNames.enum";
import chipsEnum from "./chips.enum";
import expenseHistoryDataProviderEnum from "./expense/expenseHistoryDataProvider.enum";
import expenseItemBasisOfComparisonEnum from "./expense/expenseItemBasisOfComparison.enum";
import exportTitlesEnum from "./exportTitles.enum";
import compStatusValuesEnum from "./findComps/compStatusValues.enum";
import coverPageLocatorNamesEnum from "./coverPageLocatorNames.enum";
import marketResearchTypesEnum from "./salesforceJobs/marketResearchTypes.enum";
import compPropertyPathsInDB from "./compplex/compPropertiesAndValues.enum";
import saleStatusValuesInDB from "./compplex/compPropertiesAndValues.enum";
import saleConditionValuesInDB from "./compplex/compPropertiesAndValues.enum";
import finalValueApproachEnum from "./final/finalValuesReconciliation/finalValueApproach.enum";
import valueConclusionMarketValueNamesEnum from "./sales/value_conclusion/valueConclusionMarketValueNames.enum";
import subjectPropertyDataSectionsEnum from "./subject_property_data_sections.enum";
import editOnSubjectPropertySectionsEnum from "./edit_on_subject_property_sections.enum";

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
    SALES_ADJUSTMENT_GRID: salesAdjustmentGridEnum,
    SALES_ADJUSTMENT_GRID_CUMULATIVE_PRICE: cumulativepriceSalesadjustEnum,
    ROWS_MARKET_ADJUSTMENT: rowsMarketAdjustmentEnum,
    REPORT_STATUS: reportStatusEnum,
    BOND_TYPES: bondTypesEnum,
    EXPENSES_CARD_NAMES: expensesForecastCardNamesEnum,
    REIMBURSEMENT_COLUMN_ID: reimbursementColumnsIdEnum,
    CALCULATION_UNITS: calculationUnitsEnum,
    CALCULATION_TYPE: calculationTypesEnum,
    SALE_PERIOD_VALUES: salePeriodValuesEnum,
    SORT_VALUES: sortValues,
    CONDITION_VALUES: conditionValues,
    COMPARABLE_TYPES: comparableTypes,
    SALE_STATUSES: saleStatuses,
    FILE_SELECTION_NAMES: fileSelectionNamesEnum,
    PROPERTY_DISCUSSION_NAMES: discussionNamesEnum,
    SALES_ADJUSTMENT_GRID_DISCUSSIONS: salesAdjustmentGridDiscussionsEnum,
    SALES_ADJUSTMENT_GRID_ROWS: salesAdjustmentGridRowsEnum,
    BASIS_SQUARE_FOOT_ANALYSIS: basisSquareFootAnalysisEnum,
    INTRODUCTION_TEXTBOX_NAMES: introductionTextboxNamesEnum,
    PAGES_TEXTBOX_NAMES: pagesTextboxNamesEnum,
    BASIS_SQUARE_FOOT_ANALYSIS_TEXTS: basisSquareFootAnalysisTextsEnum,
    COMPPLEX_ENUM: compplex,
    RENOVATION_TYPE: renovationTypeEnum,
    VALUE_CONCLUSION_NAME: valueConclusionEnum,
    UNIT_INCOME_TYPE: unitIncomeTypeEnum,
    RENT_LOSS_TYPE: rentLossTypeEnum,
    DATE_TYPE: dateTypeEnum,
    INTEREST_APPRAISED: interestAppraisedEnum,
    FEASIBLE_PROPERTY_TYPES: feasiblePropertyTypesEnum,
    HIGHEST_AND_BEST_USE_COMMENTS_ENUM: highestAndBestUseCommentsEnum,
    LETTER_SECTIONS: letterOfTransmittalEnum,
    SWOT_SECTIONS: swotAnalysisEnum,
    REPORT_TYPES_SF: reportTypesEnum,
    INCOME_CAPITALIZATION_APPROACH_SECTIONS: incomeCapitalizationApproachEnum,
    CERTIFICATION_SECTIONS: certificationEnum,
    APPRAISER_SF: appraiserSFEnum,
    OTHER_ADJUSTMENTS_EXPANSION_ROWS: otherAdjustmentsExpansionRowsEnum,
    UTILITIES_ADJUSTMENTS_EXPANSION_ROWS: utilitiesAdjustmentsExpansionRowsEnum,
    ADJUSTMENT_EXPANSION_LABELS: adjustmentExpansionLabelsEnum,
    AMENITIES_CHECKBOXES: amenitiesCheckboxesEnum,
    AMENITIES_UPLOADS: amenitiesUploadsEnum,
    AMENITIES_INPUTS: amenitiesInputsEnum,
    PROJECTED_TAXES_SECTIONS: projectedTaxesSectionsEnum,
    PROJECTED_TAXES_INPUTS: projectedTaxesInputsNamesEnum,
    CHIPS: chipsEnum,
    EXPENSE_DATA_PROVIDER: expenseHistoryDataProviderEnum,
    EXPENSE_ITEM_BASIS_OF_COMPARISON: expenseItemBasisOfComparisonEnum,
    EXPORT_TITLES: exportTitlesEnum,
    COMP_STATUS_VALUES: compStatusValuesEnum,
    COVER_PAGE_LOCATOR_NAMES: coverPageLocatorNamesEnum,
    MARKET_RESEARCH_TYPES: marketResearchTypesEnum,
    FINAL_VALUES_APPROACH: finalValueApproachEnum,
    COMP_PROPERTIES_PATHS_DB: compPropertyPathsInDB,
    COMP_SALE_STATUS_DB: saleStatusValuesInDB,
    COMP_SALE_CONDITION_DB: saleConditionValuesInDB,
    VALUE_CONCLUSION_MARKET_VALUE_NAMES: valueConclusionMarketValueNamesEnum,
    SUBJECT_PROPERTY_DATA_SECTIONS: subjectPropertyDataSectionsEnum,
    EDIT_ON_SUBJECT_PROPERTY_SECTIONS: editOnSubjectPropertySectionsEnum
};
