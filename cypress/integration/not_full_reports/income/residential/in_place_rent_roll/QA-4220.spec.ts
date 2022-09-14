import { DataCollections, Income, Final } from '../../../../../actions';
import { _NavigationSection } from '../../../../../actions/base';
import testData from "../../../../../fixtures/not_full_reports/income/residential/in_place_rent_roll/QA-4220.fixture";
import { createReport } from "../../../../../actions/base/baseTest.actions";

describe("Verify the # column in the grid", 
    { tags:[ "@income", "@residential", "@in_place_rent_roll" ] }, () => {
        
        beforeEach("Login, create report", () => {
            createReport(testData.reportCreationData);
            cy.stepInfo("Preconditions: Several Residential Units are added on the Property > Summary page");
            _NavigationSection.navigateToSubjectPropertyData();
            DataCollections._SubjectPropertyData.enterNumberOfResUnits(testData.numberOfUnits);
        });

        it("Test body", () => {
            cy.stepInfo("1. Navigate to Income > Residential > In-Place Rent Roll");
            _NavigationSection.navigateToResInPlaceRentRoll();

            testData.labelNames.forEach(labelName =>  {
                cy.stepInfo(`2. Verify that the Inspected column (checkbox) is displayed 
                after the ${labelName} in the grid and check them`);
                Income._Residential.InPlaceRentRoll.checkCheckboxByLabel(labelName.checkLabel);
                if (labelName.checkLabel !== testData.labelNames[0].checkLabel) {
                    Income._Residential.InPlaceRentRoll.verifyColumnExist(labelName.columnLabel);
                }
            });
            Income._Residential.InPlaceRentRoll.setIsInspectedCheckboxByRowNumber(0)
                .enterForecastByRowNumber(testData.forecastNumber);

            cy.stepInfo(`3. Navigate to Income > Residential > Stabilized Rent Roll and verify checked column exist`);
            _NavigationSection.navigateToResidentialStabilizedRentRoll();
            testData.labelNames.slice(1).forEach(labelName => {
                Income._Residential.StabilizedRentRoll.verifyColumnExistOrNotExistInTable(labelName.columnLabel);
            });

            cy.stepInfo(`4. Proceed to the Final > Unit Inspection section and verify the correct data is displayed`);
            _NavigationSection.navigateToUnitInspection();
            Final._UnitInspection.verifyRowExistOrNotExistInTable();

            _NavigationSection.navigateToResInPlaceRentRoll();
            testData.labelNames.forEach(labelName =>  {
                cy.stepInfo(`5. Uncheck ${labelName} checkbox on the Residential > Stabilized Rent Roll page`);
                Income._Residential.InPlaceRentRoll.uncheckCheckboxByLabel(labelName.checkLabel);
                if (labelName.checkLabel !== testData.labelNames[0].checkLabel) {
                    Income._Residential.InPlaceRentRoll.verifyColumnNotExist(labelName.columnLabel);
                }
            });
            Income._Residential.InPlaceRentRoll.setIsInspectedCheckboxByRowNumber(0, false);

            cy.stepInfo(`6. Verify that the changes are applied to the 
            Stabilized Rent Roll and  Final > Unit Inspection page`);
            _NavigationSection.navigateToResidentialStabilizedRentRoll();
            testData.labelNames.slice(1).forEach(val => {
                Income._Residential.StabilizedRentRoll.verifyColumnExistOrNotExistInTable(val.columnLabel, false);
            });

            _NavigationSection.navigateToUnitInspection();
            Final._UnitInspection.verifyRowExistOrNotExistInTable(0, false);
        });
    });