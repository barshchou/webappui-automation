const _alias = (aliasName:string) => `${aliasName}_${Cypress._.random(0, 1e6)}`;
/**
 * Util function. Do not use in tests.
 * @param operationName 
 * @returns 
 */
export const _gqlAlias = (operationName:string) => `gql${operationName}Query`;

export const Alias = {
    searchUnits: _alias("searchUnits"),
    reportId: _alias("reportId"),
    salesEventId: _alias("salesEventId"),
    salesComps_eventIds: _alias("salesComps_eventIds"),
    aliasXMLGeneration: _alias("aliasXMLGeneration"),
    aliasOpenXML: _alias("aliasOpenXML"),
    gql:{
        SearchSalesTransactions:_gqlAlias("searchSalesTransactions"),
        FindTransactionByIdAndVersion:_gqlAlias("findTransactionByIdAndVersion"),
        FindSalesComps:_gqlAlias("findSalesComps"),
        FindSingleSalesComp:_gqlAlias("findSingleSalesComp"),
        UpdateJob:_gqlAlias("updateJob"),
        FindSalesCompsByEventIds:_gqlAlias("findSalesCompsByEventIds")
    }, 
    pageElements:{
        comp_plex:{
            conditionDropdown:"comp_plex_conditionDropdown",
            getDropdownOption:"comp_plex_getDropdownOption",
            errorMessage:"comp_plex_errorMessage",
            newCompContinueButton:"newCompContinueButton",
            createCompNumberCommercialUnits:"createCompNumberCommercialUnits",
            comparableTypeDropdown:"comparableTypeDropdown",
            createCompNumberResidentialUnits:"createCompNumberResidentialUnits",
            commercialAreaNewComp:"commercialAreaNewComp",
            netRentableAreaNewComp:"netRentableAreaNewComp",
            averageUnitSizeNewComp:"averageUnitSizeNewComp",
            internalNotesTextArea:"internalNotesTextArea",
            appraiserCommentaryTextArea:"appraiserCommentaryTextArea"
        }
    }
};