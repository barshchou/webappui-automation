import testData from "../../../../fixtures/not_full_reports/property/commercial_units/QA-4543.fixture";
import { Property } from "../../../../actions";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import { Tag } from "../../../../utils/tags.utils";

describe("Verify the Edit button functionality",
    { tags: [ Tag.property, Tag.commercial_units ] }, () => {

        before("Report creation and several commercial units addition", () => {
            createReport(testData.reportCreationData);
            _NavigationSection.navigateToPropertySummary();
            Property._Summary.enterNumberOfCommercialUnits(testData.numberOfCommercialUnits);
        });

        it("Test body", () => {

            cy.stepInfo("1. Verify that the Edit button is displayed on the Property > Commercial Units page.");
            _NavigationSection.navigateToCommercialUnits();
            Property._CommercialUnits.verifyThatPageIsOpened();
            Property._CommercialUnits.Page.formEditBtn(0).should('exist');

            cy.stepInfo("2. Click on the Edit button.");
            Property._CommercialUnits.Page.formEditBtn(0).scrollIntoView().click();

            cy.stepInfo("3. Verify that the commentary form opens and buttons Cancel, Revert to Original and Save are displayed.");
            Property._CommercialUnits.Page.commercialUnitSFDiscussionTextAreaOpened.should('exist');
            Property._CommercialUnits.Page.formCancelButton(0).should('exist');
            Property._CommercialUnits.Page.formRevertToOriginalBtn(0).should('exist');
            Property._CommercialUnits.Page.formSaveBtn(0).should('exist');

            deleteReport(testData.reportCreationData.reportNumber);
        });
    });