import ReportDataCreator from "../../../data_creator/reportData.creator";
import Enums from "../../../../enums/enums";
import { BoweryReports } from "../../../../types/boweryReports.type";
import { BoweryAutomation } from "../../../../types/boweryAutomation.type";

const reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("5157_61", {
    incomeValue: Enums.INCOME_TYPE.both,
    conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE
});

const filePath = "test_files/CostarExport 5161.csv";
const sortSalesCompsDateSold = Enums.SORT_VALUES.dateSold;
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
];
const arrayOfCompsForAdditionFromMap2 = [
    {
        address: "168 North 10 Street"
    },
    {
        address: "151 Freeman Street"
    }
];

const comparableFixtureManual = {
    address1: "388 Greenwich Street, New York, NY, USA",
    address2: "388 Broome Street, New York, NY, USA",
    address3: "30 Hudson Yards, New York, NY, USA",
    address4: "383 Madison Avenue, New York, NY, USA",
    address5: "345 Park Avenue, New York, NY, USA",
    address6: "225 Liberty Street, New York, NY, USA",
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
    arrayOfCompsForAdditionFromMap1,
    arrayOfCompsForAdditionFromMap2,
    comparableFixtureManual,
    reportCreationData,
    sortSalesCompsDateSold,
    salePeriodValue,
    filePath,
    arrayOfCompsForManualAddition
};