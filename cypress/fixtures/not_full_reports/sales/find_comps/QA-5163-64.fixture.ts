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

const comparableFixtureManual = {
    address1: "388 Greenwich Street, New York, NY",
    address2: "388 Broome Street, New York, NY",
    address3: "30 Hudson Yards, New York, NY",
    address4: "383 Madison Avenue, New York, NY",
    address5: "345 Park Avenue, New York, NY",
    address6: "225 Liberty Street, New York, NY",
    condition: Enums.CONDITION_VALUES.shell,
    comparableType: Enums.COMPARABLE_TYPES.multifamily,
    units: {
        grossArea: 2700,
        numberOfUnits: 3,
    } as BoweryReports.BuildingDescription,
    siteArea: 3500,
    floors: 7,
    saleInfo: {
        buyer: "Test and CO",
        seller: "Test inc"
    },
    saleStatusListing: Enums.SALE_STATUSES.listing,
    saleStatusUnderContract: Enums.SALE_STATUSES.underContract,
    saleStatusTransaction: Enums.SALE_STATUSES.transaction,
};

const arrayOfCompsForManualAddition = [
    {
        address: comparableFixtureManual.address1,
        status: comparableFixtureManual.saleStatusListing
    },
    {
        address: comparableFixtureManual.address2,
        status: comparableFixtureManual.saleStatusListing
    },
    
    {
        address: comparableFixtureManual.address3,
        status: comparableFixtureManual.saleStatusUnderContract
    },
    {
        address: comparableFixtureManual.address4,
        status: comparableFixtureManual.saleStatusUnderContract
    },
    {
        address: comparableFixtureManual.address5,
        status: comparableFixtureManual.saleStatusTransaction
    },
    {
        address: comparableFixtureManual.address6,
        status: comparableFixtureManual.saleStatusTransaction
    },
     
];

export default {
    comparableFixtureManual,
    reportCreationData,
    sortSalesCompsDateSold,
    salePeriodValue,
    arrayOfCompsForManualAddition,
    radioButtonSaleConditionArms,
    radioButtonSaleConditionNonArms
};