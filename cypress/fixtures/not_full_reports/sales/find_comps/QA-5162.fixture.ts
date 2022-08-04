import ReportDataCreator from "../../../data_creator/reportData.creator";
import Enums from "../../../../enums/enums";
import { BoweryReports } from "../../../../types/boweryReports.type";
import { BoweryAutomation } from "../../../../types/boweryAutomation.type";

const reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("5162", {
    incomeValue: Enums.INCOME_TYPE.both,
    conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE
});

const sortSalesCompsDateSold = Enums.SORT_VALUES.dateSold;
const sortSalesCompsCustom = Enums.SORT_VALUES.custom;
const salePeriodValue = Enums.SALE_PERIOD_VALUES.lastThreeMonths;

const arrayOfCompsForAdditionFromMap1 = [
    {
        address: "116 Cooper Street"
    },
    {
        address: "1715 Lexington Avenue"
    },
    {
        address: "1074 Fulton Street"
    },
    {
        address: "31-83 34 Street"
    },
    {
        address: "96 East Broadway"
    },
    {
        address: "95 East Broadway"
    }
];
const arrayOfCompsForAdditionFromMap2 = [
    {
        address: "168 North 10 Street"
    },
    {
        address: "151 Freeman Street"
    },
    {
        address: "125 North 1 Street"
    }
];


export default {
    arrayOfCompsForAdditionFromMap1,
    arrayOfCompsForAdditionFromMap2,
    reportCreationData,
    sortSalesCompsCustom,
    sortSalesCompsDateSold,
    salePeriodValue,
};