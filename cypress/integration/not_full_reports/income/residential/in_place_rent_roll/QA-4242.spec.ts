import testData from "../../../../../fixtures/not_full_reports/income/residential/in_place_rent_roll/QA-4242.fixture";
import { createReport } from "../../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../../actions/base";
import { Income, DataCollections } from "../../../../../actions";

describe("In-Place Rent Roll table tests", 
    { tags:[ "@income", "@residential", "@in_place_rent_roll" ] }, () => {
        
        beforeEach("Login, create report", () => {
            createReport(testData.reportCreationData);
        });

        it("[QA-4242]", () => {
            cy.stepInfo(`Preconditions: Navigate to Income -> Summary and specify amount of units`);
            _NavigationSection.navigateToSubjectPropertyData();
            DataCollections._SubjectPropertyData.enterNumberOfResUnits(testData.residentialUnits.length);

            cy.stepInfo(`1. Navigate to Residential -> Verify Rent/Room column appears and auto calculated 
            after clicking 'Include Per Room Analysis in Report' checkbox`);
            _NavigationSection.navigateToResInPlaceRentRoll();
            Income._Residential.InPlaceRentRoll.checkCheckboxByLabel(testData.perRoomAnalysis)
                .verifyColumnExist(testData.columnName);
            testData.residentialUnits.forEach((unit, index) => {
                Income._Residential.InPlaceRentRoll.verifyRentRoomCellValues(0, unit.rooms, index);
            });
        
            cy.stepInfo(`2. Fill residential units and verify Rent room cells values 
            per formula = [Monthly Rent] / [Rooms]`);
            testData.residentialUnits.forEach((unit, index) => {
                Income._Residential.InPlaceRentRoll.enterRoomsNumberByRowNumber(unit.rooms, index)
                    .enterMonthlyRentByRowNumber(unit.monthlyRent, index)
                    .enterLeaseStatusByRowNumber(unit.leaseStatus, index)
                    .verifyRentRoomCellValues(unit.monthlyRent, unit.rooms, index);
            });
        });
    });