
import * as KeyInfo from './../enums/enumKeys.enum';
import Enums from "../enums/enums";
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-namespace */
/**
 * ernst:
 * maybe we should separate namespaces for specific domain?
 * for example, we could have specific BoweryReports.ExpenseForecast
 * where we can have ForecastItem type.
 */

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
        incomeValue?: string,
        conclusionValue?: ConclusionValue,
        templateValue?: string,
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

    export type CommercialUnitsUseValues = keyof typeof Enums.COMMERCIAL_UNITS_USE_VALUES;
    export type CommercialUnitsUseTexts = typeof Enums.COMMERCIAL_UNITS_USE_TEXTS[KeyInfo.CommercialUnitsUseTextsKeys];
    export type CommercialUnitsGroups = typeof Enums.COMMERCIAL_UNITS_GROUPS[KeyInfo.CommercialUnitsGroupsKeys]

    export type ProFormaAnyIncome = {
        total: string,
        perSF: string,
        perUnit: string
    };

    export type CommercialUnitsGradeValues = keyof typeof Enums.COMMERCIAL_UNITS_GRADE_VALUES
    export type CommercialUnitsFacadeValues = typeof Enums.COMMERCIAL_UNITS_FACADE_VALUES[KeyInfo.CommercialUnitsFacadeKeys]
    export type CommercialUnitsStateValues = typeof Enums.COMMERCIAL_UNITS_STATE_VALUES[KeyInfo.CommercialUnitsStateKeys]
    export type CommercialUnitsCeilingHeightValues = keyof typeof Enums.COMMERCIAL_UNITS_CEILING_HEIGHT_VALUES
    export type CommercialUnitsLocationValues = typeof Enums.COMMERCIAL_UNITS_LOCATION_VALUES[KeyInfo.CommercialUnitsLocationKeys]
    export type CommercialUnitsStreetTypeValues =  typeof Enums.COMMERCIAL_UNITS_STREET_TYPE_VALUES[KeyInfo.CommercialUnitsStreetTypeKeys]
    export type CommercialUnitsFloorValues = keyof typeof Enums.COMMERCIAL_UNITS_FLOOR_VALUES
    export type CommercialUnitsFrontageValues = keyof typeof Enums.COMMERCIAL_UNITS_FRONTAGE_VALUES
    export namespace CommercialUnits {
        /*
        More Unit Groups Values will be added after other values types added
        */
        export type GroupsValues = CommercialUnitsUseValues | CommercialUnitsGradeValues | CommercialUnitsFacadeValues | CommercialUnitsStateValues 
        | CommercialUnitsCeilingHeightValues | CommercialUnitsLocationValues | CommercialUnitsStreetTypeValues | CommercialUnitsFrontageValues | CommercialUnitsFloorValues;
    }
    

    /*
    More Unit Groups Values will be added after other values types added
     */
    export type CommercialUnitGroupsValues = CommercialUnitsUseValues | CommercialUnitsGradeValues | CommercialUnitsFacadeValues | CommercialUnitsCeilingHeightValues | CommercialUnitsFrontageValues;

    export type OrganizationAddresseePrefix = typeof Enums.ORGANIZATION_ADDRESSEE_PREFIX[KeyInfo.OrganizationAddresseePrefixKeys]
    export type OrganizationState = typeof Enums.ORGANIZATION_STATE[KeyInfo.OrganizationStateKeys]

    export type ForecastItem = { 
        name: BoweryReports.ForecastItemBasis | string, 
        basis?: BoweryReports.UnitSF, 
        forecast?: number | undefined, 
        projection?: number 
    }

    export type Periods = { 
        expensePeriodType: BoweryReports.ExpensePeriodType | string, 
        month?: string,
        year: number | string, 
        insurance?: number, electricity?: number, fuel?: number, waterAndSewer?: number, repairsAndMaintenance?: number, 
        payrollAndBenefits?: number, generalAndAdministrative?: number, legalAndProfessionalFees?: number, miscellaneous?: number, 
        management?: number, replacementReserves?: number 
    };

    export type ExpensePeriodType = typeof Enums.EXPENSE_PERIOD_TYPE[KeyInfo.ExpensePeriodTypeKeys]

    export type Comparable = {address: string, location?: string, period?: string, squareFeet?: number, resUnits?: number,
        insurance?: number, electricity?: number, fuel?: number, waterAndSewer?: number, repairsAndMaintenance?: number, 
        payrollAndBenefits?: number, generalAndAdministrative?: number, legalAndProfessionalFees?: number, miscellaneous?: number, 
        management?: number, replacementReserves?: number, toe?: string};

    export type BuildingDescription = {grossArea: number, numberOfUnits: number}

    export type ResidentialUnit = {
        footage?: number,
        rooms?: number,
        monthlyRent: number,
        leaseStatus?: BoweryReports.LeaseStatus
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

    export type UtilityExpenses = keyof typeof Enums.UTILITY_EXPENSES;

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
}

export namespace Utils {
    type _GraphQLRequest = {
        operationName: string,
        query: string,
        variables: object | any
    }
    
    export type GraphQLRequest = Partial<_GraphQLRequest>;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export namespace BoweryAutomation {
    /**
     * Base data for report setup
     */
    export type BaseReportCreationData = {
        incomeValue: string, 
        address: string, 
        isSalesForcePull: boolean,
        reportNumber: string, 
        templateValue: string,
        conclusionValue: BoweryReports.ConclusionValue
    }

    /**
     * Common data for report setup
     */
    export type ReportCreationData = {
        state: string,
        identifierType: string,
        identifier: string
    } & BaseReportCreationData

    export type OrganizationCreateNewClientData = {
        prefix?: BoweryReports.OrganizationAddresseePrefix,
        title?: string,
        firstName: string,
        middleInitial?: string,
        lastName: string,
        clientSuffix?: string,
        clientCompanyName: string,
        streetAddress: string,
        city: string,
        state?: BoweryReports.OrganizationState,
        zipCode?: string | number
    };
}
