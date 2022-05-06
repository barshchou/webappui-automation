import testData from "../../../../fixtures/not_full_reports/property/commercial_units/QA-4555.fixture";
import {createReport, deleteReport} from "../../../../actions/base/baseTest.actions";
import {_NavigationSection} from "../../../../actions/base";
import {Property} from "../../../../actions";

describe("Verify the functionality of the Commercial Unit button", () => {
    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        cy.stepInfo("1. Proceed to the Property > Commercial Units page.");
        _NavigationSection.navigateToCommercialUnits();

        testData.arrayValuesAndGroup.forEach(item => {
            Property._CommercialUnits.clickRadioButtonByValueAndUnitIndex(item.group, item.value);
            Property._CommercialUnits.verifyProgressBarNotExist();
            Property._CommercialUnits.verifyRadioIsChecked(item.group, item.value);
        });
        
        cy.stepInfo("2. Verify that the No. of Commercial Unit button depends on No. of Commercial Units on the Property Summary page ");
        _NavigationSection.navigateToPropertySummary();

        cy.stepInfo("3. Verify that each Commercial Unit # button can be selected and it’s underlined.");
        _NavigationSection.navigateToCommercialUnits();

        testData.arrayValuesAndGroup.forEach(item => {
            Property._CommercialUnits.verifyRadioIsChecked(item.group, item.value);
        });

        deleteReport(testData.reportCreationData.reportNumber);

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

        cy.stepInfo("5. Click on the No button and verify that the changes are NOT saved on the Commercial Units page.");
        _NavigationSection.clickCommercialUnits();

        testData.arrayValuesAndGroup.forEach(item => {
            Property._CommercialUnits.verifyRadioIsNotChecked(item.group, item.value);
        });
        
        deleteReport(testData.reportCreationData.reportNumber);
    });
});