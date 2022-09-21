import ReportDataCreator from "../../../data_creator/reportData.creator";
import Enums from "../../../../enums/enums";
import { BoweryAutomation } from "../../../../types/boweryAutomation.type";

const reportCreationData5163: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("5163", {
    incomeValue: Enums.INCOME_TYPE.both,
    conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE
});

const reportCreationData5164: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("5164", {
    incomeValue: Enums.INCOME_TYPE.both,
    conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE
});

const sortSalesCompsDateSold = Enums.SORT_VALUES.dateSold;
const salePeriodValue = Enums.SALE_PERIOD_VALUES.lastThreeMonths;
const radioButtonSaleConditionArms = Enums.SALE_CONDITION.armsLength;
const radioButtonSaleConditionNonArms = Enums.SALE_CONDITION.nonArmsLength;
const filePath = "test_files/CostarExport_3Contract_3Listing_3Date.csv";
const filePath2Comps = "test_files/CostarExport_3Comps.csv";

const comparableFixture = {
    address1: "Sanford Ave",
    address2: "121 East 69 Street",
    address3: "176 Waverly Place",
    address4: "303 Park Ave.",
    address5: "116 Cooper Street",
    address6: "1074 Fulton Street",
    address7: "264 Jefferson St.",
    address8: "20 Bordi Ln.",
    address9: "108 E 30th",
    saleInfo: {
        buyer: "Test and CO",
        seller: "Test inc"
    },
    saleStatusListing: Enums.SALE_STATUSES.listing,
    saleStatusUnderContract: Enums.SALE_STATUSES.underContract,
    saleStatusTransaction: Enums.SALE_STATUSES.transaction,
};

export default {
    comparableFixture,
    reportCreationData5163,
    reportCreationData5164,
    sortSalesCompsDateSold,
    salePeriodValue,
    radioButtonSaleConditionArms,
    radioButtonSaleConditionNonArms,
    filePath,
    filePath2Comps
};