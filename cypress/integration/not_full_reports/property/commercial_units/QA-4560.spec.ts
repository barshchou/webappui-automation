import testData from "../../../../fixtures/not_full_reports/property/commercial_units/QA-4560.fixture";
import { DataCollections, Property } from "../../../../actions";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";

describe("Verify the functionality of the Location radio button", 
    { tags:[ "@property", "@commercial_units" ] }, () => {

        beforeEach("Login, create report", () => {

            cy.stepInfo(`1. Report creation and several commercial units addition`);
            createReport(testData.reportCreationData);
            _NavigationSection.navigateToSubjectPropertyData();
            DataCollections._SubjectPropertyData.enterNumberOfCommercialUnits(testData.numberOfCommercialUnits);
        });

        it("Test body", () => {
            cy.stepInfo(`2.  Proceed to the Property > Commercial Units page.`);
            _NavigationSection.navigateToCommercialUnits();

            cy.stepInfo(`3. Verify the Location contains the following radio buttons: 
            Corner, Mid-Block, Through-lot, and no value is selected by default`);
            testData.locationValues.forEach(value => {
                Property._CommercialUnits.Page.getRadioButtonByValueAndUnitIndex(testData.groupName, value)
                    .should('exist');
                Property._CommercialUnits.verifyRadioIsNotChecked(testData.groupName, value);
            });

            cy.stepInfo(`4. Verify that each radio button can be selected and saved 
            and verify text field appears with other value`);
            testData.locationValues.forEach(value => {
                Property._CommercialUnits.clickRadioButtonByValueAndUnitIndex(testData.groupName, value)
                    .clickSaveButton()
                    .verifyProgressBarNotExist();
                cy.reload();
                Property._CommercialUnits.verifyRadioIsChecked(testData.groupName, value);
            });
        });
    });