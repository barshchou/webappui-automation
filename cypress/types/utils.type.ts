/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Enums from "../enums/enums";
import * as KeyInfo from '../enums/enumKeys.enum';

export namespace Utils {
    type _GraphQLRequest = {
        operationName: string,
        query: string,
        variables: object | any
    }

    export type FeatureFlagKeysType = typeof Enums.FEATURE_FLAG_KEYS[KeyInfo.FeatureFlagKeys]

    export type EnvLaunchDarklyType = keyof typeof Enums.ENV_LAUNCH_DARKLY
    
    export type GraphQLRequest = Partial<_GraphQLRequest>;

    export type ReportFile = {
        name: string
        path: string
        extension: "docx" | "html",
        fullPath?: string
    }
}