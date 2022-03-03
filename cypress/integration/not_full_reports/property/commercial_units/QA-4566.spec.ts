import testData from "../../../../fixtures/not_full_reports/property/summary/QA-4566.fixture";
import {createReport, deleteReport} from "../../../../actions/base/baseTest.actions";
import NavigationSection from "../../../../actions/base/navigationSection.actions";
import Property from "../../../../actions/property/property.manager";

describe("Verify the functionality of the Frontage radio button", () => {
    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        NavigationSection.navigateToPropertySummary();
        Property.Summary.enterNumberOfCommercialUnits(testData.numberOfCommercialUnits);
        NavigationSection.navigateToCommercialUnits();
        cy.contains("Frontage").should("exist");
        testData.useRadios.forEach((radio, index) => {
            Property.CommercialUnits.clickRadioButtonByValueAndUnitIndex(testData.groupName, radio)
                .clickSaveContinueButton();
            NavigationSection.verifyProgressBarNotExist();
            if (index === 0) {
                NavigationSection.goBackWithSave();
            } else {
                NavigationSection.goBack();
            }
            Property.CommercialUnits.verifyRadioIsChecked(testData.groupName, radio);
        })
        deleteReport(testData.reportCreationData.reportNumber);
    })
})