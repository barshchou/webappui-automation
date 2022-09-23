import { Filter } from "mongodb";
import rowsMarketadjustmentEnum from "../../../../enums/adjustComps/marketadjustment.enum";
import salesadjustmentgridEnum from "../../../../enums/adjustComps/salesadjustment.enum";
import Enums from "../../../../enums/enums";
import { BoweryReports } from "../../../../types/boweryReports.type";
import ReportDataCreator from "../../../data_creator/reportData.creator";

const _reportCreationData = ReportDataCreator.getReportData("5312", {
    incomeValue: Enums.INCOME_TYPE.both
});

const _numberOfSalesComps = [ 0, 1 ];

const _adjustmentName: BoweryReports.SalesAdjustmentGrid.AdjustmentName = salesadjustmentgridEnum.marketAdjustment;
const _rowName: BoweryReports.SalesAdjustmentGrid.RowsMarketAdjustment = rowsMarketadjustmentEnum.propertyDescription;

const compProperty = Enums.COMP_PROPERTIES_PATHS_DB.compPropertyPathsInDB.saleStatus;
const compStatusDate = Enums.COMP_PROPERTIES_PATHS_DB.saleStatusValuesInDB.date;

const filter: Filter<object> = { $or: [ { [compProperty]:compStatusDate } ] };

export default {
    reportCreationData: _reportCreationData,
    numberOfSalesComps:_numberOfSalesComps,
    adjustmentName: _adjustmentName,
    rowName: _rowName,
    filter
};