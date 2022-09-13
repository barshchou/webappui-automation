import testData from "../../../../../fixtures/not_full_reports/income/commercial/stabilized_rent_roll/QA-4607.fixture";
import { createReport } from "../../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../../actions/base";
import { Income, Property } from "../../../../../actions";

describe("Verify the Commercial Stabilized Rent Roll table", 
    { tags: [ "@income", "@commercial", "@stabilized_rent_roll" ] }, () => {
         
        beforeEach("Login, create report", () => {
            cy.stepInfo(`1. The mixed report is created and several commercial units are added`);
            createReport(testData.reportCreationData);
            _NavigationSection.navigateToPropertySummary();
            Property._Summary.enterGrossBuildingArea(testData.grossBuildingArea)
                .enterNumberOfCommercialUnits(testData.numberOfCommercialUnits);

            cy.stepInfo(`2. On the Property Commercial Unit, the Commercial Unit # SF is filled by any value`); 
            _NavigationSection.navigateToCommercialUnits();
            Property._CommercialUnits.enterListUnitSF(testData.listOfUnitsSF, testData.numberOfCommercialUnits);

            cy.stepInfo(`3. On the Income > Commercial > In-Place Rent Roll, the “Vacant“ value is selected 
                    in the Lease Status column for all commercial units`); 
            _NavigationSection.navigateToCommercialInPlaceRentRoll();
            Income._CommercialManager.InPlaceRentRoll
                .chooseListLeaseStatuses(testData.leaseStatuses, testData.numberOfCommercialUnits);

            cy.stepInfo(`4. On the Income > Commercial > Comp Groups, 
            a new Comp Group has been created with added Comps`); 
            _NavigationSection.navigateToCommercialCompGroups();
            Income._CommercialManager.CompGroups.addCompGroup(testData.compGroup)
                .dragAllCommercialUnitsIntoGroup(testData.compGroup, testData.numberOfCommercialUnits);

            cy.stepInfo(`5. On the Income > Commercial > Rent Comps, several comps have been added for 
                    comparison into a new Created Group from the previous step`);
            _NavigationSection.navigateToCommercialRentComps();
            Income._CommercialManager.RentComps.clickManuallyAddANewCompButton().
                searchNewCompByAddress(testData.address);
            testData.rentCompFields.forEach(field => {
                if (field.type == "input") {
                    Income._CommercialManager.RentComps.fillInRentCompFieldInput(field.name, field.value, true);
                } else {
                    Income._CommercialManager.RentComps.chooseRentCompFieldDropdownOption(field.name, field.value);
                }
            });
            Income._CommercialManager.RentComps.enterLeaseDate(testData.leaseDate)
                .clickSubmitButton()
                .dragAllCommercialUnitsIntoGroup(testData.compGroup, testData.compsAmount);

            cy.stepInfo(`6. On the Income > Commercial > Rent Reconciliation, the Market Rent Conclusion 
                    field is filled with any value`);
            _NavigationSection.navigateToRentReconciliation();
            Income._CommercialManager.RentReconciliation.addMarketRentConclusion(testData.marketRentConclusion);
        });

        it("[QA-4607]", () => {
            cy.stepInfo(`7. Proceed to the Income > Commercial > Stabilized Rent Roll page.`);
            _NavigationSection.navigateToCommercialStabilizedRentRoll();
    
            cy.stepInfo(`8. Click on the Autofill Vacant Units button and verify the Rent PSF column is auto-filled 
                    (Note: Annual and Monthly Rent columns are disabled).
                    9. Verify that the value in the Rent PSF = the Market Rent Conclusion value.`);
            Income._CommercialManager.StabilizedRentRoll.clickAutoFillButton();
            testData.leaseStatuses.forEach((_unit, index) => {
                Income._CommercialManager.StabilizedRentRoll
                    .verifyRentPerSFAnnuallyCellTextByRow(`$${testData.marketRentConclusion.toFixed(2)}`, index);
            });
        
            cy.stepInfo(`10. Verify the Annual Rent is calculated correctly per formula: Rent PSF col.* SF col.`);
            testData.leaseStatuses.forEach((_unit, index) => {
                Income._CommercialManager.StabilizedRentRoll
                    .verifyAnnualRentCellPerSFBasisByRow(testData.marketRentConclusion, testData.listOfUnitsSF[index], 
                        testData.unitsOfMeasure, index);
            });

            cy.stepInfo(`11. Verify the Monthly Rent is calculated correctly per formula: 
            (Rent PSF col.* SF col.)/12.`);
            testData.leaseStatuses.forEach((_unit, index) => {
                Income._CommercialManager.StabilizedRentRoll
                    .verifyMonthlyRentPerSFByRow(testData.marketRentConclusion, testData.listOfUnitsSF[index], 
                        testData.unitsOfMeasure, index);
            });
        });
    });