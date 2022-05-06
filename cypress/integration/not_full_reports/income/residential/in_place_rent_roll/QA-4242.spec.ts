import testData from "../../../../../fixtures/not_full_reports/income/residential/in_place_rent_roll/QA-4242.fixture";
import {createReport, deleteReport} from "../../../../../actions/base/baseTest.actions";
import { _NavigationSection} from "../../../../../actions/base";
import { Income, Property } from "../../../../../actions";

describe("In-Place Rent Roll table tests", () => {
    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("[QA-4242]", () => {
        cy.stepInfo('Preconditions: Navigate to Income -> Summary and specify amount of units');
        _NavigationSection.navigateToPropertySummary();
        Property._Summary.enterNumberOfResUnits(testData.residentialUnits.length);

        cy.stepInfo("1. Navigate to Residential -> Verify Rent/Room column appears and auto calcualted after clicking "+ 
        + "'Include Per Room Analysis in Report' checkbox");
        _NavigationSection.navigateToResInPlaceRentRoll();
        Income._Residential.InPlaceRentRoll.checkCheckboxByLabel(testData.perRoomAnalysis)
            .verifyColumnExist(testData.columnName);
        
        for(let row = 0; row < testData.residentialUnits.length; row++){
            Income._Residential.InPlaceRentRoll.verifyRentRoomCellValues();
        }
        
        cy.stepInfo('2. Fill residential units and verify Rent room cells values per formula = [Monthly Rent] / [Rooms]');
        for(let row = 0; row < testData.residentialUnits.length; row++){
            Income._Residential.InPlaceRentRoll.enterRoomsNumberByRowNumber(testData.residentialUnits[row].rooms, row)
                .enterMonthlyRentByRowNumber(testData.residentialUnits[row].monthlyRent, row)
                .enterLeaseStatusByRowNumber(testData.residentialUnits[row].leaseStatus, row)
                .verifyRentRoomCellValues(testData.residentialUnits[row].monthlyRent, testData.residentialUnits[row].rooms, row);
        }

        deleteReport(testData.reportCreationData.reportNumber);
    });
});