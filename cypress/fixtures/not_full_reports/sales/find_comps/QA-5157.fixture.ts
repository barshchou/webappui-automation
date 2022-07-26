import ReportDataCreator from "../../../data_creator/reportData.creator";
import Enums from "../../../../enums/enums";
import { BoweryReports } from "../../../../types/boweryReports.type";
import { BoweryAutomation } from "../../../../types/boweryAutomation.type";
import { Sales } from '../../../../actions';

const reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("5769-70", {
    incomeValue: Enums.INCOME_TYPE.both,
    conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE
});

const filePath = "not_full_reports/CostarExport 5161.csv";
const sortSalesCompsValue = 'Date Sold';

const comparableFixture1 = {
    address: "116 Cooper Street"
    // address: '173 Smith Street'
};

const comparableFixture2 = {
    address: "866 United Nations Plaza"
};

const comparableFixture3 = {
    address: "382 Second St."
};

const comparableFixture4 = {
    address: "1715 Lexington Avenue"
};


const comparableFixtureManual = {
    address1: "388 Greenwich Street, New York, NY, USA",
    address2: "388 Broome Street, New York, NY, USA",
    address3: "30 Hudson Yards, New York, NY, USA",
    address4: "383 Madison Avenue, New York, NY, USA",
    address5: "345 Park Avenue, New York, NY, USA",
    address6: "225 Liberty Street, New York, NY, USA",
    condition: "Shell",
    comparableType: "Multifamily",
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
    saleStatusListing: 'Listing', //as?,
    saleStatusUnderContract: 'Under Contract',
    saleStatusTransaction: 'Transaction',
};


function addCompWithStatus(address: string, saleStatus: string) {
    Sales._FindComps
        .openAddNewComparableFormSearchResult(address, -1)
        .selectDropdownOptionNewComp(Sales._FindComps.Page.conditionDropdown, comparableFixtureManual.condition)
        .selectDropdownOptionNewComp(Sales._FindComps.Page.comparableTypeDropdown, comparableFixtureManual.comparableType);
    Sales._FindComps
        .PropertyInfo.setResidentialUnits(`${comparableFixtureManual.units.numberOfUnits}`)
        .setSiteArea(`${comparableFixtureManual.siteArea}`)
        .setFloor(`${comparableFixtureManual.floors}`);
    Sales._FindComps.Page.newCompContinueButton.click();
    Sales._FindComps
        .SaleInfo.setBuyerGrantee(comparableFixtureManual.saleInfo.buyer)
        .setSellerGarantor(comparableFixtureManual.saleInfo.seller)
        .selectSaleDate('random');
    Sales._FindComps.Actions
        .selectDropdownOptionNewComp(Sales._FindComps.Page.SaleStatusDropdown, saleStatus);
    Sales._FindComps.Actions.Page.newCompContinueButton.click();
    Sales._FindComps.Actions.Page.saveAndCloseButton.click();
    return this;
}



export default {
    comparableFixture1,
    comparableFixture2,
    comparableFixture3,
    comparableFixture4,
    addCompWithStatus,
    comparableFixtureManual,
    reportCreationData,
    sortSalesCompsValue,
    filePath
};