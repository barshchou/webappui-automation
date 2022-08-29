import testData from "../../../../fixtures/not_full_reports/property/commercial_units/QA-4566.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import NavigationSection from "../../../../actions/base/navigationSection.actions";
import Property from "../../../../actions/property/property.manager";
import Enums from "../../../../enums/enums";

describe("Verify the functionality of the Frontage radio button", 
    { tags: [ "@property", "@commercial_units" ] }, () => {
        
        beforeEach("Login, create report", () => {
            cy.stepInfo(`Preconditions: The mixed report is created and several commercial units are added.`);
            createReport(testData.reportCreationData);
        });

        it("Test body", () => {
            cy.stepInfo(`1. Proceed to the Property > Commercial Units page.`);
            NavigationSection.navigateToPropertySummary();
            Property.Summary.enterNumberOfCommercialUnits(testData.numberOfCommercialUnits);
            NavigationSection.navigateToCommercialUnits();
        
            cy.stepInfo(`2. Verify the Frontage contains the following radio buttons: Small, Medium, Large, Other.`);
            cy.contains("Frontage").should("exist");
            testData.useRadios.forEach((radio, index) => {
                Property.CommercialUnits.clickRadioButtonByValueAndUnitIndex(testData.groupName, radio);
                if (radio === Enums.COMMERCIAL_UNITS_FRONTAGE_VALUES.other) {
                    Property.CommercialUnits.enterOtherValueByGroupName(testData.groupName, testData.otherValue);
                }
                Property.CommercialUnits.clickSaveContinueButton();
                NavigationSection.verifyProgressBarNotExist();
                if (index === 0) {
                    NavigationSection.goBackWithSave();
                } else {
                    NavigationSection.goBack();
                }
                cy.stepInfo(`4. Verify that each radio button can be selected and saved.`);
                Property.CommercialUnits.verifyRadioIsChecked(testData.groupName, radio);
            });
        });
    });