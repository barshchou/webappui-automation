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
const filePath = "test_files/CostarExport_3Contract_3Listing_3Date.csv";

const comparableFixture1 = {
    address: "Sanford Avenue, Queens"
};
const comparableFixture2 = {
    address: "121 East 69 Street"
};
const comparableFixture3 = {
    address: "176 Waverly"
};
const comparableFixture4 = {
    address: "303 Park Ave."
};
const comparableFixture5 = {
    address: "116 Cooper Street"
};
const comparableFixture6 = {
    address: "1074 Fulton"
};
const comparableFixture7 = {
    address: "20 Bordi Ln."
};
const comparableFixture8 = {
    address: "264 Jefferson Street"
};
const comparableFixture9 = {
    address: "108 E 30th"
};

const arrayOfAllComps = [
    comparableFixture1,
    comparableFixture2,
    comparableFixture3,
    comparableFixture4,
    comparableFixture5,
    comparableFixture6,
    comparableFixture7,
    comparableFixture8,
    comparableFixture9,
];

const arrayOfCompsForRemovingFromMap = [
    comparableFixture3,
    comparableFixture6,
    comparableFixture9
];

export default {
    arrayOfAllComps,
    arrayOfCompsForRemovingFromMap,
    reportCreationData,
    sortSalesCompsCustom,
    sortSalesCompsDateSold,
    salePeriodValue,
    filePath
};