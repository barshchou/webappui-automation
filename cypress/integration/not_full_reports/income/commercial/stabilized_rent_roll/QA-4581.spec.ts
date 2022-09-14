import testData from "../../../../../fixtures/not_full_reports/income/commercial/stabilized_rent_roll/QA-4581.fixture";
import { Income, DataCollections } from "../../../../../actions";
import { createReport } from "../../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../../actions/base";

describe("Verify the Save & Continue button functionality on the Stabilized Rent Roll page:", 
    { tags: [ "@income", "@commercial", "@stabilized_rent_roll" ] }, () => {
        
        beforeEach("Login, create report", () => {
            createReport(testData.reportCreationData);
        });

        it("Test body", () => { 
            cy.stepInfo(` 1. Report creation and several commercial units addition `);
            _NavigationSection.navigateToSubjectPropertyData();
            DataCollections._SubjectPropertyData
                .enterNumberOfCommercialUnits(testData.buildingDescription.numberOfUnits);

            _NavigationSection.navigateToCommercialInPlaceRentRoll();
            Income._CommercialManager.InPlaceRentRoll
                .chooseListLeaseStatuses(testData.leaseStatuses, testData.numberOfCommercialUnits)
                .chooseCheckBoxesIsInspectedFromList(testData.isInspected);

            cy.stepInfo(` 2. Verify the Save & Continue button is displayed on the Stabilized Rent Roll page `);
            _NavigationSection.navigateToCommercialStabilizedRentRoll();
            Income._CommercialManager.StabilizedRentRoll.verifyThatPageIsOpened()
                .Page.SaveAndContinueBtn.scrollIntoView().should('exist');

            cy.stepInfo(` 3. Fill in the editable fields with values or/and check check-boxes or/and 
            click the radio button and click on the Save & Continue button. `);
            Income._CommercialManager.StabilizedRentRoll.verifyIsInspectedCheckedAll(testData.isInspected)
                .enterListPerSFAnnually(testData.leaseStatuses, testData.rentToBe)
                .clickSaveContinueButton();

            cy.stepInfo(` 4. Verify that the changes are saved and the user is redirected to the 
            next page (Income > Miscellaneous > Laundry). `);
            Income._MiscellaneousManager.Laundry.verifyThatPageIsOpened();
            _NavigationSection.navigateToCommercialStabilizedRentRoll();
            Income._CommercialManager.StabilizedRentRoll
                .verifyListRentPsfAnnually(testData.leaseStatuses, testData.rentToBe);
        });
    });