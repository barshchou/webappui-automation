import testData from "../../../../../fixtures/not_full_reports/income/residential/in_place_rent_roll/optionsList.fixtures";
import Homepage from "../../../../../actions/base/homepage.actions";
import NavigationSection from "../../../../../actions/base/navigationSection.actions";
import Income from "../../../../../actions/income/income.manager";
import Property from "../../../../../actions/property/property.manager";
import {waitForTime} from "../../../../../../utils/waiters.utils";

describe("In-Place Rent Roll options list tests", () => {
    before("Create report and open In-Pace Rent Roll", () => {
        cy.login();
        waitForTime();
        Homepage.createReport(testData.reportCreationData);
        NavigationSection.navigateToResInPlaceRentRoll();
        cy.saveLocalStorage();
    });

    beforeEach(() => {
        cy.restoreLocalStorage();
    });

    it("ID1: Form: Import Rent Roll via CSV", () => {
        Income.Residential.InPlaceRentRoll.verifyViaCSVExist();
    });

    it("ID2: Text: 'Skip manual rent roll entry. Upload a CSV file.'", () => {
        Income.Residential.InPlaceRentRoll.verifyUploadCSVRow(testData.csvLinks);
    });

    it("ID3: Import manager ('Import Data' button is displayed when .csv file is selected)", () => {
        Income.Residential.InPlaceRentRoll.verifyNumberOfResidentialUnits(testData.id3.numberOfUnits)
            .uploadFile(testData.id3.csvFileName, testData.id3.csvNumberOfUnits);
        cy.reload();
        Income.Residential.InPlaceRentRoll.uploadFile(testData.id3.xlsxFileName, testData.id3.numberOfUnits)
            .goToPropSummaryWithSaveLeavingFirst();
        Property.Summary.verifyThatPageIsOpened()
            .enterNumberOfResUnits(testData.id3.numberOfUnitsToChange)
            .goBackWithSave();
        Income.Residential.InPlaceRentRoll.uploadFile(testData.id3.csvFileName, testData.id3.csvNumberOfUnits);
        cy.reload();
        Income.Residential.InPlaceRentRoll.fillAllRentTypeCellsWithEqualValue(testData.id3.rentType)
            .goToPropSummaryWithSaveLeavingFirst();
        Property.Summary.verifyThatPageIsOpened()
            .enterNumberOfResUnits(testData.id3.numberOfUnits)
            .goBackWithSave();
    });

    it("ID4 and ID5: number of residential units and go to property summary", () => {
        Income.Residential.InPlaceRentRoll.verifyNumberOfResidentialUnits(testData.id3.numberOfUnits)
            .goToPropSummaryWithSaveLeavingFirst();
        Property.Summary.verifyThatPageIsOpened()
            .goBackWithSave();
    });

    it("ID6: Static text: Rent Roll Options", () => {
        Income.Residential.InPlaceRentRoll.verifyThatRentRollOptionsExist();
    });

    it("ID7: Developer's Forecast checkbox", () => {
        Income.Residential.InPlaceRentRoll.checkUncheckCheckboxForColumn(testData.id7.column, testData.id7.forecastLabel);
    });

    it("ID8: Summarize current rent roll checkbox", () => {
        Income.Residential.InPlaceRentRoll.checkCheckboxByLabel(testData.id8.summarizeLabel)
           .uncheckCheckboxByLabel(testData.id8.summarizeLabel);
    });

    it("ID9: Do you know per unit square footage? radio button", () => {
        Income.Residential.InPlaceRentRoll.checkUncheckPerUnitSquareFootage(testData.id9.columns);
    });

    it("ID10: Text: Optional Columns", () => {
        Income.Residential.InPlaceRentRoll.isOptionalColumnExist();
    });

    it("ID11: Bathrooms checkbox", () => {
        Income.Residential.InPlaceRentRoll.checkUncheckCheckboxForColumn(testData.id11.column, testData.id11.label);
    });

    it("ID12: Outdoor Space checkbox", () => {
        Income.Residential.InPlaceRentRoll.checkUncheckCheckboxForColumn(testData.id12.labelAndColumn, testData.id12.labelAndColumn);
    });

    it("ID13: Unit Type checkbox", () => {
        Income.Residential.InPlaceRentRoll.checkUncheckCheckboxForColumn(testData.id13.labelAndColumn, testData.id13.labelAndColumn);
    });

    after("Delete report", () => {
        cy.restoreLocalStorage();
        Income.Residential.InPlaceRentRoll.returnToHomePage();
        Homepage.deleteReport(testData.reportCreationData.reportNumber);
    });
});
