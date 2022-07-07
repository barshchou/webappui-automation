import rowsMarketadjustmentEnum from "../../../../enums/adjustComps/rows.marketAdjustment.enum";
import salesadjustmentgridEnum from "../../../../enums/adjustComps/salesAdjustmentGrid.enum";
import Enums from "../../../../enums/enums";
import { BoweryReports } from "../../../../types/boweryReports.type";
import ReportDataCreator from "../../../data_creator/reportData.creator";

const _reportCreationData = ReportDataCreator.getReportData("5312", {
    incomeValue: Enums.INCOME_TYPE.both
});

const _numberOfSalesComps = [ 0, 1, 2 ];

const _adjustmentName: BoweryReports.SalesAdjustmentGrid.AdjustmentName = salesadjustmentgridEnum.market_adjustment;
const _rowName: BoweryReports.SalesAdjustmentGrid.RowsMarketAdjustment = rowsMarketadjustmentEnum.property_description;

export default {
    reportCreationData: _reportCreationData,
    numberOfSalesComps:_numberOfSalesComps,
    adjustmentName: _adjustmentName,
    rowName: _rowName
};