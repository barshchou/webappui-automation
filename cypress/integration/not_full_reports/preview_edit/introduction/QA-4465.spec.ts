import testData from "../../../../fixtures/not_full_reports/preview_edit/introduction/QA-4465.fixture";
import { _BaseTest } from "../../../../actions/base";
import { Report, PreviewEdit } from "../../../../actions";
import { _NavigationSection } from "../../../../actions/base";
import { normalizeText } from "../../../../../utils/string.utils";
import mapKeysUtils from "../../../../utils/mapKeys.utils";
import routesUtils from "../../../../utils/routes.utils";

const { createReport } = _BaseTest;

describe('Verify the "Property Rights Appraised" commentary on the Introduction page', 
    { tags:[ "@preview_edit", "@introduction" ] }, () => {
        
        beforeEach("Login, create report", () => {
            cy.stepInfo(`1. Create a report`);
            createReport(testData.reportCreationData);

            cy.stepInfo(`2. Proceed to the Introduction page`);
            _NavigationSection.navigateToPropertySummary()
                .navigateToReportKeyInfo();
        });

        it("Test body", () => {
            cy.stepInfo(`"Property Rights Appraised" commentary is displayed that mirrors that found in 
            Report > Key Info page:
            - edits made to the commentary on this page affect the original, and vice versa
            - a back link is displayed, when clicked, 
            takes the user back to the original location of this component on the Report > Key Info page`);
            testData.textToVerify.forEach(value => {
                Report._KeyInfo.enterFormCommentTextBox(testData.backLinkName, value)
                    .Page.formCommentTextBox(testData.backLinkName).invoke("text").then(text => {
                        cy.wrap(normalizeText(text)).as(testData.aliases.PropertyRightsAppraised);
                    });
                _NavigationSection.navigateToIntroduction()
                    .verifyProgressBarNotExist();
    
                PreviewEdit._Introduction.Page.getTextFromTextArea(testData.backLinkName)
                    .invoke("text")
                    .then(text => {
                        cy.wrap(normalizeText(text)).as(testData.aliases.PreviewEditText);
                    });

                PreviewEdit._Introduction.Actions.extractAlias(testData.aliases.PropertyRightsAppraised)
                    .then(propertyCommentary => {
                        PreviewEdit._Introduction.Actions.extractAlias(testData.aliases.PreviewEditText)
                            .then(previewCommentary => {
                                expect(propertyCommentary).to.equal(previewCommentary);
                            });
                    });  
    
                PreviewEdit._Introduction.Page.SwitchEditBtn.click();
            
                PreviewEdit._Introduction.Page.getChipModified(testData.backLinkName).should("be.visible");
                PreviewEdit._Introduction.Page.getBackLink(testData.backLinkName)
                    .should("be.visible")
                    .invoke("attr", "href")
                    .then(href => {
                        cy._mapGet(mapKeysUtils.reportId).then(val => {
                            expect(href).includes(val);
                        });
                    });
                PreviewEdit._Introduction.Page.getBackLink(testData.backLinkName).click();
                _NavigationSection.submitSaveChangesModal()
                    .verifyProgressBarNotExist()
                    .waitForUrl(routesUtils.keyInfo);
            });
        });
    });
