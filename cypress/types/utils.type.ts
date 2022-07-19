/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-namespace */
/**
 * ernst:
 * maybe we should separate namespaces for specific domain?
 * for example, we could have specific BoweryReports.ExpenseForecast
 * where we can have ForecastItem type.
 */

export namespace Utils {
    type _GraphQLRequest = {
        operationName: string,
        query: string,
        variables: object | any
    }
    
    export type GraphQLRequest = Partial<_GraphQLRequest>;
}