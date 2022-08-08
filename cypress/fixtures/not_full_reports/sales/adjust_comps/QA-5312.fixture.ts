import rowsMarketadjustmentEnum from "../../../../enums/adjustComps/marketadjustment.enum";
import adjustCompsEnum from "../../../../enums/adjustComps";
import Enums from "../../../../enums/enums";
import ReportDataCreator from "../../../data_creator/reportData.creator";
import { SalesAdjustmentGrid } from "../../../../types/sales-adjustment-grid.type";

const { marketAdjustment } = adjustCompsEnum.SALES_ADJUSTMENT_GRID;

const _reportCreationData = ReportDataCreator.getReportData("5312", {
    incomeValue: Enums.INCOME_TYPE.both
});

const _numberOfSalesComps = [ 0, 1 ];

const _adjustmentName: SalesAdjustmentGrid.AdjustmentName = marketAdjustment;
const _rowName: SalesAdjustmentGrid.RowsMarketAdjustment = rowsMarketadjustmentEnum.propertyDescription;

export default {
    reportCreationData: _reportCreationData,
    numberOfSalesComps:_numberOfSalesComps,
    adjustmentName: _adjustmentName,
    rowName: _rowName
};