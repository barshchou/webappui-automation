import Enums from "./enums";

export type StorageVcLossKeys = keyof typeof Enums.STORAGE_VC_LOSS_TYPE
export type ParkingVcLossKeys = keyof typeof Enums.PARKING_VC_LOSS_TYPE
export type LaundryVcLossKeys = keyof typeof Enums.LAUNDRY_VC_LOSS_TYPE
export type KnownInformationKeys = keyof typeof Enums.KNOWN_INFORMATION
export type TemplateTypesKeys = keyof typeof Enums.TEMPLATE_TYPE
export type ProFormaTypeKeys = keyof typeof Enums.PRO_FORMA_TYPES
export type IncomeTypesKeys = keyof typeof Enums.INCOME_TYPE
export type CompGroupsColumnsKeys = keyof typeof Enums.COMP_GROUP_COLUMNS
export type LeaseDateNameKeys = keyof typeof Enums.LEASE_DATE_NAME
export type LeaseStatusKeys = keyof typeof Enums.LEASE_STATUS
export type RentTypeKeys = keyof typeof Enums.RENT_TYPE
export type ImageTypeKeys = keyof typeof Enums.IMAGE_TYPE
export type InputTypeKeys = keyof typeof Enums.INPUT_TYPE
export type PerUnitPerSFKeys = keyof typeof Enums.PER_UNIT_PER_SF
export type CommercialUnitsUseTextsKeys = keyof typeof Enums.COMMERCIAL_UNITS_USE_TEXTS
export type CommercialUnitsGroupsKeys = keyof typeof Enums.COMMERCIAL_UNITS_GROUPS
export type CommercialUnitsFacadeKeys = keyof typeof Enums.COMMERCIAL_UNITS_FACADE_VALUES
export type CommercialUnitsStateKeys = keyof typeof Enums.COMMERCIAL_UNITS_STATE_VALUES
export type CommercialUnitsLocationKeys = keyof typeof Enums.COMMERCIAL_UNITS_LOCATION_VALUES
export type CommercialUnitsStreetTypeKeys = keyof typeof Enums.COMMERCIAL_UNITS_STREET_TYPE_VALUES
export type OrganizationAddresseePrefixKeys = keyof typeof Enums.ORGANIZATION_ADDRESSEE_PREFIX
export type OrganizationStateKeys = keyof typeof Enums.ORGANIZATION_STATE
export type ExpensePeriodTypeKeys = keyof typeof Enums.EXPENSE_PERIOD_TYPE
export type UnitsOfMeasureKeys = keyof typeof Enums.UNITS_OF_MEASURE
export type SourceOfInformationKeys = keyof typeof Enums.SOURCE_OF_INFORMATION
export type IncomeTypeKeys = keyof typeof Enums.INCOME_TYPE
export type PropertyConditions = keyof typeof Enums.PROPERTY_CONDITIONS
export type RentRollOptionsCheckboxesKeys= keyof typeof Enums.RENT_ROLL_OPTIONS_CHECKBOXES
export type FeatureFlagKeys = keyof typeof Enums.FEATURE_FLAG_KEYS
export type UserRoles = keyof typeof Enums.USER_ROLES
export type BoweryOffices = keyof typeof Enums.BOWERY_OFFICES
export type SalesAdjustmentGridKeys = keyof typeof Enums.SALES_ADJUSTMENT_GRID
export type RowsMarketAdjustmentKeys = keyof typeof Enums.ROWS_MARKET_ADJUSTMENT
export type SalesAdjustmentGridCumulativePrice = keyof typeof Enums.SALES_ADJUSTMENT_GRID_CUMULATIVE_PRICE
export type ReportStatus = keyof typeof Enums.REPORT_STATUS
export type BondTypes = keyof typeof Enums.BOND_TYPES
export type ExpenseCardName = keyof typeof Enums.EXPENSES_CARD_NAMES
export type ReimbursementColumnsId = keyof typeof Enums.REIMBURSEMENT_COLUMN_ID
export type CalculationUnitsKeys = keyof typeof Enums.CALCULATION_UNITS
export type CalculationType = keyof typeof Enums.CALCULATION_TYPE
export type SalePeriodValues = keyof typeof Enums.SALE_PERIOD_VALUES
export type SortValues = keyof typeof Enums.SORT_VALUES
export type ConditionValues = keyof typeof Enums.CONDITION_VALUES
export type ComparableTypes = keyof typeof Enums.COMPARABLE_TYPES
export type SaleStatuses = keyof typeof Enums.SALE_STATUSES
export type SaleCondition = keyof typeof Enums.SALE_CONDITION
export type FileSelection = keyof typeof Enums.FILE_SELECTION_NAMES
export type PropertyDiscussion = keyof typeof Enums.PROPERTY_DISCUSSION_NAMES
export type SalesAdjustmentGridDiscussionsKeys = keyof typeof Enums.SALES_ADJUSTMENT_GRID_DISCUSSIONS
export type SalesAdjustmentGridRowsKeys = keyof typeof Enums.SALES_ADJUSTMENT_GRID_ROWS
export type BasisSquareFootAnalysis = keyof typeof Enums.BASIS_SQUARE_FOOT_ANALYSIS
export type BasisSquareFootAnalysisTexts = keyof typeof Enums.BASIS_SQUARE_FOOT_ANALYSIS_TEXTS
export type RenovationType = keyof typeof Enums.RENOVATION_TYPE
export type ValueConclusionName = keyof typeof Enums.VALUE_CONCLUSION_NAME
export type UnitIncomeType = keyof typeof Enums.UNIT_INCOME_TYPE
export type RentLossType = keyof typeof Enums.RENT_LOSS_TYPE
export type DateType = keyof typeof Enums.DATE_TYPE
export type InterestAppraised = keyof typeof Enums.INTEREST_APPRAISED
export type HighestAndBestUseCommentsKeys = keyof typeof Enums.HIGHEST_AND_BEST_USE_COMMENTS_ENUM
export type LetterOfTransmittalSections = keyof typeof Enums.LETTER_SECTIONS
export type SWOTAnalysisSections = keyof typeof Enums.SWOT_SECTIONS
export type IncomeCapitalizationApproachSectionsKeys = keyof typeof Enums.INCOME_CAPITALIZATION_APPROACH_SECTIONS
export type CertificationSectionsKeys = keyof typeof Enums.CERTIFICATION_SECTIONS
export type OtherAdjustmentsExpansionRowsKeys = keyof typeof Enums.OTHER_ADJUSTMENTS_EXPANSION_ROWS
export type UtilitiesAdjustmentsExpansionRowsKeys = keyof typeof Enums.UTILITIES_ADJUSTMENTS_EXPANSION_ROWS
export type AdjustmentExpansionLabelsKeys = keyof typeof Enums.ADJUSTMENT_EXPANSION_LABELS
export type AmenitiesCheckboxesKeys = keyof typeof Enums.AMENITIES_CHECKBOXES
export type AmenitiesUploadsKeys = keyof typeof Enums.AMENITIES_UPLOADS
export type AmenitiesInputsKeys = keyof typeof Enums.AMENITIES_INPUTS
export type ProjectedTaxesSectionsKeys = keyof typeof Enums.PROJECTED_TAXES_SECTIONS
export type ProjectedTaxesInputsNamesKeys = keyof typeof Enums.PROJECTED_TAXES_INPUTS
export type ChipsKeys = keyof typeof Enums.CHIPS
export type ExpenseDataProvider = keyof typeof Enums.EXPENSE_DATA_PROVIDER
export type ExpenseItemBasisOfComparison = keyof typeof Enums.EXPENSE_ITEM_BASIS_OF_COMPARISON
export type ExportTitlesKeys = keyof typeof Enums.EXPORT_TITLES
export type CompStatusValues = keyof typeof Enums.COMP_STATUS_VALUES_FROM_STATUS_DROPDOWN.statusesFromStatusDropdown
export type CompStatusValuesFromList = keyof typeof Enums.COMP_STATUS_VALUES_FROM_STATUS_DROPDOWN.statusesFromCompsList
export type SectionsToIncludeInExportKeys = keyof typeof Enums.SECTIONS_TO_INCLUDE_IN_EXPORT
export type CoverPageLocatorNames = keyof typeof Enums.COVER_PAGE_LOCATOR_NAMES
export type CompPropertiesPathsInDatabase =  keyof typeof Enums.COMP_PROPERTIES_PATHS_DB.compPropertyPathsInDB
export type CompSaleStatusInDatabase =  keyof typeof Enums.COMP_PROPERTIES_PATHS_DB.saleStatusValuesInDB
export type CompSaleConditionInDatabase =  keyof typeof Enums.COMP_PROPERTIES_PATHS_DB.saleConditionValuesInDB
export type PagesTexboxNamesKeys = keyof typeof Enums.PAGES_TEXTBOX_NAMES
export type FinalValuesApproach = keyof typeof Enums.FINAL_VALUES_APPROACH
export type ValueConclusionMarketValueNames = keyof typeof Enums.VALUE_CONCLUSION_MARKET_VALUE_NAMES
export type SubjectPropertyDataSections = keyof typeof Enums.SUBJECT_PROPERTY_DATA_SECTIONS
export type EditOnSubjectPropertySections = keyof typeof Enums.EDIT_ON_SUBJECT_PROPERTY_SECTIONS
export type AdjustCompsDiscussionSections = keyof typeof Enums.ADJUST_COMPS_DISCUSSION_SECTIONS
export type AdjustCompsDiscussionTitles = keyof typeof Enums.ADJUST_COMPS_DISCUSSION_TITLES
export type ExpenseForecastDiscussionNames = keyof typeof Enums.EXPENSE_DISCUSSION_NAMES
