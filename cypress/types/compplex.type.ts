/* eslint-disable @typescript-eslint/no-namespace */

/**
 * TASK: [QA-6470] Refactor types with keys
 */

import enums from "../enums/enums";

/**
 * ernst: I don't want put all keys into one pile anymore
 * It's just awful to manage them and extend
 * So during QA-6470 I want move keys to their own types modules 
 * and nest their own key there.
 * In that case the we will two layers of module nesting: enum (module 1) -> types and keys (module 2).
 * It will be store in ONE PLACE and you will still be able use `enums` as entry point for all enums in your code
 */
namespace Keys {
    export type BuildingType = keyof typeof enums.COMPPLEX_ENUM._propertyInfoEnum.buildingType
    export type SaleStatus = keyof typeof enums.COMPPLEX_ENUM._saleInfoEnum
}

export namespace CompPlex {
    export namespace PropertyInfo {
        export type BuildingType = typeof enums.COMPPLEX_ENUM
            ._propertyInfoEnum.buildingType[Keys.BuildingType] 
    }
    export namespace SaleInfo {
        export type SaleStatus = typeof enums.COMPPLEX_ENUM
            ._saleInfoEnum[Keys.SaleStatus]  
    }
}