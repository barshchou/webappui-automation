import ReportDataCreator from "../../../data_creator/reportData.creator";
import Enums from "../../../../enums/enums";
import { BoweryReports } from "../../../../types/boweryReports.type";
import { BoweryAutomation } from "../../../../types/boweryAutomation.type";

const reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("5157_61", {
    incomeValue: Enums.INCOME_TYPE.both,
    conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE
});

const filePath = "not_full_reports/CostarExport_3Contract_3Listing_3Date.csv";
const sortSalesCompsDateSold = Enums.SORT_VALUES.dateSold;
const salePeriodValue = Enums.SALE_PERIOD_VALUES.lastThreeMonths;
const compProperty = Enums.COMP_PROPERTIES_PATHS_DB.compPropertyPathsInDB.saleStatus;
const compStatusContract = Enums.COMP_PROPERTIES_PATHS_DB.saleStatusValuesInDB.inContract;
const compStatusDate = Enums.COMP_PROPERTIES_PATHS_DB.saleStatusValuesInDB.date;
const compStatusListing = Enums.COMP_PROPERTIES_PATHS_DB.saleStatusValuesInDB.listing;

const comparableFixtureManual = {
    address1: "388 Greenwich Street, New York, NY",
    address2: "388 Broome Street, New York, NY",
    address3: "33 Area Place, Staten Island, NY",
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
    filePath,
    arrayOfCompsForManualAddition,
    compProperty,
    compStatusContract,
    compStatusDate,
    compStatusListing
};