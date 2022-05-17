/// <reference types="cypress-grep" />
import testData from "../../../../fixtures/not_full_reports/review_edit/introduction/QA-4465.fixture";
import { _BaseTest } from "../../../../actions/base";
import { Report, PreviewEdit } from "../../../../actions";
import { _NavigationSection } from "../../../../actions/base";
import { getReportId } from "../../../../../utils/intercept.utils";
import { Tag } from "../../../../utils/tags.utils";

const { createReport, deleteReport } = _BaseTest;

describe('Verify the "Property Rights Appraised" commentary on the Introduction page', 
    { tags:[ Tag.preview_edit, Tag.introduction ] }, () => {
        
    before("Login, create report", () => {
        cy.stepInfo(`1. Create a report`);
        createReport(testData.reportCreationData);

        cy.stepInfo(`2. Proceed to the Introduction page`);
    });

    it("Test body", () => {
        cy.stepInfo(`"Property Rights Appraised" commentary is displayed that mirrors that found in Report > Key Info page:
        - edits made to the commentary on this page affect the original, and vice versa
        - a backlink is displayed, when clicked, 
        takes the user back to the original location of this component on the Report > Key Info page`);
       
        testData.textToVerify.forEach(value => {
            Report._KeyInfo.enterPropertyRightsAppraisedComment(value).then(text => {
                cy.wrap(text).as(testData.aliases.PropertyRightsAppraised);
            });
            _NavigationSection.clickPreviewEditButton();
            _NavigationSection.Page.introduction.click();
            _NavigationSection.clickYesButton().verifyProgressBarNotExist();
    
            PreviewEdit._Introduction.Page.TextPropertyRightsAppraised
            .invoke("text")
            .then(text => {
                cy.wrap(text).as(testData.aliases.PreviewEditText);
            });

            PreviewEdit._Introduction.Actions.extractAlias(testData.aliases.PropertyRightsAppraised)
            .then(propertyCommentary => {
                PreviewEdit._Introduction.Actions.extractAlias(testData.aliases.PreviewEditText)
                .then(previewCommentary => {
                    expect(propertyCommentary).to.equal(previewCommentary);
                });
            });  
    
            PreviewEdit._Introduction.Page.SwitchEditBtn.click();
            
            PreviewEdit._Introduction.Page.ChipModified.should("be.visible");
            PreviewEdit._Introduction.Page.getBacklink(testData.backlinkName)
            .should("be.visible")
            .invoke("attr", "href")
            .then(href => {
                getReportId().then(val => {
                    expect(href).includes(val);
                });
            });
            PreviewEdit._Introduction.Page.getBacklink(testData.backlinkName).click();
            PreviewEdit._Introduction.Actions.clickYesButton().verifyProgressBarNotExist();
        });

        deleteReport(testData.reportCreationData.reportNumber);
    });
});