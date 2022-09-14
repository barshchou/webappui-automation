import testData from "../../../../fixtures/not_full_reports/property/commercial_units/QA-4566.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import { DataCollections, Property } from "../../../../actions";
import Enums from "../../../../enums/enums";

describe("Verify the functionality of the Frontage radio button", 
    { tags: [ "@property", "@commercial_units" ] }, () => {
        
        beforeEach("Login, create report", () => {
            cy.stepInfo(`Preconditions: The mixed report is created and several commercial units are added.`);
            createReport(testData.reportCreationData);
        });

        it("[QA-4566] ", () => {
            cy.stepInfo(`1. Proceed to the Property > Commercial Units page.`);
            _NavigationSection.navigateToSubjectPropertyData();
            DataCollections._SubjectPropertyData.enterNumberOfCommercialUnits(testData.numberOfCommercialUnits);
            _NavigationSection.navigateToCommercialUnits();
        
            cy.stepInfo(`2. Verify the Frontage contains the following radio buttons: Small, Medium, Large, Other.`);
            cy.contains("Frontage").should("exist");
            testData.useRadios.forEach(radio => {
                Property._CommercialUnits.clickRadioButtonByValueAndUnitIndex(testData.groupName, radio);
                if (radio === Enums.COMMERCIAL_UNITS_FRONTAGE_VALUES.other) {
                    Property._CommercialUnits.enterOtherValueByGroupName(testData.groupName, testData.otherValue);
                }
                Property._CommercialUnits.clickSaveContinueButton();
                _NavigationSection.verifyProgressBarNotExist();
                _NavigationSection.goBack();
                _NavigationSection.submitSaveChangesModal();
                cy.stepInfo(`4. Verify that each radio button can be selected and saved.`);
                Property._CommercialUnits.verifyRadioIsChecked(testData.groupName, radio);
            });
        });
    });