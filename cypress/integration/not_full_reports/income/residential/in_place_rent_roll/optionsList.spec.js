import testData from "../../../../../fixtures/optionsList.fixtures";
import homepageActions from "../../../../../actions/base/homepage.actions";
import navigationSectionActions from "../../../../../actions/base/navigationSection.actions";
import rentRollActions from "../../../../../actions/income/residential/rentRoll.actions";
import summaryActions from "../../../../../actions/property/summary.actions";

describe("In-Place Rent Roll options list tests", () => {
    before("Create report and open In-Pace Rent Roll", () => {
        cy.login();
        homepageActions.createReport(testData.reportCreationData);
        navigationSectionActions.navigateToResInPlaceRentRoll();
        cy.saveLocalStorage();
    });

    beforeEach(() => {
        cy.restoreLocalStorage();
    });

    it("ID1: Form: Import Rent Roll via CSV", () => {
        rentRollActions.verifyViaCSVExist();
    });

    it("ID2: Text: 'Skip manual rent roll entry. Upload a CSV file.'", () => {
        rentRollActions.verifyUploadCSVRow(testData.csvLinks);
    });

    it("ID3: Import manager ('Import Data' button is displayed when .csv file is selected)", () => {
        rentRollActions.verifyNumberOfResidentialUnits(testData.id3.numberOfUnits)
            .uploadFile(testData.id3.csvFileName, testData.id3.csvNumberOfUnits);
        cy.reload();
        rentRollActions.uploadFile(testData.id3.xlsxFileName, testData.id3.numberOfUnits)
            .goToPropSummaryWithSaveLeavingFirst();
        summaryActions.verifyThatPageIsOpened()
            .enterNumberOfUnits(testData.id3.numberOfUnitsToChange)
            .goBackWithSave();
        rentRollActions.uploadFile(testData.id3.csvFileName, testData.id3.csvNumberOfUnits);
        cy.reload();
        rentRollActions.fillAllRentTypeCellsWithEqualValue(testData.id3.rentType)
            .goToPropSummaryWithSaveLeavingFirst();
        summaryActions.verifyThatPageIsOpened()
            .enterNumberOfUnits(testData.id3.numberOfUnits)
            .goBackWithSave();
    });

    it("ID4 and ID5: number of residential units and go to property summary", () => {
        rentRollActions.verifyNumberOfResidentialUnits(testData.id3.numberOfUnits)
            .goToPropSummaryWithSaveLeavingFirst();
        summaryActions.verifyThatPageIsOpened()
            .goBackWithSave();
    });

    it("ID6: Static text: Rent Roll Options", () => {
        rentRollActions.verifyThatRentRollOptionsExist();
    });

    it("ID7: Developer's Forecast checkbox", () => {
        rentRollActions.checkUncheckCheckboxForColumn(testData.id7.column, testData.id7.forecastLabel);
    });

    it("ID8: Summarize current rent roll checkbox", () => {
       rentRollActions.checkCheckboxByLabel(testData.id8.summarizeLabel)
           .uncheckCheckboxByLabel(testData.id8.summarizeLabel);
    });

    it("ID9: Do you know per unit square footage? radio button", () => {
        rentRollActions.checkUncheckPerUnitSquareFootage(testData.id9.columns);
    });

    it("ID10: Text: Optional Columns", () => {
        rentRollActions.isOptionalColumnExist();
    });

    it("ID11: Bathrooms checkbox", () => {
        rentRollActions.checkUncheckCheckboxForColumn(testData.id11.column, testData.id11.label);
    });

    it("ID12: Outdoor Space checkbox", () => {
        rentRollActions.checkUncheckCheckboxForColumn(testData.id12.labelAndColumn, testData.id12.labelAndColumn);
    });

    it("ID13: Unit Type checkbox", () => {
        rentRollActions.checkUncheckCheckboxForColumn(testData.id13.labelAndColumn, testData.id13.labelAndColumn);
    });

    after("Delete report", () => {
        cy.restoreLocalStorage();
        rentRollActions.returnToHomePage();
        homepageActions.deleteReport(testData.reportCreationData.reportNumber);
    });
});
