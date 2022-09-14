import testData from "../../../../fixtures/not_full_reports/property/commercial_units/QA-4564.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import { DataCollections, Property } from "../../../../actions";

describe("Verify the functionality of the Facade radio button", 
    { tags: [ "@property", "@commercial_units" ] }, () => {
        
        beforeEach("Login, create report", () => {
            createReport(testData.reportCreationData);
        });

        it("Test body", () => {
            cy.stepInfo(`1. Navigate to property summary and enter number of commercial units`);
            _NavigationSection.navigateToSubjectPropertyData();
            DataCollections._SubjectPropertyData.enterNumberOfCommercialUnits(testData.numberOfCommercialUnits);
            cy.stepInfo(`2. Navigate to commercial units and verify functionality of the Facade radio`);
            _NavigationSection.navigateToCommercialUnits();
            cy.stepInfo(`3. Verify the Facade contains the following radio buttons: 
            Plate Glass, Other and no value is selected`);
            testData.facadeValues.forEach(value => {
                Property._CommercialUnits.verifyRadioIsNotChecked(testData.groupName, value);
            });
            cy.stepInfo(`4. Verify that each radio button can be selected and saved 
            and verify text field appears with other value`);
            testData.facadeValues.forEach(value => {
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
