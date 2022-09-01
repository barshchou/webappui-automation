/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-namespace */

import * as KeyInfo from '../enums/enumKeys.enum';
import Enums from "../enums/enums";

export namespace BoweryReports {
    export type ReportFile = {
        name: string
        path: string
        extension: "docx" | "html",
        fullPath?: string
    }

    export type ReportStatus = typeof Enums.REPORT_STATUS[KeyInfo.ReportStatus]
    export type ConclusionValue = keyof typeof Enums.VALUE_CONCLUSION_TYPE 
    export type isSalesForcePull = boolean
    export type ReportCreationOptions = {
        incomeValue?: typeof Enums.INCOME_TYPE[KeyInfo.IncomeTypeKeys],
        conclusionValue?: ConclusionValue,
        templateValue?: TemplateTypes,
        address?: string,
        isSalesForcePull?: isSalesForcePull
    }
    export type RentType = typeof Enums.RENT_TYPE[KeyInfo.RentTypeKeys]
    export type RentRollOptionsCheckboxesType = 
        typeof Enums.RENT_ROLL_OPTIONS_CHECKBOXES[KeyInfo.RentRollOptionsCheckboxesKeys]
    export type ChipsCreationOptions = {
        block?: string,
        buildingName?: string,
        grossBuildingArea?: number,
        lotValue?: string,
        numberOfCommercialUnits?: number,
        numberOfResidentialUnits?: number,
        siteArea?: number,
        streetAddress?: string,
        streetName?: string,
        currentCommercialUnits?: number,
        currentResidentialUnits?: number
    }
    export type LeaseDateName = typeof Enums.LEASE_DATE_NAME[KeyInfo.LeaseDateNameKeys]
    export type LeaseStatus = typeof Enums.LEASE_STATUS[KeyInfo.LeaseStatusKeys]
    export type ImageType =  typeof Enums.IMAGE_TYPE[KeyInfo.ImageTypeKeys]
    export type InputType = typeof Enums.INPUT_TYPE[KeyInfo.InputTypeKeys]
    export type UnitSF = keyof typeof Enums.UNIT_SF
    export type PerUnitPerSF = typeof Enums.PER_UNIT_PER_SF[KeyInfo.PerUnitPerSFKeys]
    export type ForecastItemBasis = keyof typeof Enums.EXPENSE_CELL

    export namespace CommercialUnits {
        export type UseValues = keyof typeof Enums.COMMERCIAL_UNITS_USE_VALUES
        export type UseTexts = typeof Enums.COMMERCIAL_UNITS_USE_TEXTS[KeyInfo.CommercialUnitsUseTextsKeys]
        export type Groups = typeof Enums.COMMERCIAL_UNITS_GROUPS[KeyInfo.CommercialUnitsGroupsKeys]
        export type GradeValues = keyof typeof Enums.COMMERCIAL_UNITS_GRADE_VALUES
        export type FacadeValues = typeof Enums.COMMERCIAL_UNITS_FACADE_VALUES[KeyInfo.CommercialUnitsFacadeKeys]
        export type StateValues = typeof Enums.COMMERCIAL_UNITS_STATE_VALUES[KeyInfo.CommercialUnitsStateKeys]
        export type CeilingHeightValues = keyof typeof Enums.COMMERCIAL_UNITS_CEILING_HEIGHT_VALUES
        export type LocationValues = typeof Enums.COMMERCIAL_UNITS_LOCATION_VALUES[KeyInfo.CommercialUnitsLocationKeys]
        export type StreetTypeValues =  
            typeof Enums.COMMERCIAL_UNITS_STREET_TYPE_VALUES[KeyInfo.CommercialUnitsStreetTypeKeys]
        export type FloorValues = keyof typeof Enums.COMMERCIAL_UNITS_FLOOR_VALUES
        export type FrontageValues = keyof typeof Enums.COMMERCIAL_UNITS_FRONTAGE_VALUES

        export type GroupsValues = UseValues | GradeValues | FacadeValues | StateValues
        | CeilingHeightValues | LocationValues | StreetTypeValues | FrontageValues | FloorValues;
    }

    export namespace SalesAdjustmentGrid {
        export type AdjustmentName = typeof Enums.SALES_ADJUSTMENT_GRID[KeyInfo.SalesAdjustmentGridKeys]
        export type RowsMarketAdjustment = typeof Enums.ROWS_MARKET_ADJUSTMENT[KeyInfo.RowsMarketAdjustmentKeys]
        export type CumulativePrice = 
            typeof Enums.SALES_ADJUSTMENT_GRID_CUMULATIVE_PRICE[KeyInfo.SalesAdjustmentGridCumulativePrice]
        export type CalculationUnits = typeof Enums.CALCULATION_UNITS[KeyInfo.CalculationUnitsKeys]
        export type SalesAdjustmentGridDiscussions = 
            typeof Enums.SALES_ADJUSTMENT_GRID_DISCUSSIONS[KeyInfo.SalesAdjustmentGridDiscussionsKeys]
        export type SalesAdjustmentGridRows = 
            typeof Enums.SALES_ADJUSTMENT_GRID_ROWS[KeyInfo.SalesAdjustmentGridRowsKeys]
        export type OtherAdjustmentsRows =
            typeof Enums.OTHER_ADJUSTMENTS_EXPANSION_ROWS[KeyInfo.OtherAdjustmentsExpansionRowsKeys]
        export type UtilitiesAdjustmentsRows =
            typeof Enums.UTILITIES_ADJUSTMENTS_EXPANSION_ROWS[KeyInfo.UtilitiesAdjustmentsExpansionRowsKeys]
    }

    export type ProFormaAnyIncome = {
        total: string,
        perSF: string,
        perUnit: string
    };
    export type OrganizationAddresseePrefix = 
        typeof Enums.ORGANIZATION_ADDRESSEE_PREFIX[KeyInfo.OrganizationAddresseePrefixKeys]
    export type OrganizationState = typeof Enums.ORGANIZATION_STATE[KeyInfo.OrganizationStateKeys]
    export type BoweryOffices = typeof Enums.BOWERY_OFFICES[KeyInfo.BoweryOffices]

    export type ForecastItem = { 
        name: ForecastItemBasis | string, 
        basis?: UnitSF, 
        forecast?: number | undefined, 
        projection?: number,
        cardName?: ExpenseCardNames,
        expenseUIName?: ProFormaTypes
    }

    export type Periods = { 
        expensePeriodType: ExpensePeriodType | string, 
        month?: string,
        year: number | string, 
        insurance?: number, electricity?: number, fuel?: number, waterAndSewer?: number, 
        repairsAndMaintenance?: number, payrollAndBenefits?: number, generalAndAdministrative?: number, 
        legalAndProfessionalFees?: number, miscellaneous?: number, management?: number, replacementReserves?: number 
    };

    export type ExpensePeriodType = typeof Enums.EXPENSE_PERIOD_TYPE[KeyInfo.ExpensePeriodTypeKeys]

    export type Comparable = {
        address: string, location?: string, period?: string, squareFeet?: number, resUnits?: number,
        insurance?: number, electricity?: number, fuel?: number, waterAndSewer?: number,
        repairsAndMaintenance?: number, payrollAndBenefits?: number, generalAndAdministrative?: number,
        legalAndProfessionalFees?: number, miscellaneous?: number,
        management?: number, replacementReserves?: number, toe?: string
    };

    export type BuildingDescription = {
        grossArea: number,
        numberOfUnits: number
    }

    export type ResidentialUnit = {
        footage?: number,
        rooms?: number,
        monthlyRent: number,
        leaseStatus?: LeaseStatus,
        rentType?: RentType,
        bedRooms?: number,
        unitNumber?: number
    }

    export type RentCompField = {
        name: string,
        value: string,
        type: "input" | "dropdown"
    };

    export type OtherIncomeItem = {
        vcLossType: string,
        vcPercent: number,
        incomeCategory: string,
        annualAmount: number
    }

    export type ParkingVcLossType = typeof Enums.PARKING_VC_LOSS_TYPE[KeyInfo.ParkingVcLossKeys]

    export type StorageVcLossType =  typeof Enums.STORAGE_VC_LOSS_TYPE[KeyInfo.StorageVcLossKeys]

    export type LaundryVcLossType = typeof Enums.LAUNDRY_VC_LOSS_TYPE[KeyInfo.LaundryVcLossKeys]

    export type ReimbursementType = keyof typeof Enums.REIMBURSEMENT_TYPES

    export type ReimbursementColumnsId = typeof Enums.REIMBURSEMENT_COLUMN_ID[KeyInfo.ReimbursementColumnsId]

    export type KnownInformation = typeof Enums.KNOWN_INFORMATION[KeyInfo.KnownInformationKeys]

    export type UnitsOfMeasure = typeof Enums.UNITS_OF_MEASURE[KeyInfo.UnitsOfMeasureKeys]

    export type UtilityExpenses = keyof typeof Enums.UTILITY_EXPENSES

    export type CompGroupsColumns = typeof Enums.COMP_GROUP_COLUMNS[KeyInfo.CompGroupsColumnsKeys]

    export type leaseDate = {
        name: LeaseDateName,
        value: string
    }

    export type CurrentTaxInfoData = {
        liabilityBasis?: string,
        landValue: number,
        buildingValue: number,
        className?: string,
        rateYear?: number,
        rateValue?: number,
        liabilityCommentary?: string
    };

    export type TaxCompData = {
        address: string,
        yearBuilt: number,
        basis: number,
        taxPerBasis: number,
        sourceOfInfo: string,
        taxYear: number
    }

    export type ProjectedTaxesSectionsKeys = keyof typeof Enums.PROJECTED_TAXES_SECTIONS
    export type ProjectedTaxesSectionsValues = typeof Enums.PROJECTED_TAXES_SECTIONS[KeyInfo.ProjectedTaxesSectionsKeys]
    export type ProjectedTaxesInputsNamesValues = 
        typeof Enums.PROJECTED_TAXES_INPUTS[KeyInfo.ProjectedTaxesInputsNamesKeys]

    export type UnitType = keyof typeof Enums.UNIT_TYPE
    export type SourceOfInformation = typeof Enums.SOURCE_OF_INFORMATION[KeyInfo.SourceOfInformationKeys]
    export type Amenities = keyof typeof Enums.AMENITIES

    export type RentCompsFilter = {
        name: string,
        value: string | number 
    };

    export type TemplateTypes = typeof Enums.TEMPLATE_TYPE[KeyInfo.TemplateTypesKeys]
    export type ProFormaTypes = typeof Enums.PRO_FORMA_TYPES[KeyInfo.ProFormaTypeKeys]
    export type IncomeTypeCellNamesTypes = keyof typeof Enums.INCOME_TYPES_CELL_NAMES
    export type IncomeTypes = typeof Enums.INCOME_TYPE[KeyInfo.IncomeTypesKeys]
    export type MarketResearch = {
        neighborhoodValue: string,
        marketArea: string,
        state: string,
        macroMarket: string,
        submarket: string,
        dateOfValuation: string,
        marketDate: string,
        quarter?: string,
        document?: string
    }

    export type MarketAnalysisUses = keyof typeof Enums.MARKET_ANALYSIS_USES

    export type ExportTitles = typeof Enums.EXPORT_TITLES[KeyInfo.ExportTitlesKeys];

    export type SectionsToIncludeInExport = typeof 
        Enums.SECTIONS_TO_INCLUDE_IN_EXPORT[KeyInfo.SectionsToIncludeInExportKeys];

    export type PropertyConditions = typeof Enums.PROPERTY_CONDITIONS[KeyInfo.PropertyConditions];

    export type PropertyConditionsRadios = keyof typeof Enums.PROPERTY_CONDITIONS_RADIOS;
    export type BondTickers = typeof Enums.BOND_TYPES[KeyInfo.BondTypes]
    export type BondTypes = keyof typeof  Enums.BOND_TYPES
    export type ExpenseCardNames = typeof Enums.EXPENSES_CARD_NAMES[KeyInfo.ExpenseCardName]

    export namespace FindComps {
        export type SalePeriodValues = typeof Enums.SALE_PERIOD_VALUES[KeyInfo.SalePeriodValues]
        export type SelectedComparablesSortType = typeof Enums.SORT_VALUES[KeyInfo.SortValues]
        export type ConditionValueType = typeof Enums.CONDITION_VALUES[KeyInfo.ConditionValues]
        export type ComparableTypes = typeof Enums.COMPARABLE_TYPES[KeyInfo.ComparableTypes]
        export type SaleStatusType = typeof Enums.SALE_STATUSES[KeyInfo.SaleStatuses]
        export type CompStatusValues = typeof Enums.COMP_STATUS_VALUES[KeyInfo.CompStatusValues]
    }
    
    export type CalculationType = typeof Enums.CALCULATION_TYPE[KeyInfo.CalculationType]
    export type FileSelection = typeof Enums.FILE_SELECTION_NAMES[KeyInfo.FileSelection]

    export type FeasiblePropertyType = keyof typeof Enums.FEASIBLE_PROPERTY_TYPES
    export type PropertyDiscussion = typeof Enums.PROPERTY_DISCUSSION_NAMES[KeyInfo.PropertyDiscussion]
    export type BasisSquareFootAnalysis = typeof Enums.BASIS_SQUARE_FOOT_ANALYSIS[KeyInfo.BasisSquareFootAnalysis]
    export type BasisSquareFootAnalysisTexts =
        typeof Enums.BASIS_SQUARE_FOOT_ANALYSIS_TEXTS[KeyInfo.BasisSquareFootAnalysisTexts]
    export type RenovationType = typeof Enums.RENOVATION_TYPE[KeyInfo.RenovationType]
    export type ValueConclusionName = typeof Enums.VALUE_CONCLUSION_NAME[KeyInfo.ValueConclusionName]
    export type ValueConclusionKeys = keyof typeof Enums.VALUE_CONCLUSION_NAME
    export type UnitIncomeType = typeof Enums.UNIT_INCOME_TYPE[KeyInfo.UnitIncomeType]
    export type RentLossType = typeof  Enums.RENT_LOSS_TYPE[KeyInfo.RentLossType]
    export type DateType = typeof Enums.DATE_TYPE[KeyInfo.DateType]

    export type KeyInfoDateType = {
        type: BoweryReports.DateType,
        date: string
    }

    export type HighestAndBestUseComments = typeof Enums.HIGHEST_AND_BEST_USE_COMMENTS_ENUM[
        KeyInfo.HighestAndBestUseCommentsKeys
    ]
    export type AdjustmentExpansionLabels =
        typeof Enums.ADJUSTMENT_EXPANSION_LABELS[KeyInfo.AdjustmentExpansionLabelsKeys]

    export type ChipsType = typeof Enums.CHIPS[KeyInfo.ChipsKeys]
    export type ExpenseDataProvider = typeof Enums.EXPENSE_DATA_PROVIDER[KeyInfo.ExpenseDataProvider]
    export type ExpenseItemBasisOfComparison = typeof
        Enums.EXPENSE_ITEM_BASIS_OF_COMPARISON[KeyInfo.ExpenseItemBasisOfComparison]
}
