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
    
    export type ConclusionValue = keyof typeof Enums.VALUE_CONCLUSION_TYPE 
    export type isSalesForcePull = boolean
    export type ReportCreationOptions = {
        incomeValue?: typeof Enums.INCOME_TYPE[KeyInfo.IncomeTypeKeys],
        conclusionValue?: ConclusionValue,
        templateValue?: TemplateTypes,
        address?: string,
        isSalesForcePull?: isSalesForcePull
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
        export type StreetTypeValues =  typeof Enums.COMMERCIAL_UNITS_STREET_TYPE_VALUES[KeyInfo.CommercialUnitsStreetTypeKeys]
        export type FloorValues = keyof typeof Enums.COMMERCIAL_UNITS_FLOOR_VALUES
        export type FrontageValues = keyof typeof Enums.COMMERCIAL_UNITS_FRONTAGE_VALUES

        export type GroupsValues = UseValues | GradeValues | FacadeValues | StateValues
        | CeilingHeightValues | LocationValues | StreetTypeValues | FrontageValues | FloorValues;
    }

    export type ProFormaAnyIncome = {
        total: string,
        perSF: string,
        perUnit: string
    };
    export type OrganizationAddresseePrefix = typeof Enums.ORGANIZATION_ADDRESSEE_PREFIX[KeyInfo.OrganizationAddresseePrefixKeys]
    export type OrganizationState = typeof Enums.ORGANIZATION_STATE[KeyInfo.OrganizationStateKeys]
    export type BoweryOffices = typeof Enums.BOWERY_OFFICES[KeyInfo.BoweryOffices]

    export type ForecastItem = { 
        name: ForecastItemBasis | string, 
        basis?: UnitSF, 
        forecast?: number | undefined, 
        projection?: number 
    }

    export type Periods = { 
        expensePeriodType: ExpensePeriodType | string, 
        month?: string,
        year: number | string, 
        insurance?: number, electricity?: number, fuel?: number, waterAndSewer?: number, repairsAndMaintenance?: number, 
        payrollAndBenefits?: number, generalAndAdministrative?: number, legalAndProfessionalFees?: number, miscellaneous?: number, 
        management?: number, replacementReserves?: number 
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
        leaseStatus?: LeaseStatus
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

    export type PropertyConditions = typeof Enums.PROPERTY_CONDITIONS[KeyInfo.PropertyConditions];

    export type PropertyConditionsRadios = keyof typeof Enums.PROPERTY_CONDITIONS_RADIOS;
}