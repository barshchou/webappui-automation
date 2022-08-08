import calculationUnitsEnum from "./calculationUnits.enum";
import cumulativepriceSalesadjustEnum from "./cumulativeprice.salesadjust.enum";
import marketadjustmentEnum from "./marketadjustment.enum";
import salesAdjustmentGrid from "./sales-adjustment-grid";


export default {
    ...salesAdjustmentGrid,
    CALCULATION_UNITS: calculationUnitsEnum,
    SALES_ADJUSTMENT_GRID_CUMULATIVE_PRICE: cumulativepriceSalesadjustEnum,
    ROWS_MARKET_ADJUSTMENT: marketadjustmentEnum
};