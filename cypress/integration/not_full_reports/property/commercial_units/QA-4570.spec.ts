import testData from "../../../../fixtures/not_full_reports/property/commercial_units/QA-4570.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import { Property } from "../../../../actions";

describe("Verify the Back button functionality on the Commercial Units page",
    { tags:[ "@property", "@commercial_units" ] }, () => {
        beforeEach("Login, create report", () => {
            createReport(testData.reportCreationData);
        });

        it("[QA-4570]", () => {
            cy.stepInfo(`1. The < Back button is displayed on the Commercial Units page.`);
            _NavigationSection.navigateToPropertySummary();
            Property._Summary.enterNumberOfCommercialUnits(testData.numberOfCommercialUnits);

            cy.stepInfo(`2. Click on the Back button and verify the user is redirected 
            to the previous page (Property > Site Description).`);
            _NavigationSection.navigateToCommercialUnits();
            Property._CommercialUnits.clickBackButton();
            _NavigationSection.submitSaveChangesModal();
            Property._SiteDescription.Page.siteDescriptionTitle.should("be.visible");
        });
    });
