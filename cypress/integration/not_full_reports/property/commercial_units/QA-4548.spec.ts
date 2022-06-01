import testData from "../../../../fixtures/not_full_reports/property/commercial_units/QA-4548.fixture";
import { Property } from "../../../../actions";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";

describe("Verify the Modified label functionality",
    { tags: [ "@property", "@commercial_units" ] }, () => {

        before("Report creation and several commercial units addition", () => {
            createReport(testData.reportCreationData);
            _NavigationSection.navigateToPropertySummary();
            Property._Summary.enterNumberOfCommercialUnits(testData.numberOfCommercialUnits);
        });

        it("Test body", () => {

            cy.stepInfo("1. Click on the Edit button on the Property > Commercial Units.");
            _NavigationSection.navigateToCommercialUnits();
            Property._CommercialUnits.verifyThatPageIsOpened();
            Property._CommercialUnits.Page.modifiedLabel(false).should('not.exist');
            Property._CommercialUnits.Page.formEditBtn().scrollIntoView().click();

            cy.stepInfo("2. Edit comment and click on the Save button.");
            Property._CommercialUnits.Page.commercialUnitSFDiscussionTextArea.clear().type(testData.text);
            Property._CommercialUnits.Page.formSaveBtn().click();

            cy.stepInfo("3.  Verify that the Modified label appears after saving changes made to commentary.");
            Property._CommercialUnits.Page.modifiedLabel().should('exist');

            deleteReport(testData.reportCreationData.reportNumber);
        });
    });