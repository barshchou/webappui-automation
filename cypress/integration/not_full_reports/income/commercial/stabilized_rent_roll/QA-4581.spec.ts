/// <reference types="cypress-grep" />

import testData from "../../../../../fixtures/not_full_reports/income/commercial/stabilized_rent_roll/QA-4581.fixture";
import { Base, Property, Income } from "../../../../../actions";
import { createReport, deleteReport } from "../../../../../actions/base/baseTest.actions";
import { Tag } from "../../../../../utils/tags.utils";


describe("Verify the Save & Continue button functionality on the Stabilized Rent Roll page:", 
    { tags: [ Tag.income, Tag.commercial, Tag.stabilized_rent_roll ] }, () => {
    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {

        cy.stepInfo(` 1. Report creation and several commercial units addition `);
        Base._NavigationSection.navigateToPropertySummary();
        Property._Summary.enterNumberOfCommercialUnits(testData.buildingDescription.numberOfUnits);

        Base._NavigationSection.navigateToCommercialInPlaceRentRoll();
        Income._CommercialManager.InPlaceRentRoll.chooseListLeaseStatuses(testData.leaseStatuses, testData.numberOfCommercialUnits)
            .chooseCheckBoxesIsInspectedFromList(testData.isInspected);

        cy.stepInfo(` 2. Verify the Save & Continue button is displayed on the Stabilized Rent Roll page `);
        Base._NavigationSection.clickIncomeApproachButton().navigateToStabilizedRentRollInCommercial();
        Income._CommercialManager.StabilizedRentRoll.verifyThatPageIsOpened()
        .Page.SaveAndContinueBtn.scrollIntoView().should('exist');

        cy.stepInfo(` 3. Fill in the editable fields with values or/and check check-boxes or/and click the radio button and click on the Save & Continue button. `);
        Income._CommercialManager.StabilizedRentRoll.verifyIsInspectedCheckedAll(testData.isInspected)
            .enterListPerSFAnnually(testData.leaseStatuses, testData.rentToBe)
            .clickSaveContinueButton();

        cy.stepInfo(` 4. Verify that the changes are saved and the user is redirected to the next page (Income > Miscellaneous > Laundry). `);
        Income._MiscellaneousManager.Laundry.verifyThatPageIsOpened();
        Base._NavigationSection.clickIncomeApproachButton()
            .clickCommercialArrow().clickCommercialStabRentRollButton();
        Income._CommercialManager.StabilizedRentRoll.verifyListRentPsfAnnually(testData.leaseStatuses, testData.rentToBe);

        cy.stepInfo(` 4. Delete report`);
        deleteReport(testData.reportCreationData.reportNumber);


    });
});