/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-namespace */
/**
 * ernst:
 * maybe we should separate namespaces for specific domain?
 * for example, we could have specific BoweryReports.ExpenseForecast
 * where we can have ForecastItem type.
 */

namespace BoweryReports {
    export type ReportFile = {
        name: string
        path: string
        extension: "docx" | "html",
        fullPath?: string
    }
    
    export type ConclusionValue = "AS_IS" | "AS_STABILIZED" | "AS_COMPLETE" 
    export type isSalesForcePull = boolean
    export type ReportCreationOptions = {
        incomeValue?: string,
        conclusionValue?: BoweryReports.ConclusionValue,
        templateValue?: string,
        address?: string,
        isSalesForcePull?: isSalesForcePull
    }
    export type LeaseDateName = "Start" | "Expiry"
    export type LeaseStatus = "Occupied" | "Vacant" | "Employee"
    export type ImageType = "Interior Images" | "Exterior Images";
    export type InputType = "drag-n-drop" | "input";
    export type UnitSF = "unit" | "sf" | "room"
    export type PerUnitPerSF = "Per Unit" | "Per SF"
    export type ForecastItemBasis = "insurance" | "electricity"
    | "fuel" | "waterAndSewer" | "repairsAndMaintenance" | "payrollAndBenefits" | "generalAndAdministrative" 
    | "legalAndProfessionalFees" | "miscellaneous" | "management" | "reserves" | "total" | "custom" | "utilities";

    export type CommercialUnitsUseValues = "retail" | "office" | "medical" | "community" | "industrial" | "other" | "undetermined";
    export type CommercialUnitsUseTexts = "Retail" | "Office" | "Medical Office" | "Community Facility" | "Industrial" |
        "Undetermined" | string;
    export type CommercialUnitsGroups = "Use" | "State" | "Location" | "Street Type" | "Floor" | "Grade" | "Facade"
    | "Ceiling Height" | "Frontage";

    export type ProFormaAnyIncome = {
        total: string,
        perSF: string,
        perUnit: string
    };

    export type CommercialUnitsGradeValues = "atGrade" | "partiallyBelowGrade" | "belowGrade" | "other";
    export type CommercialUnitsFacadeValues = "plate glass" | "other";
    export type CommercialUnitsStateValues = "finished" | "unfinished" | "vanilla box" | "other";
    export type CommercialUnitsCeilingHeightValues = "low" | "normal" | "high" | "other"; 
    export type CommercialUnitsLocationValues = "corner" | "mid-block" | "through-lot";
    export type CommercialUnitsStreetTypeValues = "side street" | "avenue";
    export type CommercialUnitsFloorValues = "belowGrade" | "groundFloor" | "upperFloor" | "other";
    export type CommercialUnitsFrontageValues = "small" | "medium"| "large" | "other";
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

    export type OrganizationAddresseePrefix = "Mr." | "Mrs." | "Ms." | "Dr.";
    export type OrganizationState = "New York" | "Alabama" | "Alaska" | "Arizona" | "Arkansas" | "California" | "Colorado" | "Connecticut"
    | "Delaware" | "District Of Columbia" | "Florida" | "Georgia" | "Hawaii" | "Idaho" | "Illinois" | "Indiana" | "Iowa" | "Kansas"
    | "Kentucky" | "Louisiana" | "Maine" | "Maryland" | "Massachusetts"| "Michigan" | "Minnesota" | "Mississippi" | "Missouri" | "Montana"
    | "Nebraska" | "Nevada" | "New Hampshire" | "New Jersey" | "New Mexico" | "North Carolina" | "North Dakota" | "Ohio" | "Oklahoma"
    | "Oregon" | "Pennsylvania" | "Puerto Rico" | "Rhode Island" | "South Carolina" | "South Dakota" | "Tennessee" | "Texas" | "Utah"
    | "Vermont" | "Virginia" | "Washington" | "Wisconsin" | "West Virginia" | "Wyoming";

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

    export type ExpensePeriodType = "Actual" | "Projection" | "Actual T12" | "Annualized Historical";

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

    export type ParkingVcLossType = "Residential" | "Parking"

    export type StorageVcLossType = "Residential" | "Storage V/C"

    export type LaundryVcLossType = "Residential" | "Laundry V/C"

    export type ReimbursementType = "dollarAmount" | "percentOfCurrentYearLiability" | "increaseOverBaseYear"

    export type KnownInformation = "Annual" | "Monthly"

    export type UnitsOfMeasure = "annually" | "monthly" | "per square foot per year" | "per square foot per month";

    export type UtilityExpenses = "brokenOut" | "combinedElectricityAndFuel" | "combinedAll";
}

namespace Utils {
    type _GraphQLRequest = {
        operationName: string,
        query: string,
        variables: object | any
    }
    
    export type GraphQLRequest = Partial<_GraphQLRequest>;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
namespace BoweryAutomation {
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
