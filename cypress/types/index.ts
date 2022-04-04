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
    export type LeaseStatus = "Occupied" | "Vacant"
    export type UnitSF = "unit" | "sf"
    export type PerUnitPerSF = "Per Unit" | "Per SF"
    export type ForecastItemBasis = "insurance" | "electricity"
    | "fuel" | "waterAndSewer" | "repairsAndMaintenance" | "payrollAndBenefits" | "generalAndAdministrative" 
    | "legalAndProfessionalFees" | "miscellaneous" | "management" | "reserves" | "total"

    export type ForecastItem = { 
        name: BoweryReports.ForecastItemBasis, 
        basis?: BoweryReports.UnitSF, 
        forecast?: number | undefined, 
        projection?: number 
    }

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