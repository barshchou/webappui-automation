import testData from "../../../../fixtures/not_full_reports/property/commercial_units/QA-4543&44&47.fixture";
import { Property } from "../../../../actions";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import { Tag } from "../../../../utils/tags.utils";

describe("[QA-4543], [QA-4544], [QA-4547] Verify the buttons functionality on Property > Commercial Units page.",
    { tags: [ Tag.property, Tag.commercial_units ] }, () => {

        before("Report creation and several commercial units addition", () => {
            createReport(testData.reportCreationData);
            _NavigationSection.navigateToPropertySummary();
            Property._Summary.enterNumberOfCommercialUnits(testData.numberOfCommercialUnits);
        });

        it("Test body", () => {
            cy.stepInfo("1.[QA-4543] Verify that the Edit button is displayed on the Property > Commercial Units page.");
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
        
            cy.stepInfo("4.[QA-4544] Click on the Cancel button and verify that the form closes form without saving changes with no warning message.");
            Property._CommercialUnits.Page.commercialUnitSFDiscussionTextArea.clear().type(testData.text);
            Property._CommercialUnits.Page.formCancelButton(0).scrollIntoView().click();
            Property._CommercialUnits.Page.commercialUnitSFDiscussionText(testData.text).should('not.exist');
    
            cy.stepInfo("5.[QA-4547] Edit comment and click on the Save button.");
            Property._CommercialUnits.Page.formEditBtn(0).scrollIntoView().click();  
            Property._CommercialUnits.Page.commercialUnitSFDiscussionTextArea.clear().type(testData.text);
            Property._CommercialUnits.Page.formSaveBtn(0).first().click();

            cy.stepInfo("6. Verify that the changes from step 5 are saved.");
            Property._CommercialUnits.Page.commercialUnitSFDiscussionText(testData.text).should('exist');
           
            deleteReport(testData.reportCreationData.reportNumber);
            
        });
    });