const _alias = (aliasName:string) => `${aliasName}_${Cypress._.random(0, 1e6)}`;
/**
 * Util function. Do not use in tests.
 * @param operationName 
 * @returns 
 */
export const _gqlAlias = (operationName:string) => `gql${operationName}Query`;

export const Alias = {
    reportId: _alias("reportId"),
    salesEventId: _alias("salesEventId"),
    salesComps_eventIds: _alias("salesComps_eventIds"),
    gql:{
        FindSalesComps:_gqlAlias("findSalesComps"),
        FindSingleSalesComp:_gqlAlias("findSingleSalesComp"),
        UpdateAppraisal:_gqlAlias("updateAppraisal"),
        FindSalesCompsByEventIds:_gqlAlias("findSalesCompsByEventIds")
    }
    
};