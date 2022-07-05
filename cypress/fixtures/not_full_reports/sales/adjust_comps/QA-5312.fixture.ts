import Enums from "../../../../enums/enums";
import ReportDataCreator from "../../../data_creator/reportData.creator";

const _reportCreationData = ReportDataCreator.getReportData("5312", {
    incomeValue: Enums.INCOME_TYPE.both
});

const _numberOfSalesComps = [ 0, 1, 2 ];

export default {
    reportCreationData: _reportCreationData,
    numberOfSalesComps:_numberOfSalesComps
};