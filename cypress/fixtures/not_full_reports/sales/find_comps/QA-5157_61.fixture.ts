import ReportDataCreator from "../../../data_creator/reportData.creator";
import Enums from "../../../../enums/enums";
import { BoweryReports } from "../../../../types/boweryReports.type";
import { BoweryAutomation } from "../../../../types/boweryAutomation.type";

const reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("5157_61", {
    incomeValue: Enums.INCOME_TYPE.both,
    conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE
});

const filePath = "not_full_reports/CostarExport 5161.csv";
const sortSalesCompsDateSold = 'Date Sold' as BoweryReports.FindComps.SelectedComparablesSortType;
const salePeriodValue = 'Last 3 Months' as BoweryReports.FindComps.SalePeriodValues;

const arrayOfCompsforAdditionFromMap1 = [
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
const arrayOfCompsforAdditionFromMap2 = [
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
    condition: "Shell" as BoweryReports.FindComps.ConditionValueType,
    comparableType: "Multifamily" as BoweryReports.FindComps.ComparableTypes,
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
    saleStatusListing: 'Listing' as BoweryReports.FindComps.SaleStatusType,
    saleStatusUnderContract: 'Under Contract' as BoweryReports.FindComps.SaleStatusType,
    saleStatusTransaction: 'Transaction' as BoweryReports.FindComps.SaleStatusType,
};

const arrayOfCompsforManualAddition = [
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
    arrayOfCompsforAdditionFromMap1,
    arrayOfCompsforAdditionFromMap2,
    comparableFixtureManual,
    reportCreationData,
    sortSalesCompsDateSold,
    salePeriodValue,
    filePath,
    arrayOfCompsforManualAddition
};