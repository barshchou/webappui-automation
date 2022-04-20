/// <reference types="cypress-grep" />

import testData from "../../../../../fixtures/not_full_reports/income/commercial/stabilized_rent_roll/QA-4581.fixture";
import NavigationSection from "../../../../../actions/base/navigationSection.actions";
import { createReport, deleteReport } from "../../../../../actions/base/baseTest.actions";
import Property from "../../../../../actions/property/property.manager";
import Income from "../../../../../actions/income/income.manager";



describe("Verify the Save & Continue button functionality on the Stabilized Rent Roll page:", () => {


    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });


    it("Test body", () => {
        cy.stepInfo(` 1. Report creation and several commercial units addition `);
        NavigationSection.navigateToPropertySummary();
        Property.Summary.enterNumberOfCommercialUnits(testData.buildingDescription.numberOfUnits);

        NavigationSection.navigateToCommercialInPlaceRentRoll();
        Income.Commercial.InPlaceRentRoll.chooseListLeaseStatuses(testData.leaseStatuses, testData.numberOfCommercialUnits);
        Income.Commercial.InPlaceRentRoll.chooseCheckBoxesIsInspectedFromList(testData.isInspected);


        cy.stepInfo(` 2. Verify the Save & Continue button is displayed on the Stabilized Rent Roll page `);
        NavigationSection.clickIncomeApproachButton()
            .clickCommercialArrow().openCommercialStabilizedRentRollInCommercial();
        cy.wait(3000);
        Income.Commercial.StabilizedRentRoll.verifySaveContinueButtonExist();

        cy.stepInfo(` 3. Fill in the editable fields with values or/and check check-boxes or/and click the radio button and click on the Save & Continue button. `);
        Income.Commercial.StabilizedRentRoll.verifyIsInspectedCheckedAll(testData.isInspected);
        Income.Commercial.StabilizedRentRoll.enterListPerSF(testData.leaseStatuses, testData.rentToBe);
        Income.Commercial.StabilizedRentRoll.clickSaveContinueButton();

        cy.stepInfo(` 4. Verify that the changes are saved and the user is redirected to the next page (Income > Miscellaneous > Laundry). `);
        Income.Miscellaneous.Laundry.verifyThatPageIsOpened();
        NavigationSection.clickIncomeApproachButton()
            .clickCommercialArrow().openCommercialStabilizedRentRollInCommercialWhenThereIsNoSaveNotification();
        Income.Commercial.StabilizedRentRoll.verifyAnnuallyRentPsfByRowNumber(testData.leaseStatuses, testData.rentToBe);

        cy.stepInfo(` 4. Delete report`);
        deleteReport(testData.reportCreationData.reportNumber);


    });
});