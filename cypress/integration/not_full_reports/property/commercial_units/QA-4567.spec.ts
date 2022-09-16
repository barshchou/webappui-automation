import testData from "../../../../fixtures/not_full_reports/property/commercial_units/QA-4567.fixture";
import { DataCollections, Property } from "../../../../actions";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";

describe("Verify the Save button functionality on the Commercial Units page",
    { tags: [ "@property", "@commercial_units" ] }, () => {
        beforeEach("Report creation and several commercial units addition", () => {
            createReport(testData.reportCreationData);
            _NavigationSection.navigateToSubjectPropertyData();
            DataCollections._SubjectPropertyData.enterNumberOfCommercialUnits(testData.numberOfCommercialUnits);
        });

        it("Test body", () => {
            cy.stepInfo(`1. Verify the Save button is displayed on the Commercial Units page`);
            _NavigationSection.navigateToCommercialUnits();
            Property._CommercialUnits.verifyThatPageIsOpened()
                .Page.SaveBtn.should('exist');

            cy.stepInfo(`2. Fill in the editable fields with values or/and check check-boxes 
            or/and click the radio button and click on the Save button.`);
            Property._CommercialUnits.enterListUnitSF(testData.squareFeetList, testData.numberOfCommercialUnits);
            testData.groupsNamesAndValues.forEach(groupNameElement => {
                let groupName = groupNameElement.groupName;
                let value = groupNameElement.value;
                Property._CommercialUnits.clickRadioButtonByValueAndUnitIndex(groupName, value);
                if (value === "other") {
                    Property._CommercialUnits.enterOtherValueByGroupName(groupName, testData.otherValue);
                }
            });
            Property._CommercialUnits.clickSaveButton()
                .verifyProgressBarNotExist();

            cy.stepInfo(`3. Refresh the page / or re-enter the page and verify that 
            the changes from step 2 are still applied.`);
            cy.reload();
            Property._CommercialUnits.verifyUnitSFInscribedByUnitIndex(testData.squareFeetList, 
                testData.numberOfCommercialUnits);
            testData.groupsNamesAndValues.forEach(groupNameElement => {
                let groupName = groupNameElement.groupName;
                let value = groupNameElement.value;
                Property._CommercialUnits.verifyRadioIsChecked(groupName, value);
                if (value === "other") {
                    Property._CommercialUnits.verifyOtherValueByGroupName(groupName, testData.otherValue);
                }
            });
        });
    });