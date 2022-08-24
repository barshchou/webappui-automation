import { Property } from "../../../../actions";
import { _NavigationSection } from "../../../../actions/base";
import { createReport } from "../../../../actions/base/baseTest.actions";
import testData from '../../../../fixtures/not_full_reports/property/amenities/QA-4626-64.fixture';

describe("Verify the display of the Amenities page", { tags:[ "@property", "@amenities" ] }, () => {
    beforeEach("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("[QA-4662-64]", () => {
        cy.stepInfo("1. Proceed to the Property > Amenities page.");
        _NavigationSection.navigateToPropertyAmenities();

        cy.stepInfo("2. Verify the following elements are displayed on the page by default");
        testData.allCheckboxes.forEach(name => {
            Property._Amenities.Page.getElementCheckbox(name).should("exist");
        });

        cy.stepInfo("3. Check The subject property has no building amenities and verify not exist checkboxes");
        Property._Amenities.checkHasNoBuildingAmenities();
        testData.buildingCheckboxes.forEach(name => {
            Property._Amenities.Page.getElementCheckbox(name).should("not.exist");
        });

        cy.stepInfo("4. Check The subject property has no unit amenities and verify not exist checkboxes");
        Property._Amenities.checkHasNoUnitAmenities();
        testData.unitCheckboxes.forEach(name => {
            Property._Amenities.Page.getElementCheckbox(name).should("not.exist");
        });
    });
});