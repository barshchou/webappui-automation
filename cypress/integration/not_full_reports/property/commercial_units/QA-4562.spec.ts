import testData from "../../../../fixtures/not_full_reports/property/commercial_units/QA-4562.fixture";
import { Property } from "../../../../actions";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import { Tag } from "../../../../utils/tags.utils";

describe("Verify the functionality of the Floor checkbox",
    { tags: [ Tag.property, Tag.commercial_units ] }, () => {

    before("Preconditions: The mixed report is created and several commercial units are added", () => {
        createReport(testData.reportCreationData);
        _NavigationSection.navigateToPropertySummary();
        Property._Summary.enterNumberOfCommercialUnits(testData.numberOfCommercialUnits);
    });

    it("Test body", () => {

        cy.stepInfo("1.  Proceed to the Property > Commercial Units page.");
       _NavigationSection.navigateToCommercialUnits();

        cy.stepInfo("2.  Verify the Floor contains the following radio buttons: Below Grade, Ground Floor, Upper Floor, Other and no value is selected by default");
        testData.floorValues.forEach(value => {
            Property._CommercialUnits.Page.getRadioButtonByValueAndUnitIndex(testData.groupName, value).should('exist');
            Property._CommercialUnits.verifyRadioIsNotChecked(testData.groupName, value);
        });

        cy.stepInfo("3.  Verify that each checkbox can be selected and saved + select the Other checkbox and verify the text field appears.");
        testData.floorValues.forEach(value => {
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

        cy.stepInfo("4.  Verify that all checkboxes can be selected at the same time.");
        testData.floorValues.forEach(value => {
            Property._CommercialUnits.clickRadioButtonByValueAndUnitIndex(testData.groupName, value);
            if (value === "other") {
                Property._CommercialUnits.enterOtherValueByGroupName(testData.groupName, testData.otherValue);
            }
        });
        Property._CommercialUnits.clickSaveButton()
            .verifyProgressBarNotExist();
        cy.reload();
        testData.floorValues.forEach(value => {
            Property._CommercialUnits.verifyRadioIsChecked(testData.groupName, value);
            if (value === "other") {
                Property._CommercialUnits.verifyOtherValueByGroupName(testData.groupName, testData.otherValue);
            }
        });

        deleteReport(testData.reportCreationData.reportNumber);
    });
});