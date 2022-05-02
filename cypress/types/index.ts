/* eslint-disable @typescript-eslint/no-namespace */
/**
 * ernst:
 * maybe we should separate namespaces for specific domain?
 * for example, we could have specific BoweryReports.ExpenseForecast
 * where we can have ForecastItem type.
 */

namespace BoweryReports {
    export type ConclusionValue = "AS_IS" | "AS_STABILIZED" | "AS_COMPLETE" 
    export type ReportCreationOptions = {
        incomeValue?: string,
        conclusionValue?: BoweryReports.ConclusionValue
    }
    export type LeaseDateName = "Start" | "Expiry"
    export type LeaseStatus = "Occupied" | "Vacant"
    export type UnitSF = "unit" | "sf"
    export type PerUnitPerSF = "Per Unit" | "Per SF"
    export type ForecastItemBasis = "insurance" | "electricity"
    | "fuel" | "waterAndSewer" | "repairsAndMaintenance" | "payrollAndBenefits" | "generalAndAdministrative" 
    | "legalAndProfessionalFees" | "miscellaneous" | "management" | "reserves" | "total";

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

    /*
    More Unit Groups Values will be added after other values types added
     */
    export type CommercialUnitGroupsValues = CommercialUnitsUseValues | CommercialUnitsGradeValues | CommercialUnitsFacadeValues;

    export type OrganizationAddresseePrefix = "Mr." | "Mrs." | "Ms." | "Dr.";
    export type OrganizationState = "New York" | "Alabama" | "Alaska" | "Arizona" | "Arkansas" | "California" | "Colorado" | "Connecticut"
    | "Delaware" | "District Of Columbia" | "Florida" | "Georgia" | "Hawaii" | "Idaho" | "Illinois" | "Indiana" | "Iowa" | "Kansas"
    | "Kentucky" | "Louisiana" | "Maine" | "Maryland" | "Massachusetts"| "Michigan" | "Minnesota" | "Mississippi" | "Missouri" | "Montana"
    | "Nebraska" | "Nevada" | "New Hampshire" | "New Jersey" | "New Mexico" | "North Carolina" | "North Dakota" | "Ohio" | "Oklahoma"
    | "Oregon" | "Pennsylvania" | "Puerto Rico" | "Rhode Island" | "South Carolina" | "South Dakota" | "Tennessee" | "Texas" | "Utah"
    | "Vermont" | "Virginia" | "Washington" | "Wisconsin" | "West Virginia" | "Wyoming";
    export type OrganizationCreateNewClient = {
        prefix: BoweryReports.OrganizationAddresseePrefix,
        title: string,
        firstName: string,
        middleInitial: string,
        lastName: string,
        clientSuffix: string,
        clientCompanyName: string,
        streetAddress: string,
        city: string,
        state: BoweryReports.OrganizationState,
        zipCode: string | number
    };


    export type ForecastItem = { 
        name: BoweryReports.ForecastItemBasis, 
        basis?: BoweryReports.UnitSF, 
        forecast?: number | undefined, 
        projection?: number 
    }
    export type Comparable = {address: string, location?: string, period?: string, squareFeet?: number, resUnits?: number,
        insurance?: number, electricity?: number, repairsAndMaintenance?: number, payrollAndBenefits?: number,
        generalAndAdministrative?: number, management?: number, toe?: string};

    export type BuildingDescription = {grossArea: number, numberOfUnits: number}
}

namespace BoweryAutomation {
    /**
     * Base data for report setup
     */
    export type BaseReportCreationData = {
        incomeValue: string, 
        address: string, 
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
}