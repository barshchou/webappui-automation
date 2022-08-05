import ReportDataCreator from "../../../data_creator/reportData.creator";
import Enums from "../../../../enums/enums";
import { BoweryAutomation } from "../../../../types/boweryAutomation.type";

const reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("5162", {
    incomeValue: Enums.INCOME_TYPE.both,
    conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE
});

const sortSalesCompsDateSold = Enums.SORT_VALUES.dateSold;
const sortSalesCompsCustom = Enums.SORT_VALUES.custom;
const salePeriodValue = Enums.SALE_PERIOD_VALUES.lastThreeMonths;

const comparableFixture1 = {
    address: "116 Cooper Street"
};
const comparableFixture2 = {
    address: "1715 Lexington Avenue"
};
const comparableFixture3 = {
    address: "1074 Fulton Street"
};
const comparableFixture4 = {
    address: "31-83 34 Street"
};
const comparableFixture5 = {
    address: "96 East Broadway"
};
const comparableFixture6 = {
    address: "95 East Broadway"
};
const comparableFixture7 = {
    address: "168 North 10 Street"
};
const comparableFixture8 = {
    address: "151 Freeman Street"
};
const comparableFixture9 = {
    address: "125 North 1 Street"
};

const arrayOfCompsForAdditionFromMap1 = [
    comparableFixture1,
    comparableFixture2,
    comparableFixture3,
    comparableFixture4,
    comparableFixture5,
    comparableFixture6,
];
const arrayOfCompsForAdditionFromMap2 = [
    comparableFixture7,
    comparableFixture8,
    comparableFixture9,
];
const arrayOfCompsForRemovingFromMap = [
    comparableFixture5,
    comparableFixture6,
    comparableFixture9
];

export default {
    arrayOfCompsForAdditionFromMap1,
    arrayOfCompsForAdditionFromMap2,
    arrayOfCompsForRemovingFromMap,
    reportCreationData,
    sortSalesCompsCustom,
    sortSalesCompsDateSold,
    salePeriodValue,
};