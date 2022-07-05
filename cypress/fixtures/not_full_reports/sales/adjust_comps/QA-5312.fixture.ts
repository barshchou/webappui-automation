import Enums from "../../../../enums/enums";
import { BoweryReports } from "../../../../types/boweryReports.type";
import ReportDataCreator from "../../../data_creator/reportData.creator";

const _reportCreationData = ReportDataCreator.getReportData("5312", {
    incomeValue: Enums.INCOME_TYPE.both
});

const _numberOfSalesComps = [ 0, 1, 2 ];

const adjustmentName: BoweryReports.SalesAdjustmentGrid.AdjustmentName = "market-adjustment";
const rowName: BoweryReports.SalesAdjustmentGrid.RowsMarketAdjustment = "Property Description";

export default {
    reportCreationData: _reportCreationData,
    numberOfSalesComps:_numberOfSalesComps,
    adjustmentName,
    rowName
};