import { loginAction } from './../../../../actions/base/baseTest.actions';
import { _HomePage, _NavigationSection } from '../../../../actions/base/index';
import { createReport } from '../../../../actions/base/baseTest.actions';
import testData from "../../../../fixtures/not_full_reports/review_edit/introduction/QA-4429.fixture";
import { Final, PreviewEdit } from '../../../../actions';
import mapKeysUtils from '../../../../utils/mapKeys.utils';

describe('[QA-4429] Check the Introduction page',
    { tags: [ "@preview_edit", "@introduction" ] }, () => {

        it("Test for NYC properties", () => {
            cy.stepInfo("1. Create a report");
            createReport(testData.reportNYCCreationData);

            cy.stepInfo("2. Navigate to Report > Client and Edit Identification of the Client and Intended User Text");
            _NavigationSection.navigateToSourceInformation()
                .Page.formEditBtn().click();

            Final._SourceInformation.enterDataSourcesDescriptionExportTextBox(testData.typeValue)
                .Page.formSaveBtn().click();
            // Need wait for changes to take place.
            cy.wait(1000);

            cy.stepInfo("3. Navigate to PreviewAndEdit > Introduction and verify exist and modified");
            PreviewEdit._Introduction.Page.SwitchEditBtn.click();

            PreviewEdit._Introduction.Page.getChipModified(testData.backLinkNames).should("be.visible");
            PreviewEdit._Introduction.Page.getTextFromTextArea(testData.backLinkNames)
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
            cy.stepInfo("1. Create a report");
            loginAction();
            _HomePage.createReport(testData.reportOtherCreationData);

            cy.stepInfo("2. Navigate to Report > Client and Edit Identification of the Client and Intended User Text");
            _NavigationSection.navigateToSourceInformation()
                .Page.formEditBtn().click();

            Final._SourceInformation.enterDataSourcesDescriptionExportTextBox(testData.typeValue)
                .Page.formSaveBtn().click();
            // Need wait for changes to take place.
            cy.wait(1000);

            cy.stepInfo("3. Navigate to PreviewAndEdit > Introduction and verify exist and modified");
            PreviewEdit._Introduction.Page.SwitchEditBtn.click();

            PreviewEdit._Introduction.Page.getChipModified(testData.backLinkNames).should("be.visible");
            PreviewEdit._Introduction.Page.getTextFromTextArea(testData.backLinkNames)
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
