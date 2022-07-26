import testData from "../../../../fixtures/not_full_reports/property/commercial_units/QA-4561.fixture";
import { Property } from "../../../../actions";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";

describe("Verify the functionality of the Street Type radio button", 
    { tags:[ "@property", "@commercial_units" ] }, () => {

        before("Login, create report", () => {
            cy.stepInfo(`1. Report creation and several commercial units addition`);
            createReport(testData.reportCreationData);
            _NavigationSection.navigateToPropertySummary();
            Property._Summary.enterNumberOfCommercialUnits(testData.numberOfCommercialUnits);
        });

        it("Test body", () => {
            cy.stepInfo(`2.  Proceed to the Property > Commercial Units page.`);
            _NavigationSection.navigateToCommercialUnits();

            cy.stepInfo(`3. Verify the Street Type contains the following radio buttons: 
            Side Street, Avenue, and no value is selected by default`);
            testData.streetTypeValues.forEach(value => {
                Property._CommercialUnits.Page.getRadioButtonByValueAndUnitIndex(testData.groupName, value)
                    .should('exist');
                Property._CommercialUnits.verifyRadioIsNotChecked(testData.groupName, value);
            });

            cy.stepInfo(`4. Verify that each radio button can be selected and saved`);
            testData.streetTypeValues.forEach(value => {
                Property._CommercialUnits.clickRadioButtonByValueAndUnitIndex(testData.groupName, value);
                Property._CommercialUnits.clickSaveButton()
                    .verifyProgressBarNotExist();
                cy.reload();
                Property._CommercialUnits.verifyRadioIsChecked(testData.groupName, value);
            });

            deleteReport(testData.reportCreationData.reportNumber);
        });
    });