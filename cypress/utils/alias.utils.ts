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
    findTransactionsByIdsAndVersions: "findTransactionsByIdsAndVersions",
    searchJobs:"searchJobs",
    searchTransactionsByAddresses: "searchTransactionsByAddresses",
};

export const Alias = {
    searchUnits: _alias("searchUnits"),
    loginRequest:_alias("loginRequest"),
    reportId: _alias("reportId"),
    salesEventId: _alias("salesEventId"),
    salesCompsEventIds: _alias("salesCompsEventIds"),
    salesComps:{
        addressSelectedComps: "uiSelectedCompsAddresses"
    },
    aliasXMLGeneration: _alias("aliasXMLGeneration"),
    aliasOpenXML: _alias("aliasOpenXML"),
    gql:{
        SearchSalesTransactions:_gqlAlias(gqlOperationNames.searchSalesTransactions),
        FindTransactionByIdAndVersion:_gqlAlias("findTransactionByIdAndVersion"),
        FindSalesComps:_gqlAlias(gqlOperationNames.findSalesComps),
        FindSingleSalesComp:_gqlAlias(gqlOperationNames.findSingleSalesComp),
        UpdateJob:_gqlAlias(gqlOperationNames.updateJob),
        FindTransactionsByIdsAndVersions:_gqlAlias(gqlOperationNames.findTransactionsByIdsAndVersions),
        SearchJobs:_gqlAlias(gqlOperationNames.searchJobs),
        SearchTransactionsByAddresses: _gqlAlias(gqlOperationNames.searchTransactionsByAddresses)
    }, 
    pageElements:{
        compPlex:{
            conditionDropdown:"conditionDropdown",
            getDropdownOption:"getDropdownOption",
            errorMessage:"errorMessage",
            newCompContinueButton:"newCompContinueButton",
            createCompNumberCommercialUnits:"createCompNumberCommercialUnits",
            comparableTypeDropdown:"comparableTypeDropdown",
            createCompNumberResidentialUnits:"createCompNumberResidentialUnits",
            commercialAreaNewComp:"commercialAreaNewComp",
            netRentableAreaNewComp:"netRentableAreaNewComp",
            averageUnitSizeNewComp:"averageUnitSizeNewComp",
            internalNotesTextArea:"internalNotesTextArea",
            appraiserCommentaryTextArea:"appraiserCommentaryTextArea",
            siteAreaNewComp:"siteAreaNewComp",
            yearBuiltNewComp:"yearBuiltNewComp",
            floorsNewComp:"floorsNewComp",
            gbaNewComp:"gbaNewComp",
        }
    },
    expenseForecastAliases: {
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
    jobSearch:{
        selectedCompData:"jobSearchSelectedCompData",
        jobCardComp:"jobSearchCompCard"
    }
};