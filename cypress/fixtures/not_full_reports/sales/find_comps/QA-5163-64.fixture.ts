import ReportDataCreator from "../../../data_creator/reportData.creator";
import Enums from "../../../../enums/enums";
import { BoweryReports } from "../../../../types/boweryReports.type";
import { BoweryAutomation } from "../../../../types/boweryAutomation.type";

const reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("5163-64", {
    incomeValue: Enums.INCOME_TYPE.both,
    conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE
});

const sortSalesCompsDateSold = Enums.SORT_VALUES.dateSold;
const salePeriodValue = Enums.SALE_PERIOD_VALUES.lastThreeMonths;
const radioButtonSaleConditionArms = Enums.SALE_CONDITION.armsLength;
const radioButtonSaleConditionNonArms = Enums.SALE_CONDITION.nonArmsLength;
const filePath = "not_full_reports/CostarExport_3Contract_3Listing_3Date.csv";

const comparableFixture = {
    address1: "Sanford Avenue, Queens",
    address2: "121 East 69 Street",
    address3: "176 Waverly Place",
    address4: "303 Park Ave.",
    address5: "116 Cooper Street",
    address6: "1074 Fulton Street",
    address7: "264 Jefferson Street",
    address8: "20 Bordi Ln.",
    address9: "108 East 30 Street",
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
    reportCreationData,
    sortSalesCompsDateSold,
    salePeriodValue,
    radioButtonSaleConditionArms,
    radioButtonSaleConditionNonArms,
    filePath
};