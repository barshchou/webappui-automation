import { Tag } from './../../../../utils/tags.utils';
import testData from "../../../../fixtures/not_full_reports/property/commercial_units/QA-4570.fixture";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import { Property } from "../../../../actions";

describe("[QA-4570] Verify the Back button functionality on the Commercial Units page",
    { tags:[ Tag.property, Tag.commercial_units ] }, () => {
    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        cy.stepInfo("1. The < Back button is displayed on the Commercial Units page.");
        _NavigationSection.navigateToPropertySummary();
        Property._Summary.enterNumberOfCommercialUnits(testData.numberOfCommercialUnits);

        cy.stepInfo("2. Click on the Back button and verify the user is redirected to the previous page (Property > Site Description).");
        _NavigationSection.navigateToCommercialUnits();
        Property._CommercialUnits.clickBackButton()
            .clickYesButton();
        Property._SiteDescription.Page.siteDescriptionTitle.should("be.visible");

        deleteReport(testData.reportCreationData.reportNumber);
    });
});