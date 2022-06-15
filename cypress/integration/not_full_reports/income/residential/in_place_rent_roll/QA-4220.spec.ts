import { Property, Income, Final } from './../../../../../actions/index';
import { _NavigationSection } from './../../../../../actions/base/index';
import testData from "../../../../../fixtures/not_full_reports/income/residential/in_place_rent_roll/QA-4220.fixture";
import { createReport, deleteReport } from "../../../../../actions/base/baseTest.actions";

describe("Verify the # column in the grid", 
    { tags:[ "@income", "@residential", "@in_place_rent_roll" ] }, () => {
        
    before("Login, create report", () => {
        createReport(testData.reportCreationData);
        cy.stepInfo("Preconditions: Several Residential Units are added on the Property > Summary page");
        _NavigationSection.navigateToPropertySummary();
        Property._Summary.enterNumberOfResUnits(testData.numberOfUnits);
    });

    it("Test body", () => {
        cy.stepInfo("1. Navigate to Income > Residential > In-Place Rent Roll");
        _NavigationSection.navigateToResInPlaceRentRoll();

        cy.stepInfo("2. Verify that the Inspected column (checkbox) is displayed after the # in the grid and check them");
        testData.labelNames.forEach(val =>  {
            Income._Residential.InPlaceRentRoll.checkCheckboxByLabel(val.checkLabel);
            // if (val.checkLabel !== testData.labelNames[0].checkLabel) {
            //     Income._Residential.InPlaceRentRoll.verifyColumnExist(val.columnLabel);
            // }
        });
        Income._Residential.InPlaceRentRoll.checkIsInspectedByRowNumber(0)
            .enterForecastByRowNumber(testData.forecastNumber);

        cy.stepInfo("3. Navigate to Income > Residential > Stabilized Rent Roll and verify checked column exist");
        _NavigationSection.navigateToResidentialStabilizedRentRoll();

        testData.labelNames.splice(1).forEach(val => {
            Income._Residential.StabilizedRentRoll.verifyColumnExistInTable(val.columnLabel);
        });

        cy.stepInfo("4. Proceed to the Final > Unit Inspection section and verify the correct data is displayed.");
        _NavigationSection.navigateToUnitInspection();
        Final._UnitInspection.verifyRowExistInTable();

        cy.stepInfo(`5. Uncheck all checkboxes on the Resi > Stabilized Rent Roll page
            and verify that the changes are applied to the Stabilized Rent Roll and  Final > Unit Inspection page.`);
        _NavigationSection.navigateToResInPlaceRentRoll();
        testData.labelNames.forEach(val =>  {
            Income._Residential.InPlaceRentRoll.uncheckCheckboxByLabel(val.checkLabel);
            // if (val.checkLabel !== testData.labelNames[0].checkLabel) {
            //     Income._Residential.InPlaceRentRoll.verifyColumnNotExist(val.columnLabel);
            // }
        });
        Income._Residential.InPlaceRentRoll.checkIsInspectedByRowNumber(0);

        // _NavigationSection.navigateToResidentialStabilizedRentRoll();

        // testData.labelNames.splice(1).forEach(val => {
        //     Income._Residential.StabilizedRentRoll.verifyColumnNotExistInTable(val.columnLabel);
        // });

        // _NavigationSection.navigateToUnitInspection();
        // Final._UnitInspection.verifyRowNotExistInTable();
        
        deleteReport(testData.reportCreationData.reportNumber);
    });
});