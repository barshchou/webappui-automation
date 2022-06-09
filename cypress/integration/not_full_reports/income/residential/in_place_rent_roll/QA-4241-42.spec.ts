import testData from "../../../../../fixtures/not_full_reports/income/residential/in_place_rent_roll/QA-4241-42.fixture";
import { createReport, deleteReport } from "../../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../../actions/base";
import { Income, Property } from "../../../../../actions";

describe("In-Place Rent Roll table tests", 
    { tags:[ "@income", "@residential", "@in_place_rent_roll" ] }, () => {
        
    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("[QA-4241-42]", () => {
        cy.stepInfo('Preconditions: Navigate to Income -> Summary and specify amount of units');
        _NavigationSection.navigateToPropertySummary();
        Property._Summary.enterNumberOfResUnits(testData.residentialUnits.length);

        cy.stepInfo("1. Navigate to Residential -> Verify Rent/Room column appears and auto calcualted after clicking "+ 
        + "'Include Per Room Analysis in Report' checkbox");
        _NavigationSection.navigateToResInPlaceRentRoll();
        Income._Residential.InPlaceRentRoll.checkCheckboxByLabel(testData.perRoomAnalysis)
            .verifyColumnExist(testData.columnName);
        testData.residentialUnits.forEach((unit, index) => {
            Income._Residential.InPlaceRentRoll.verifyRentRoomCellValues(0, unit.rooms, index);
        });
        
        cy.stepInfo("2. Fill residential units and verify Rent room cells values per formula = [Monthly Rent] / [Rooms]");
        testData.residentialUnits.forEach((unit, index) => {
            Income._Residential.InPlaceRentRoll.enterRoomsNumberByRowNumber(unit.rooms, index)
                .enterMonthlyRentByRowNumber(unit.monthlyRent, index)
                .enterLeaseStatusByRowNumber(unit.leaseStatus, index)
                .verifyRentRoomCellValues(unit.monthlyRent, unit.rooms, index);
        });

        cy.stepInfo("3. Copy / Paste value into the Mounthly Rent ($) cell");
        Income._Residential.InPlaceRentRoll.copyPasteValue(Income._Residential.InPlaceRentRoll.Page.monthlyRentCells, testData.residentialUnits[0].monthlyRent);

        deleteReport(testData.reportCreationData.reportNumber);
    });
});