import { _HomePage, _NavigationSection } from '../../../../actions/base';
import { createReport, loginAction } from '../../../../actions/base/baseTest.actions';
import testData from "../../../../fixtures/not_full_reports/review_edit/introduction/QA-4429.fixture";
import { Final, PreviewEdit } from '../../../../actions';
import mapKeysUtils from '../../../../utils/mapKeys.utils';

describe('[QA-4429] Check the Introduction page',
    { tags: [ "@preview_edit", "@introduction" ] }, () => {

        it("Test for NYC properties", () => {
            cy.stepInfo("1. Create a report");
            createReport(testData.nycReport);
    
            cy.stepInfo(`2. Navigate to Report > Client and edit Identification of the Client 
                            and Intended User Text`);
            _NavigationSection.navigateToSourceInformation();
    
            Final._SourceInformation.enterFormCommentTextBox(testData.backLinkNames, testData.typeValue);
    
            cy.stepInfo("3. Navigate to PreviewAndEdit > Introduction and verify exist and modified");
            _NavigationSection.navigateToIntroduction();
            PreviewEdit._Introduction.Page.SwitchEditBtn.click();
    
            PreviewEdit._Introduction.Page.getChipModified(testData.title).should("be.visible");
            PreviewEdit._Introduction.Page.getTextFromTextArea(testData.title)
                .should("include.text", testData.typeValue);
            PreviewEdit._Introduction.Page.getBackLink(testData.backLinkNames)
                .should("be.visible")
                .invoke("attr", "href")
                .then(href => {
                    cy._mapGet(mapKeysUtils.reportId).then(val => {
                        expect(href).includes(val);
                    });
                });
        });

        it("Test for Other properties", () => {
            cy.stepInfo("1. Login, create report");
            loginAction();
            _HomePage.createReport(testData.otherReport);
    
            cy.stepInfo(`2. Navigate to Report > Client and edit Identification of the Client 
                            and Intended User Text`);
            _NavigationSection.navigateToSourceInformation();
    
            Final._SourceInformation.enterFormCommentTextBox(testData.backLinkNames, testData.typeValue);
    
            cy.stepInfo("3. Navigate to PreviewAndEdit > Introduction and verify exist and modified");
            _NavigationSection.navigateToIntroduction();
            PreviewEdit._Introduction.Page.SwitchEditBtn.click();
    
            PreviewEdit._Introduction.Page.getChipModified(testData.title).should("be.visible");
            PreviewEdit._Introduction.Page.getTextFromTextArea(testData.title)
                .should("include.text", testData.typeValue);
            PreviewEdit._Introduction.Page.getBackLink(testData.backLinkNames)
                .should("be.visible")
                .invoke("attr", "href")
                .then(href => {
                    cy._mapGet(mapKeysUtils.reportId).then(val => {
                        expect(href).includes(val);
                    });
                });
        });
    });
