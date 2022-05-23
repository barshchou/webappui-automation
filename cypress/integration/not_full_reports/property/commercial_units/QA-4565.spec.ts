/// <reference types="cypress-grep" />
import testData from "../../../../fixtures/not_full_reports/property/commercial_units/QA-4565.fixture";
import { Base, Property } from "../../../../actions";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import { Tag } from "../../../../utils/tags.utils";

describe("Verify the functionality of the Ceiling Height radio button", 
    { tags: [ Tag.property, Tag.commercial_units ] }, () => {

    before("Login, create report", () => {

        cy.stepInfo(` 1. Report creation and several commercial units addition`);
        createReport(testData.reportCreationData);
        Base._NavigationSection.navigateToPropertySummary();
        Property._Summary.enterNumberOfCommercialUnits(testData.numberOfCommercialUnits);
    });

    it("Test body", () => {

        cy.stepInfo("2.  Proceed to the Property > Commercial Units page.");
        _NavigationSection.navigateToCommercialUnits();

        cy.stepInfo("3. Verify the Ceiling Height contains the following radio buttons: Low, Normal, High, Other and no value is selected");
        testData.ceilingHeightValues.forEach(value => {
            Property._CommercialUnits.Page.getRadioButtonByValueAndUnitIndex(testData.groupName, value).should('exist');
            Property._CommercialUnits.verifyRadioIsNotChecked(testData.groupName, value);
        });

        cy.stepInfo("4. Verify that each radio button can be selected and saved and verify text field appears with other value");
        testData.ceilingHeightValues.forEach(value => {
            Property._CommercialUnits.clickRadioButtonByValueAndUnitIndex(testData.groupName, value);
            if (value === "other") Property._CommercialUnits.enterOtherValueByGroupName(testData.groupName, testData.otherValue);
            Property._CommercialUnits.clickSaveButton()
                .verifyProgressBarNotExist();
            cy.reload();
            Property._CommercialUnits.verifyRadioIsChecked(testData.groupName, value);
            if (value === "other") Property._CommercialUnits.verifyOtherValueByGroupName(testData.groupName, testData.otherValue);
        });

        deleteReport(testData.reportCreationData.reportNumber);
    });
});