/* eslint-disable @typescript-eslint/no-namespace */
import * as KeyInfo from './../enums/enumKeys.enum.d';
import enums from "../enums/enums";

const { _jobSearch, _propertyInfoEnum, _saleInfoEnum, _addressSearch } = enums.COMPPLEX_ENUM;

// Keys lies here due to QA-6470. It is not done yet.
namespace Keys {
    export type BuildingType = keyof typeof _propertyInfoEnum.buildingType
    export type SaleStatus = keyof typeof _saleInfoEnum
    export type SaleCondition = keyof typeof enums.SALE_CONDITION
}

export namespace CompPlex {
    export namespace PropertyInfo {
        export type BuildingType = typeof _propertyInfoEnum.buildingType[Keys.BuildingType] 
    }
    export namespace SaleInfo {
        export type SaleStatus = typeof enums.COMPPLEX_ENUM
            ._saleInfoEnum[Keys.SaleStatus]  
        export type SaleCondition = typeof enums.SALE_CONDITION[Keys.SaleCondition]
    }

    export namespace JobSearch {
        type _NumberFiltersMinMax = {
            [key in NumberFilters]: JobSearch.FilterMinMax;
        };
        type _JobFilter = {   
            salePeriod: JobSearch.SalePeriod, 
            propertyType: JobSearch.PropertyType,
            isShowOnlyOnAppJobs: true
        } & _NumberFiltersMinMax

        export type JobFilter = Partial<_JobFilter>
        export type JobFilterKeys = keyof JobFilter
        export type FilterMinMax = Partial<{ 
            [keys in keyof typeof _jobSearch.minMaxInputs]: number;
        }>
        export type SalePeriod = keyof typeof _jobSearch.salePeriod 
        export type PropertyType = keyof typeof _jobSearch.propertyType
        export type NumberFilters = keyof typeof _jobSearch.numberFilters
    }

    export namespace AddressSearch {
        export type CompPropertyInDB = typeof _addressSearch.
            compPropertyPathsInDB[KeyInfo.CompPropertiesPathsInDatabase]
        export type CompSaleStatusInDB =  typeof _addressSearch.saleStatusValuesInDB
        export type CompSaleConditionInDB = typeof _addressSearch.saleConditionValuesInDB
    }
}