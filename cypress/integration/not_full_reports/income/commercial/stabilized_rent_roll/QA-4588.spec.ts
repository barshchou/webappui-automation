import { Income, Property } from "../../../../../actions"; 
import { _NavigationSection } from "../../../../../actions/base";
import { createReport } from "../../../../../actions/base/baseTest.actions";
import testData from "../../../../../fixtures/not_full_reports/income/commercial/stabilized_rent_roll/QA-4588.fixture";

describe(`Verify the Back button functionality on the Stabilized Rent Roll page`, 
    { tags:[ "@income", "@commercial", "@stabilized_rent_roll" ] }, () => {
        it("'As Is' report", () => {
            cy.stepInfo(`1. Create new 'As Is' report`);
            createReport(testData.reportCreationDataAsIs);

            cy.stepInfo(`2. Navigate to Summary and set commercial units number`);
            _NavigationSection.navigateToPropertySummary();
            Property._Summary.enterNumberOfCommercialUnits(testData.numberOfCommercialUnits);

            cy.stepInfo(`3. Set unit lease status to mixed ('Occupied + Vacant')`);
            _NavigationSection.navigateToCommercialInPlaceRentRoll();
            Income._CommercialManager.InPlaceRentRoll
                .chooseListLeaseStatuses(testData.leaseStatusMixed, testData.numberOfCommercialUnits);

            cy.stepInfo(`4. Navigate to Stabilized Rent Roll and verify generated commentary`);
            _NavigationSection.navigateToCommercialStabilizedRentRoll();
            Income._CommercialManager.StabilizedRentRoll
                .verifyStabilizedCommercialIncomeDiscussion(testData.commentaryAsIsMixed);

            cy.stepInfo(`5. Set all units lease status to 'Occupied'.`);
            _NavigationSection.navigateToCommercialInPlaceRentRoll();
            Income._CommercialManager.InPlaceRentRoll
                .chooseListLeaseStatuses(testData.leaseStatusOccupied, testData.numberOfCommercialUnits);

            cy.stepInfo(`6. Navigate to Stabilized Rent Roll and verify generated commentary`);
            _NavigationSection.navigateToCommercialStabilizedRentRoll();
            Income._CommercialManager.StabilizedRentRoll
                .verifyStabilizedCommercialIncomeDiscussion(testData.commentaryAsIsOccupied);

            cy.stepInfo(`7. Set all units lease status to 'Vacant'.`);
            _NavigationSection.clickCommercialRentRollButton()
                .submitSaveChangesModal();
            Income._CommercialManager.InPlaceRentRoll
                .chooseListLeaseStatuses(testData.leaseStatusVacant, testData.numberOfCommercialUnits);

            cy.stepInfo(`8. Navigate to Stabilized Rent Roll and verify generated commentary`);
            _NavigationSection.navigateToCommercialStabilizedRentRoll();
            Income._CommercialManager.StabilizedRentRoll
                .verifyStabilizedCommercialIncomeDiscussion(testData.commentaryAsIsVacant);
        });

        it("'As Stabilized' report", () => {
            cy.stepInfo(`1. Create new 'As Stabilized' report`);
            createReport(testData.reportCreationDataAsStabilized);

            cy.stepInfo(`2. Navigate to Summary and set commercial units number`);
            _NavigationSection.navigateToPropertySummary();
            Property._Summary.enterNumberOfCommercialUnits(testData.numberOfCommercialUnits);

            cy.stepInfo(`3. Set unit lease status to mixed ('Occupied + Vacant')`);
            _NavigationSection.navigateToCommercialInPlaceRentRoll();
            Income._CommercialManager.InPlaceRentRoll
                .chooseListLeaseStatuses(testData.leaseStatusMixed, testData.numberOfCommercialUnits);

            cy.stepInfo(`4. Navigate to Stabilized Rent Roll and verify generated commentary`);
            _NavigationSection.navigateToCommercialStabilizedRentRoll();
            Income._CommercialManager.StabilizedRentRoll
                .verifyStabilizedCommercialIncomeDiscussion(testData.commentaryAsStabilizedMixed);

            cy.stepInfo(`5. Set all units lease status to 'Occupied'.`);
            _NavigationSection.navigateToCommercialInPlaceRentRoll();
            Income._CommercialManager.InPlaceRentRoll
                .chooseListLeaseStatuses(testData.leaseStatusOccupied, testData.numberOfCommercialUnits);

            cy.stepInfo(`6. Navigate to Stabilized Rent Roll and verify generated commentary`);
            _NavigationSection.navigateToCommercialStabilizedRentRoll();
            Income._CommercialManager.StabilizedRentRoll
                .verifyStabilizedCommercialIncomeDiscussion(testData.commentaryAsStabilizedOccupied);

            cy.stepInfo(`7. Set all units lease status to 'Vacant'.`);
            _NavigationSection.navigateToCommercialInPlaceRentRoll();
            Income._CommercialManager.InPlaceRentRoll
                .chooseListLeaseStatuses(testData.leaseStatusVacant, testData.numberOfCommercialUnits);

            cy.stepInfo(`8. Navigate to Stabilized Rent Roll and verify generated commentary`);
            _NavigationSection.navigateToCommercialStabilizedRentRoll();
            Income._CommercialManager.StabilizedRentRoll
                .verifyStabilizedCommercialIncomeDiscussion(testData.commentaryAsStabilizedVacant);
        });

        it("'As Complete' report", () => {
            cy.stepInfo(`1. Create new 'As Complete' report`);
            createReport(testData.reportCreationDataAsComplete);

            cy.stepInfo(`2. Navigate to Summary and set commercial units number`);
            _NavigationSection.navigateToPropertySummary();
            Property._Summary.enterNumberOfCommercialUnits(testData.numberOfCommercialUnits);

            cy.stepInfo(`3. Set unit lease status to mixed ('Occupied + Vacant')`);
            _NavigationSection.navigateToCommercialInPlaceRentRoll();
            Income._CommercialManager.InPlaceRentRoll
                .chooseListLeaseStatuses(testData.leaseStatusMixed, testData.numberOfCommercialUnits);

            cy.stepInfo(`4. Navigate to Stabilized Rent Roll and verify generated commentary`);
            _NavigationSection.navigateToCommercialStabilizedRentRoll();
            Income._CommercialManager.StabilizedRentRoll
                .verifyStabilizedCommercialIncomeDiscussion(testData.commentaryAsCompleteMixed);

            cy.stepInfo(`5. Set all units lease status to 'Occupied'.`);
            _NavigationSection.navigateToCommercialInPlaceRentRoll();
            Income._CommercialManager.InPlaceRentRoll
                .chooseListLeaseStatuses(testData.leaseStatusOccupied, testData.numberOfCommercialUnits);

            cy.stepInfo(`6. Navigate to Stabilized Rent Roll and verify generated commentary`);
            _NavigationSection.navigateToCommercialStabilizedRentRoll();
            Income._CommercialManager.StabilizedRentRoll
                .verifyStabilizedCommercialIncomeDiscussion(testData.commentaryAsCompleteOccupied);

            cy.stepInfo(`7. Set all units lease status to 'Vacant'.`);
            _NavigationSection.navigateToCommercialInPlaceRentRoll();
            Income._CommercialManager.InPlaceRentRoll
                .chooseListLeaseStatuses(testData.leaseStatusVacant, testData.numberOfCommercialUnits);

            cy.stepInfo(`8. Navigate to Stabilized Rent Roll and verify generated commentary`);
            _NavigationSection.navigateToCommercialStabilizedRentRoll();
            Income._CommercialManager.StabilizedRentRoll
                .verifyStabilizedCommercialIncomeDiscussion(testData.commentaryAsCompleteVacant);
        });
    });