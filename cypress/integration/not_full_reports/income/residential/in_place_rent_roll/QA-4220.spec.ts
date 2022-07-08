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

        testData.labelNames.forEach(val =>  {
            cy.stepInfo(`2. Verify that the Inspected column (checkbox) is displayed after the ${val} in the grid and check them`);
            Income._Residential.InPlaceRentRoll.checkCheckboxByLabel(val.checkLabel);
            if (val.checkLabel !== testData.labelNames[0].checkLabel) {
                Income._Residential.InPlaceRentRoll.verifyColumnExist(val.columnLabel);
            }
        });
        Income._Residential.InPlaceRentRoll.setIsInspectedCheckboxByRowNumber(0)
            .enterForecastByRowNumber(testData.forecastNumber);

        cy.stepInfo("3. Navigate to Income > Residential > Stabilized Rent Roll and verify checked column exist");
        _NavigationSection.navigateToResidentialStabilizedRentRoll();

        testData.labelNames.slice(1).forEach(val => {
            Income._Residential.StabilizedRentRoll.verifyColumnExistOrNotExistInTable(val.columnLabel);
        });

        cy.stepInfo("4. Proceed to the Final > Unit Inspection section and verify the correct data is displayed");
        _NavigationSection.navigateToUnitInspection();
        Final._UnitInspection.verifyRowExistOrNotExistInTable();

        _NavigationSection.navigateToResInPlaceRentRoll();
        testData.labelNames.forEach(val =>  {
            cy.stepInfo(`5. Uncheck ${val} checkbox on the Residential > Stabilized Rent Roll page`);
            Income._Residential.InPlaceRentRoll.uncheckCheckboxByLabel(val.checkLabel);
            if (val.checkLabel !== testData.labelNames[0].checkLabel) {
                Income._Residential.InPlaceRentRoll.verifyColumnNotExist(val.columnLabel);
            }
        });
        Income._Residential.InPlaceRentRoll.setIsInspectedCheckboxByRowNumber(0, false);

        cy.stepInfo("6. Verify that the changes are applied to the Stabilized Rent Roll and  Final > Unit Inspection page");
        _NavigationSection.navigateToResidentialStabilizedRentRoll();
        testData.labelNames.slice(1).forEach(val => {
            Income._Residential.StabilizedRentRoll.verifyColumnExistOrNotExistInTable(val.columnLabel, false);
        });

        _NavigationSection.navigateToUnitInspection();
        Final._UnitInspection.verifyRowExistOrNotExistInTable(0, false);
        
        deleteReport(testData.reportCreationData.reportNumber);
    });
});