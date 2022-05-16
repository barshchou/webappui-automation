import testData from "../../../../fixtures/not_full_reports/property/commercial_units/QA-4544.fixture";
import { Property } from "../../../../actions";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import { Tag } from "../../../../utils/tags.utils";

describe("Verify the Cancel button functionality",
    { tags: [ Tag.property, Tag.commercial_units ] }, () => {

        before("Report creation and several commercial units addition", () => {
            createReport(testData.reportCreationData);
            _NavigationSection.navigateToPropertySummary();
            Property._Summary.enterNumberOfCommercialUnits(testData.numberOfCommercialUnits);
        });

        it("Test body", () => {

            cy.stepInfo("1. Click on the Edit button on the Property > Commercial Units page.");
            _NavigationSection.navigateToCommercialUnits();
            Property._CommercialUnits.verifyThatPageIsOpened();
            Property._CommercialUnits.Page.formEditBtn(0).scrollIntoView().click();

            cy.stepInfo("2. Verify that the Cancel button is displayed instead of the Edit button.");
            Property._CommercialUnits.Page.formCancelButton(0).should('exist');
            
            cy.stepInfo("3. Click on the Cancel button and verify that the form closes form without saving changes with no warning message.");
            Property._CommercialUnits.Page.commercialUnitSFDiscussionTextArea.clear().type(testData.text);
            Property._CommercialUnits.Page.formCancelButton(0).scrollIntoView().click();
            Property._CommercialUnits.Page.commercialUnitSFDiscussionText(testData.text).should('not.exist');

            deleteReport(testData.reportCreationData.reportNumber);
        });
    });