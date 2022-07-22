const _alias = (aliasName: string) => `${aliasName}_${Cypress._.random(0, 1e6)}`;
/**
 * Util function. Do not use in tests.
 * @param operationName 
 * @returns 
 */
export const _gqlAlias = (operationName: string) => `gql${operationName}Query`;

export const gqlOperationNames = {
    findSalesComps: "findSalesComps",
    searchSalesTransactions: "searchSalesTransactions",
    findTransactionByIdAndVersion: "findTransactionByIdAndVersion",
    findSingleSalesComp: "findSingleSalesComp",
    updateJob: "updateJob",
    findTransactionsByIdsAndVersions: "findTransactionsByIdsAndVersions"
  };

export const Alias = {
    loginRequest:_alias("loginRequest"),
    reportId: _alias("reportId"),
    salesEventId: _alias("salesEventId"),
    salesComps_eventIds: _alias("salesComps_eventIds"),
    salesComps:{
        addressSelectedComps: "ui_SelectedComps_Addresses"
    },
    aliasXMLGeneration: _alias("aliasXMLGeneration"),
    aliasOpenXML: _alias("aliasOpenXML"),
    gql:{
        SearchSalesTransactions:_gqlAlias(gqlOperationNames.searchSalesTransactions),
        FindTransactionByIdAndVersion:_gqlAlias("findTransactionByIdAndVersion"),
        FindSalesComps:_gqlAlias(gqlOperationNames.findSalesComps),
        FindSingleSalesComp:_gqlAlias(gqlOperationNames.findSingleSalesComp),
        UpdateJob:_gqlAlias(gqlOperationNames.updateJob),
        FindTransactionsByIdsAndVersions:_gqlAlias(gqlOperationNames.findTransactionsByIdsAndVersions)
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
    },
    expenceForecastAliases: {
        sumPerSFCustomCards: "sumPerSFCustomCards",
        sumPerSFCheckedDefaultCards: "sumPerSFCheckedDefaultCards",
        sumPerSF: "sumPerSF",
        sumPerUnitCustomCards: "sumPerUnitCustomCards",
        sumPerUnitCheckedDefaultCards: "sumPerUnitCheckedDefaultCards",
        sumPerUnit: "sumPerUnit",
        expenseCard: "expenseCard",
        basisValue: "basisValue",
        sumPerSFInComment: "sumPerSFInComment",
        sumPerUnitInComment: "sumPerUnitInComment",
        sumPerUnitTOEAppraisersForecast: "sumPerUnitTOEAppraisersForecast",
        sumPSFTOEAppraisersForecast: "sumPSFTOEAppraisersForecast",
    },
};