namespace BoweryReports {
    export type ConclusionValue = "AS_IS" | "AS_STABILIZED" | "AS_COMPLETE" 
    export type ReportCreationOptions = {
        incomeValue?: string,
        conclusionValue?: BoweryReports.ConclusionValue
    }
    export type LeaseStatus = "Occupied" | "Vacant"
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