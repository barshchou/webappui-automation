import testData from "../../../../../fixtures/not_full_reports/income/residential/in_place_rent_roll/QA-4233.fixture";
import { createReport, deleteReport } from "../../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../../actions/base";
import { Income, Property } from "../../../../../actions";

describe("In-Place Rent Roll table tests", 
    { tags:[ "@income", "@residential", "@in_place_rent_roll" ] }, () => {
        
    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("[QA-4239_41-42]", () => {
        cy.stepInfo('Preconditions: Navigate to Income -> Summary and specify amount of units');
        _NavigationSection.navigateToPropertySummary();
        Property._Summary.enterNumberOfResUnits(testData.residentialUnits.length);

        cy.stepInfo("1. Navigate to Residential");
        _NavigationSection.navigateToResInPlaceRentRoll();
        
        cy.stepInfo("2. Fill residential units and verify Rent room cells values per formula = [Monthly Rent] / [Rooms]");
        testData.residentialUnits.forEach((unit, index) => {
            Income._Residential.InPlaceRentRoll.enterMonthlyRentByRowNumber(unit.monthlyRent, index)
                .enterBedroomsNumberByRowNumber(unit.bedRooms, index);
        });

        cy.stepInfo("3. Verify the Bedrooms value can be deleted");
        Income._Residential.InPlaceRentRoll.removeBedroomsNumberByRowNumber();

        cy.stepInfo("4. Copy / Paste selected value into the Bedrooms cell");
        Income._Residential.InPlaceRentRoll.pasteBedroomsByRowNumber(testData.residentialUnits[0].bedRooms);

        deleteReport(testData.reportCreationData.reportNumber);
    });
});