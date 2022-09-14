import testData from "../../../../fixtures/not_full_reports/property/commercial_units/QA-4559.fixture";
import { Base, DataCollections, Property } from "../../../../actions";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";

describe("Verify the functionality of the State radio button", 
    { tags:[ "@property", "@commercial_units" ] }, () => {
    
        beforeEach("Login, create report", () => {

            cy.stepInfo(`1. Report creation and several commercial units addition`);
            createReport(testData.reportCreationData);
            Base._NavigationSection.navigateToSubjectPropertyData();
            DataCollections._SubjectPropertyData.enterNumberOfCommercialUnits(testData.numberOfCommercialUnits);
        });

        it("Test body", () => {
            cy.stepInfo(`2.  Proceed to the Property > Commercial Units page.`);
            _NavigationSection.navigateToCommercialUnits();

            cy.stepInfo(`3. Verify the State contains the following radio buttons: 
            Finished, Unfinished, Vanilla Box, Other, and no value is selected by default`);
            testData.stateValues.forEach(value => {
                Property._CommercialUnits.Page.getRadioButtonByValueAndUnitIndex(testData.groupName, value)
                    .should('exist');
                Property._CommercialUnits.verifyRadioIsNotChecked(testData.groupName, value);
            });

            cy.stepInfo(`4. Verify that each radio button can be selected and saved 
            and verify text field appears with other value`);
            testData.stateValues.forEach(value => {
                Property._CommercialUnits.clickRadioButtonByValueAndUnitIndex(testData.groupName, value);
                if (value === "other") { 
                    Property._CommercialUnits.enterOtherValueByGroupName(testData.groupName, testData.otherValue); 
                }
                Property._CommercialUnits.clickSaveButton()
                    .verifyProgressBarNotExist();
                cy.reload();
                Property._CommercialUnits.verifyRadioIsChecked(testData.groupName, value);
                if (value === "other") { 
                    Property._CommercialUnits.verifyOtherValueByGroupName(testData.groupName, testData.otherValue); 
                }
            });
        });
    });