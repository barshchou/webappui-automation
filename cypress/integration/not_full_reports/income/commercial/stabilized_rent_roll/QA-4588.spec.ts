import { Income, Property } from "../../../../../actions";
import { _NavigationSection } from "../../../../../actions/base";
import { createReport, deleteReport } from "../../../../../actions/base/baseTest.actions";
import testData from "../../../../../fixtures/not_full_reports/income/commercial/stabilized_rent_roll/QA-4588.fixture";

describe(`Verify the Back button functionality on the Stabilized Rent Roll page`, 
    { tags:[ "@income", "@commercial", "@stabilized_rent_roll" ] }, () => {
        
    it("'As Is' report", () => {
        cy.stepInfo(`Create new 'As Is' report`);
        createReport(testData.reportCreationDataAsIs);

        cy.stepInfo(`Navigate to Summary and set commercial units number`);
        _NavigationSection.navigateToPropertySummary();
        Property._Summary.enterNumberOfCommercialUnits(testData.numberOfCommercialUnits);

        cy.stepInfo(`Set unit lease status to mixed ('Occupied + Vacant')`);
        _NavigationSection.navigateToCommercialInPlaceRentRoll();
        Income._CommercialManager.InPlaceRentRoll.chooseListLeaseStatuses(testData.leaseStatusMixed, testData.numberOfCommercialUnits);

        cy.stepInfo(`Navigate to Stabilized Rent Roll and verify generated commentary`);
        _NavigationSection.openCommercialStabilizedRentRollInCommercial();
        Income._CommercialManager.StabilizedRentRoll.verifyStabilizedCommercialIncomeDiscussion(testData.commentaryAsIsMixed);

        cy.stepInfo(`Set all units lease status to 'Occupied'.`);
        _NavigationSection.clickCommercialRentRollButton()
            .clickYesIfExist();
        Income._CommercialManager.InPlaceRentRoll.chooseListLeaseStatuses(testData.leaseStatusOccupied, testData.numberOfCommercialUnits);

        cy.stepInfo(`Navigate to Stabilized Rent Roll and verify generated commentary`);
        _NavigationSection.openCommercialStabilizedRentRollInCommercial();
        Income._CommercialManager.StabilizedRentRoll.verifyStabilizedCommercialIncomeDiscussion(testData.commentaryAsIsOccupied);

        cy.stepInfo(`Set all units lease status to 'Vacant'.`);
        _NavigationSection.clickCommercialRentRollButton()
            .clickYesIfExist();
        Income._CommercialManager.InPlaceRentRoll.chooseListLeaseStatuses(testData.leaseStatusVacant, testData.numberOfCommercialUnits);

        cy.stepInfo(`Navigate to Stabilized Rent Roll and verify generated commentary`);
        _NavigationSection.openCommercialStabilizedRentRollInCommercial();
        Income._CommercialManager.StabilizedRentRoll.verifyStabilizedCommercialIncomeDiscussion(testData.commentaryAsIsVacant);

        deleteReport(testData.reportCreationDataAsIs.reportNumber);
    });

    it("'As Stabilized' report", () => {
        cy.stepInfo(`Create new 'As Stabilized' report`);
        createReport(testData.reportCreationDataAsStabilized);

        cy.stepInfo(`Navigate to Summary and set commercial units number`);
        _NavigationSection.navigateToPropertySummary();
        Property._Summary.enterNumberOfCommercialUnits(testData.numberOfCommercialUnits);

        cy.stepInfo(`Set unit lease status to mixed ('Occupied + Vacant')`);
        _NavigationSection.navigateToCommercialInPlaceRentRoll();
        Income._CommercialManager.InPlaceRentRoll.chooseListLeaseStatuses(testData.leaseStatusMixed, testData.numberOfCommercialUnits);

        cy.stepInfo(`Navigate to Stabilized Rent Roll and verify generated commentary`);
        _NavigationSection.openCommercialStabilizedRentRollInCommercial();
        Income._CommercialManager.StabilizedRentRoll.verifyStabilizedCommercialIncomeDiscussion(testData.commentaryAsStabilizedMixed);

        cy.stepInfo(`Set all units lease status to 'Occupied'.`);
        _NavigationSection.clickCommercialRentRollButton()
            .clickYesIfExist();
        Income._CommercialManager.InPlaceRentRoll.chooseListLeaseStatuses(testData.leaseStatusOccupied, testData.numberOfCommercialUnits);

        cy.stepInfo(`Navigate to Stabilized Rent Roll and verify generated commentary`);
        _NavigationSection.openCommercialStabilizedRentRollInCommercial();
        Income._CommercialManager.StabilizedRentRoll.verifyStabilizedCommercialIncomeDiscussion(testData.commentaryAsStabilizedOccupied);

        cy.stepInfo(`Set all units lease status to 'Vacant'.`);
        _NavigationSection.clickCommercialRentRollButton()
            .clickYesIfExist();
        Income._CommercialManager.InPlaceRentRoll.chooseListLeaseStatuses(testData.leaseStatusVacant, testData.numberOfCommercialUnits);

        cy.stepInfo(`Navigate to Stabilized Rent Roll and verify generated commentary`);
        _NavigationSection.openCommercialStabilizedRentRollInCommercial();
        Income._CommercialManager.StabilizedRentRoll.verifyStabilizedCommercialIncomeDiscussion(testData.commentaryAsStabilizedVacant);

        deleteReport(testData.reportCreationDataAsStabilized.reportNumber);
    });

    it("'As Complete' report", () => {
        cy.stepInfo(`Create new 'As Complete' report`);
        createReport(testData.reportCreationDataAsComplete);

        cy.stepInfo(`Navigate to Summary and set commercial units number`);
        _NavigationSection.navigateToPropertySummary();
        Property._Summary.enterNumberOfCommercialUnits(testData.numberOfCommercialUnits);

        cy.stepInfo(`Set unit lease status to mixed ('Occupied + Vacant')`);
        _NavigationSection.navigateToCommercialInPlaceRentRoll();
        Income._CommercialManager.InPlaceRentRoll.chooseListLeaseStatuses(testData.leaseStatusMixed, testData.numberOfCommercialUnits);

        cy.stepInfo(`Navigate to Stabilized Rent Roll and verify generated commentary`);
        _NavigationSection.openCommercialStabilizedRentRollInCommercial();
        Income._CommercialManager.StabilizedRentRoll.verifyStabilizedCommercialIncomeDiscussion(testData.commentaryAsCompleteMixed);

        cy.stepInfo(`Set all units lease status to 'Occupied'.`);
        _NavigationSection.clickCommercialRentRollButton()
            .clickYesIfExist();
        Income._CommercialManager.InPlaceRentRoll.chooseListLeaseStatuses(testData.leaseStatusOccupied, testData.numberOfCommercialUnits);

        cy.stepInfo(`Navigate to Stabilized Rent Roll and verify generated commentary`);
        _NavigationSection.openCommercialStabilizedRentRollInCommercial();
        Income._CommercialManager.StabilizedRentRoll.verifyStabilizedCommercialIncomeDiscussion(testData.commentaryAsCompleteOccupied);

        cy.stepInfo(`Set all units lease status to 'Vacant'.`);
        _NavigationSection.clickCommercialRentRollButton()
            .clickYesIfExist();
        Income._CommercialManager.InPlaceRentRoll.chooseListLeaseStatuses(testData.leaseStatusVacant, testData.numberOfCommercialUnits);

        cy.stepInfo(`Navigate to Stabilized Rent Roll and verify generated commentary`);
        _NavigationSection.openCommercialStabilizedRentRollInCommercial();
        Income._CommercialManager.StabilizedRentRoll.verifyStabilizedCommercialIncomeDiscussion(testData.commentaryAsCompleteVacant);

        deleteReport(testData.reportCreationDataAsComplete.reportNumber);
    });
});