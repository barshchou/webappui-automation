import rowsMarketadjustmentEnum from "../../../../enums/adjustComps/marketadjustment.enum";
import salesadjustmentgridEnum from "../../../../enums/adjustComps/salesadjustment.enum";
import Enums from "../../../../enums/enums";
import { BoweryReports } from "../../../../types/boweryReports.type";
import { SalesAdjustmentGrid } from "../../../../types/sales-adjustment-grid.type";
import ReportDataCreator from "../../../data_creator/reportData.creator";

const _reportCreationData = ReportDataCreator.getReportData("5312", {
    incomeValue: Enums.INCOME_TYPE.both
});

const _numberOfSalesComps = [ 0, 1 ];

const _adjustmentName: SalesAdjustmentGrid.AdjustmentName = salesadjustmentgridEnum.marketAdjustment;
const _rowName: SalesAdjustmentGrid.RowsMarketAdjustment = rowsMarketadjustmentEnum.propertyDescription;

export default {
    reportCreationData: _reportCreationData,
    numberOfSalesComps:_numberOfSalesComps,
    adjustmentName: _adjustmentName,
    rowName: _rowName
};