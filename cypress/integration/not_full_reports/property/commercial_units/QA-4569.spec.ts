import testData from "../../../../fixtures/not_full_reports/property/commercial_units/QA-4569.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import { Property } from "../../../../actions";

describe("[QA-4569] Verify the Unsaved changes modal functionality on the Commercial Units page",
    { tags:[ "@property", "@commercial_units", "@fix" ] }, () => {
        beforeEach("Login, create report", () => {
            createReport(testData.reportCreationData);
        });

        it("Test body", () => {
            cy.stepInfo(`1. Fill in the editable fields with values or/and check check-boxes 
            or/and click the radio button and do NOT click on the Save button.`);
            _NavigationSection.navigateToCommercialUnits();

            testData.arrayValuesAndGroup.forEach(item => {
                Property._CommercialUnits.clickRadioButtonByValueAndUnitIndex(item.group, item.value);
                Property._CommercialUnits.verifyProgressBarNotExist();
                Property._CommercialUnits.verifyRadioIsChecked(item.group, item.value);
            });
        
            cy.stepInfo(`2. Try to proceed on any other page and verify that the Unsaved changes modal is displayed.`);
            _NavigationSection.navigateToPropertySummary();

            cy.stepInfo(`3. Click on the Yes button and verify that the changes are saved 
            on the Commercial Units page.`);
            _NavigationSection.navigateToCommercialUnits();

            testData.arrayValuesAndGroup.forEach(item => {
                Property._CommercialUnits.verifyRadioIsChecked(item.group, item.value);
            });

            cy.stepInfo(`4. Repeat step 1, try to proceed on any other page from the Commercial Units 
            page and verify that the Unsaved changes modal is displayed.`);
            createReport(testData.reportCreationData);
            _NavigationSection.navigateToCommercialUnits();

            testData.arrayValuesAndGroup.forEach(item => {
                Property._CommercialUnits.clickRadioButtonByValueAndUnitIndex(item.group, item.value);
                Property._CommercialUnits.verifyRadioIsChecked(item.group, item.value);
            });

            _NavigationSection.clickAmenitiesButton()
                .clickNoButton();

            cy.stepInfo(`5. Click on the No button and verify that the changes 
            are NOT saved on the Commercial Units page`);
            _NavigationSection.navigateToCommercialUnits();

            testData.arrayValuesAndGroup.forEach(item => {
                Property._CommercialUnits.verifyRadioIsNotChecked(item.group, item.value);
            });
        });
    });