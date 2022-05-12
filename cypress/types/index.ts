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
    export type UnitSF = "unit" | "sf"
    export type PerUnitPerSF = "Per Unit" | "Per SF"
    export type ForecastItemBasis = "insurance" | "electricity"
    | "fuel" | "waterAndSewer" | "repairsAndMaintenance" | "payrollAndBenefits" | "generalAndAdministrative" 
    | "legalAndProfessionalFees" | "miscellaneous" | "management" | "reserves" | "total" | "custom";

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
    export type CommercialUnitsFloorValues = "belowGrade" | "groundFloor" | "upperFloor" | "other";
    export type CommercialUnitsStreetTypeValues = "side street" | "avenue";
    export type CommercialUnitsLocationValues = "corner" | "mid-block" | "through-lot" ;
    export type CommercialUnitsFrontageValues = "small" | "medium" | "large" | "other"; 

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


    export type ForecastItem = { 
        name: BoweryReports.ForecastItemBasis | string, 
        basis?: BoweryReports.UnitSF, 
        forecast?: number | undefined, 
        projection?: number 
    }
    export type Comparable = {address: string, location?: string, period?: string, squareFeet?: number, resUnits?: number,
        insurance?: number, electricity?: number, repairsAndMaintenance?: number, payrollAndBenefits?: number,
        generalAndAdministrative?: number, management?: number, toe?: string};

    export type BuildingDescription = {grossArea: number, numberOfUnits: number}

    export type ResidentialUnit = {
        footage?: number,
        rooms?: number,
        monthlyRent: number,
        leaseStatus?: BoweryReports.LeaseStatus
    }
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
}
