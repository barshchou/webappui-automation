const _alias = (aliasName:string) => `${aliasName}_${Cypress._.random(0, 1e6)}`;

export const Alias = {
    reportId: _alias("reportId"),
    gqlRequest:_alias("gqlRequest"),
    salesEventId: _alias("salesEventId"),
    salesComps_eventIds: _alias("salesComps_eventIds")
};