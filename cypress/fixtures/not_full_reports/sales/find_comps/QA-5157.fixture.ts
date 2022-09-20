import ReportDataCreator from "../../../data_creator/reportData.creator";
import Enums from "../../../../enums/enums";
import { BoweryAutomation } from "../../../../types/boweryAutomation.type";

const reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("5157", {
    incomeValue: Enums.INCOME_TYPE.both,
    conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE
});

const sortSalesCompsDateSold = Enums.SORT_VALUES.dateSold;

export default {
    reportCreationData,
    sortSalesCompsDateSold
};