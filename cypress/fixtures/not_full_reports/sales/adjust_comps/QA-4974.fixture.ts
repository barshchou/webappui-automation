import Enums from "../../../../enums/enums";
import ReportDataCreator from "../../../data_creator/reportData.creator";

const _verifyColumns = [
    Enums.SALES_ADJUSTMENT_GRID_ROWS.propertyRights,
    Enums.SALES_ADJUSTMENT_GRID_ROWS.financingTerms,
    Enums.SALES_ADJUSTMENT_GRID_ROWS.conditionsOfSale,
    Enums.SALES_ADJUSTMENT_GRID_ROWS.marketConditionsTime,
    Enums.SALES_ADJUSTMENT_GRID_ROWS.betterWorseNeighborhood,
    Enums.SALES_ADJUSTMENT_GRID_ROWS.locationWithinNeighborhood,
    Enums.SALES_ADJUSTMENT_GRID_ROWS.onsiteParking,
    Enums.SALES_ADJUSTMENT_GRID_ROWS.cornerAdjustment,
    Enums.SALES_ADJUSTMENT_GRID_ROWS.finishesAdjustment,
    Enums.SALES_ADJUSTMENT_GRID_ROWS.tenantMix,
    Enums.SALES_ADJUSTMENT_GRID_ROWS.signage,
    Enums.SALES_ADJUSTMENT_GRID_ROWS.floorAreaRatio,
    Enums.SALES_ADJUSTMENT_GRID_ROWS.sizeAdjustment,
    Enums.SALES_ADJUSTMENT_GRID_ROWS.conditionAdjustment
];

const _verifyDiscussionHeaders = [
    Enums.SALES_ADJUSTMENT_GRID_DISCUSSIONS.unitOfComparison,
    Enums.SALES_ADJUSTMENT_GRID_DISCUSSIONS.market,
    Enums.SALES_ADJUSTMENT_GRID_DISCUSSIONS.location,
    Enums.SALES_ADJUSTMENT_GRID_DISCUSSIONS.utility,
    Enums.SALES_ADJUSTMENT_GRID_DISCUSSIONS.other
];

export default {
    reportCreationData: ReportDataCreator.getReportData("4974", { incomeValue: Enums.INCOME_TYPE.commercial }),
    verifyColumns: _verifyColumns,
    verifyDiscussionHeaders: _verifyDiscussionHeaders
};