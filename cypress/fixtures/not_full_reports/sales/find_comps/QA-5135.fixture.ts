import ReportDataCreator from "../../../data_creator/reportData.creator";
import Enums from "../../../../enums/enums";
import { BoweryReports } from "../../../../types/boweryReports.type";

const sortSalesCompsDateSold = 'Date Sold' as BoweryReports.SalesComps.SelectedComparablesSortType;
const sortSalesCompsCustom = "Custom" as BoweryReports.SalesComps.SelectedComparablesSortType;

export default {
    reportCreationData: ReportDataCreator.getReportData("5135", {
        incomeValue: Enums.INCOME_TYPE.both,
        conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_IS
    }),
    sortSalesCompsDateSold,
    sortSalesCompsCustom,
    /**
     * Number of sales comps which will be added for test
     */
    compsToAdd: [ 0, 1 ]
};