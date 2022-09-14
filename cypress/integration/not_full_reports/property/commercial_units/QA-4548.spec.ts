import testData from "../../../../fixtures/not_full_reports/property/commercial_units/QA-4548.fixture";
import { DataCollections, Property } from "../../../../actions";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";

describe("Verify the Modified label functionality",
    { tags: [ "@property", "@commercial_units" ] }, () => {

        beforeEach("Report creation and several commercial units addition", () => {
            createReport(testData.reportCreationData);
            _NavigationSection.navigateToSubjectPropertyData();
            DataCollections._SubjectPropertyData.enterNumberOfCommercialUnits(testData.numberOfCommercialUnits);
        });

        it("Test body", () => {

            cy.stepInfo("1. Click on the Edit button on the Property > Commercial Units.");
            _NavigationSection.navigateToCommercialUnits();
            Property._CommercialUnits.verifyThatPageIsOpened();
            Property._CommercialUnits.Page.modifiedLabel(false).should('not.exist');
            Property._CommercialUnits.activateTextAreaInput(
                Property._CommercialUnits.Page.commercialUnitSFDiscussionTextArea);

            cy.stepInfo("2. Edit comment and click on the Save button.");
            Property._CommercialUnits.Page.commercialUnitSFDiscussionTextArea.clear().type(testData.text);
            Property._CommercialUnits.clickSaveButton()
                .verifyProgressBarNotExist();

            cy.stepInfo("3.  Verify that the Modified label appears after saving changes made to commentary.");
            Property._CommercialUnits.Page.modifiedLabel().should('exist');
        });
    });