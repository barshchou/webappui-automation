/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-namespace */
/**
 * ernst:
 * maybe we should separate namespaces for specific domain?
 * for example, we could have specific BoweryReports.ExpenseForecast
 * where we can have ForecastItem type.
 */

import Enums from "../enums/enums";
import * as KeyInfo from '../enums/enumKeys.enum';
import routesUtils from "../utils/routes.utils";
import subjectPropertyDataRouts from "../utils/subject_property_data_routs.utils";

export namespace Utils {
    type _GraphQLRequest = {
        operationName: string,
        query: string,
        variables: object | any
    }

    export type FeatureFlagKeysType = typeof Enums.FEATURE_FLAG_KEYS[KeyInfo.FeatureFlagKeys]

    export type EnvLaunchDarklyType = keyof typeof Enums.ENV_LAUNCH_DARKLY
    
    export type GraphQLRequest = Partial<_GraphQLRequest>;

    type _Routes = keyof typeof routesUtils

    type _SubjectPropertyDataRoutes = keyof typeof subjectPropertyDataRouts

    export type Routes = typeof routesUtils[_Routes] | typeof subjectPropertyDataRouts[_SubjectPropertyDataRoutes]
}