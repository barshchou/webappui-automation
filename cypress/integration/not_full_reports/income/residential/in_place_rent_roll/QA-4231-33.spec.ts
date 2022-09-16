import testData from 
    "../../../../../fixtures/not_full_reports/income/residential/in_place_rent_roll/QA-4231_33.fixture";
import { createReport } from "../../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../../actions/base";
import { Income, DataCollections } from "../../../../../actions";

describe("In-Place Rent Roll table tests", 
    { tags:[ "@income", "@residential", "@in_place_rent_roll" ] }, () => {
        
        beforeEach("Login, create report", () => {
            createReport(testData.reportCreationData);
        });

        it("[QA-4231-33]", () => {
            cy.stepInfo('Preconditions: Navigate to Income -> Summary and specify amount of units');
            _NavigationSection.navigateToSubjectPropertyData();
            DataCollections._SubjectPropertyData.enterNumberOfResUnits(testData.residentialUnits.length);

            cy.stepInfo(`1. Navigate to Residential and check Per Room Analysis`);
            _NavigationSection.navigateToResInPlaceRentRoll();
            Income._Residential.InPlaceRentRoll.checkCheckboxByLabel(testData.perRoomAnalysis);
        
            cy.stepInfo(`2. Verify the Rooms are pre-filled (=2) if the Rent Type is selected, if not - it's empty`);
            Income._Residential.InPlaceRentRoll.enterRoomsNumberByRowNumber(testData.residentialUnits[0].rooms, 0);
            testData.residentialUnits.slice(1).forEach((_, index) => {
                Income._Residential.InPlaceRentRoll.verifyRoomsNumberByRow(testData.initialValue, index + 1);
            });

            cy.stepInfo(`3. Fill residential units and verify Rent rooms cells, Unit Number values and Bedrooms cells`);
            testData.residentialUnits.forEach((unit, index) => {
                Income._Residential.InPlaceRentRoll.enterMonthlyRentByRowNumber(unit.monthlyRent, index)
                    .enterBedroomsNumberByRowNumber(unit.bedRooms, index)
                    .enterRoomsNumberByRowNumber(unit.rooms, index)
                    .enterUnitNumberByRow(unit.unitNumber, index);
            });

            cy.stepInfo(`4. Verify the Bedrooms, Unit Number and Rooms value can be deleted`);
            Income._Residential.InPlaceRentRoll.removeBedroomsNumberByRowNumber()
                .removeRoomsNumberByRowNumber()
                .removeUnitNumberByRowNumber();

            cy.stepInfo(`5. Copy / Paste selected value into the Bedrooms and Rooms cell`);
            Income._Residential.InPlaceRentRoll.pasteBedroomsByRowNumber(testData.residentialUnits[0].bedRooms)
                .pasteRoomsByRowNumber(testData.residentialUnits[0].rooms)
                .pasteUnitNumberByRowNumber(testData.residentialUnits[0].unitNumber);
        });
    });