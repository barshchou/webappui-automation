import testData from "../../../../../fixtures/not_full_reports/income/commercial/rent_comps/QA-4615.fixture";
import { createReport, deleteReport } from "../../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../../actions/base";
import { Income } from "../../../../../actions";

describe("Verify Input in 'Use-Other*' free text works correctly", 
    { tags: [ "@income", "@commercial", "@rent_comps" ] }, () => {
        
    before("Login, create report", () => {
        cy.stepInfo("1. The mixed report is created and several commercial units are added");
        createReport(testData.reportCreationData);
    });

    it("[QA-4618]", () => {
        cy.stepInfo("2. Go to Income > Commercial > Rent Comps add comp and click Edit"); 
        _NavigationSection.navigateToCommercialRentComps();
        Income._CommercialManager.RentComps.openMap()
            .addCompFromMapByAddress(testData.address)
            .clickEditButtonByRowNumber();

        cy.stepInfo("3. Open the “Use” drop down and select “Other” option");
        Income._CommercialManager.RentComps.chooseRentCompFieldDropdownOption(testData.rentCompFields.name, testData.rentCompFields.value);
    

        cy.stepInfo("4. Verify Input in 'Use-Other*' user can be fill several values");
        testData.verifyFillValues.forEach(val => {
            Income._CommercialManager.RentComps.fillInRentCompFieldInput(testData.fieldName, val);
            Income._CommercialManager.RentComps.Page.getRentCompInputField(testData.fieldName).should("have.value", val);
        });

        cy.stepInfo("5. Verify Input in 'Use-Other*' user delete entered text");
        testData.verifyDeleteValues.forEach(val => {
            Income._CommercialManager.RentComps.fillInRentCompFieldInput(testData.fieldName, testData.verifyFillValues[0]);
            Income._CommercialManager.RentComps.Page.getRentCompInputField(testData.fieldName).type(val).should("have.value", "");
        });

        cy.stepInfo("6. Verify Input in 'Use-Other*' check that user can paste content into field");
        Income._CommercialManager.RentComps.emulateCopyPaste(
            Income._CommercialManager.RentComps.Page.getRentCompInputField(testData.fieldName),
            testData.verifyFillValues[0]
            );
        Income._CommercialManager.RentComps.Page.getRentCompInputField(testData.fieldName).should("have.value", testData.verifyFillValues[0]);
        

        deleteReport(testData.reportCreationData.reportNumber);
    });
});