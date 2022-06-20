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