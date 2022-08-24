import { Property } from "../../../../actions";
import { _NavigationSection } from "../../../../actions/base";
import { createReport } from "../../../../actions/base/baseTest.actions";
import testData from '../../../../fixtures/not_full_reports/report/client/QA-4626.fixture';

describe("Verify the display of the Amenities page", { tags:[ "@property", "@amenities" ] }, () => {
    beforeEach("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("[QA-4662]", () => {
        cy.stepInfo("1. Proceed to the Property > Amenities page.");
        _NavigationSection.navigateToPropertyAmenities();

        cy.stepInfo("2. Verify the following elements are displayed on the page by default");
        testData.checkboxes.forEach(name => {
            Property._Amenities.Page.getElementCheckbox(name).should("exist");
        });
    });
});