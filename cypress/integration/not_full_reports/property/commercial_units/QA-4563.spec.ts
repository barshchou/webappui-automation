import testData from "../../../../fixtures/not_full_reports/property/commercial_units/QA-4563.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import { DataCollections, Property } from "../../../../actions";

describe("Verify the functionality of the Grade checkbox", 
    { tags: [ "@property", "@commercial_units" ] }, () => {

        beforeEach("Login, create report", () => {
            createReport(testData.reportCreationData);
        });

        it("Test body", () => {
            _NavigationSection.navigateToSubjectPropertyData();
            DataCollections._SubjectPropertyData.enterNumberOfCommercialUnits(testData.numberOfCommercialUnits);
            _NavigationSection.navigateToCommercialUnits();
            testData.gradeValues.forEach(value => {
                Property._CommercialUnits.verifyRadioIsNotChecked(testData.groupName, value);
            });
            testData.gradeValues.forEach(value => {
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
                Property._CommercialUnits.clickCheckboxToUncheck(testData.groupName, value);
            });
            testData.gradeValues.forEach(value => {
                Property._CommercialUnits.clickRadioButtonByValueAndUnitIndex(testData.groupName, value);
            });
            testData.gradeValues.forEach(value => {
                Property._CommercialUnits.verifyRadioIsChecked(testData.groupName, value);
            });
        });
    });