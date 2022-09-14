import testData from 
    "../../../../../fixtures/not_full_reports/income/residential/in_place_rent_roll/QA-4238-39_41-42.fixture";
import { createReport } from "../../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../../actions/base";
import { Income, DataCollections } from "../../../../../actions";

describe("In-Place Rent Roll table tests", 
    { tags:[ "@income", "@residential", "@in_place_rent_roll" ] }, () => {
        
        beforeEach("Login, create report", () => {
            createReport(testData.reportCreationData);
        });

        it("[QA-4239_41-42]", () => {
            cy.stepInfo(`Preconditions: Navigate to Income -> Summary and specify amount of units`);
            _NavigationSection.navigateToSubjectPropertyData();
            DataCollections._SubjectPropertyData.enterNumberOfResUnits(testData.residentialUnits.length);

            cy.stepInfo(`1. Navigate to Residential -> Verify Rent/Room column appears 
            and auto calculated after clicking 'Include Per Room Analysis in Report' checkbox`);
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
                    .enterRentTypeCellByRowNumber(unit.rentType, index)
                    .verifyRentRoomCellValues(unit.monthlyRent, unit.rooms, index);
            });

            cy.stepInfo(`3. Copy / Paste value into the Monthly Rent ($) cell`);
            Income._Residential.InPlaceRentRoll
                .pasteMonthlyRentByRowNumber(testData.residentialUnits[0].monthlyRent, 1);

            cy.stepInfo(`4.Verify that each value can be selected 
            (NOTE: If 'Vacant' is selected proper 'Monthly Rent ($) field is disabled)`);
            Income._Residential.InPlaceRentRoll.enterLeaseStatusByRowNumber(testData.residentialUnits[0].leaseStatus)
                .Page.monthlyRentCells.eq(0).should("have.class", "readOnly");

            cy.stepInfo(`5. Verify the Lease Status value can be deleted`);
            Income._Residential.InPlaceRentRoll.removeLeaseStatusByRowNumber()
                .Page.pageTitle.click();
        
            cy.stepInfo(`6. Copy / Paste selected value into the Lease Status cell`);
            Income._Residential.InPlaceRentRoll.pasteLeaseStatusByRowNumber(testData.residentialUnits[0].leaseStatus);

            cy.stepInfo(`7. Verify the Rent Type value can be deleted`);
            Income._Residential.InPlaceRentRoll.removeRentTypeByRowNumber()
                .Page.pageTitle.click();

            cy.stepInfo(`8. Copy / Paste selected value into the Rent Type cell`);
            Income._Residential.InPlaceRentRoll.pasteRentTypeByRowNumber(testData.residentialUnits[1].rentType);
        });
    });