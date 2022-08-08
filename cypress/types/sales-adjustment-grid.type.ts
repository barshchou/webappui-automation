import * as KeyInfo from '../enums/enumKeys.enum';
import Enums from "../enums/enums";


/* eslint-disable @typescript-eslint/no-namespace */
export namespace SalesAdjustmentGrid {
    export type AdjustmentName = typeof Enums.SALES_ADJUSTMENT_GRID[KeyInfo.SalesAdjustmentGridKeys]
    export type RowsMarketAdjustment = typeof Enums.ROWS_MARKET_ADJUSTMENT[KeyInfo.RowsMarketAdjustmentKeys]
    export type CumulativePrice = 
        typeof Enums.SALES_ADJUSTMENT_GRID_CUMULATIVE_PRICE[KeyInfo.SalesAdjustmentGridCumulativePrice]
    export type CalculationUnits = typeof Enums.CALCULATION_UNITS[KeyInfo.CalculationUnitsKeys]
    export type SalesAdjustmentGridDiscussions = 
        typeof Enums.SALES_ADJUSTMENT_GRID_DISCUSSIONS[KeyInfo.SalesAdjustmentGridDiscussionsKeys]
    export type SalesAdjustmentGridRows = 
        typeof Enums.SALES_ADJUSTMENT_GRID_ROWS[KeyInfo.SalesAdjustmentGridRowsKeys]
} 