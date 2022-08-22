import { Base, Income, Property } from "../../../../../actions"; 
import { _NavigationSection } from "../../../../../actions/base";
import { createReport } from "../../../../../actions/base/baseTest.actions";
import testData from "../../../../../fixtures/not_full_reports/income/commercial/stabilized_rent_roll/QA-4593.fixture";

describe(`Verify the Save button functionality on the Stabilized Rent Roll page`, 
    { tags:[ "@income", "@commercial", "@stabilized_rent_roll" ] }, () => {
        
        beforeEach("Login, create report", () => {
            createReport(testData.reportCreationData);
        });

        it("Test body", () => {
            cy.stepInfo("Precondition: Navigate to Summary page and set commercial units. "+
            "Navigate to In Place Rent Roll and fill units data. At least 1 unit must be 'Vacant'");
            _NavigationSection.navigateToPropertySummary();
            Property._Summary.enterNumberOfCommercialUnits(testData.numberOfCommercialUnits);
            Base._NavigationSection.navigateToCommercialInPlaceRentRoll();
            Income._CommercialManager.InPlaceRentRoll
                .chooseListLeaseStatuses(testData.leaseStatuses, testData.numberOfCommercialUnits)
                .chooseCheckBoxesIsInspectedFromList(testData.isInspected);

            cy.stepInfo(`1. Verify the Save button is displayed on the Stabilized Rent Roll page `);
            Base._NavigationSection.clickIncomeApproachButton().navigateToStabilizedRentRollInCommercial();
            Income._CommercialManager.StabilizedRentRoll.verifyThatPageIsOpened()
                .Page.SaveBtn.scrollIntoView().should('exist');

            cy.stepInfo(`2. Fill in the editable fields with values or/and check 
            check-boxes or/and click the radio button and click on the Save button. `);
            Income._CommercialManager.StabilizedRentRoll
                .enterListPerSFAnnually(testData.leaseStatuses, testData.rentToBe)
                .clickSaveButton();

            cy.stepInfo(`3. Reload page verify that the changes are saved and the user 
            isn't redirected to the next page.`);
            cy.reload();
            Income._CommercialManager.StabilizedRentRoll
                .verifyListRentPsfAnnually(testData.leaseStatuses, testData.rentToBe);
        });
    });