/// <reference types="cypress-grep" />

import testData from "../../../../../fixtures/not_full_reports/income/commercial/stabilized_rent_roll/QA-4581.fixture";
//import { Income, Property } from "../../../../../actions";
import NavigationSection from "../../../../../actions/base/navigationSection.actions";
import { createReport, deleteReport } from "../../../../../actions/base/baseTest.actions";
import Property from "../../../../../actions/property/property.manager";
import Income from "../../../../../actions/income/income.manager";








describe("Verify the Save & Continue button functionality on the Stabilized Rent Roll page:", () => {
    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });
  

    it("Test body", () => {  
        cy.stepInfo(` 1. report creation and several commercial units addition `);
        NavigationSection.navigateToPropertySummary();
     Property.Summary.enterNumberOfCommercialUnits(testData.buildingDescription.numberOfUnits);
    // NavigationSection.navigateToCommercialUnits();

    NavigationSection.navigateToCommercialInPlaceRentRoll();
   // Income.Commercial.InPlaceRentRoll.clickIsInspectedCheckboxByOrder(testData.numberOfCommercialUnits, testData.isInspected);
    Income.Commercial.InPlaceRentRoll.chooseListLeaseStatuses(testData.leaseStatuses, testData.numberOfCommercialUnits);
        //.enterTenantNames(testData.tenantNames, testData.leaseStatuses)
       // .verifyUseCells(testData.useTexts);




       cy.stepInfo(`1. Proceed to the Property > Commercial Units page.`);
       NavigationSection.clickIncomeApproachButton()
       .clickCommercialArrow().openCommercialStabilizedRentRollInCommercial()


       cy.stepInfo(` 1. Verify the Save & Continue button is displayed on the Stabilized Rent Roll page `);
      
       Income.Commercial.StabilizedRentRoll
       //.verifyIsInspectedChecked()
       .verifyProgressBarNotExist();

       Income.Commercial.StabilizedRentRoll.verifySaveContinueButtonExist();
        Income.Commercial.StabilizedRentRoll.clickSaveContinueButton();
      
    //        .goBackWithSave();
   //     Income.Residential.InPlaceRentRoll.verifyCheckboxIsChecked(testData.forecastLabel);
  //      deleteReport(testData.reportCreationData.reportNumber);
   
       






       
       
       cy.stepInfo(` 1. Fill in the editable fields with values or/and check check-boxes or/and click the radio button and click on the Save & Continue button. `);


       cy.stepInfo(` 1. Verify that the changes are saved and the user is redirected to the next page (Income > Miscellaneous > Laundry). `);



    });
});