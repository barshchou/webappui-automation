import { _NavigationSection } from '../../../../actions/base';
import { createReport } from '../../../../actions/base/baseTest.actions';
import testData from
    "../../../../fixtures/not_full_reports/review_edit/introduction/QA-4291_4424_27-28_32_55-56_59-60.fixture";
import { PreviewEdit, Property } from '../../../../actions';
import mapKeysUtils from '../../../../utils/mapKeys.utils';
import Enums from "../../../../enums/enums";

describe('[QA-4291_4424_27-28_32_55-56_59] Check the Introduction page',
    { tags: [ "@preview_edit", "@introduction" ] }, () => {
        testData.testsFixture.forEach(data => {
            it(`${data.testName}`, () => {
                cy.stepInfo("1. Create a report");
                createReport(testData.reportCreationData);
            
                cy.stepInfo("2. Proceed to the Introduction page and verify that page exist");
                _NavigationSection.navigateToIntroduction()
                    .verifyProgressBarNotExist()
                    .Page.introduction.should("exist");

                cy.stepInfo("3. Verify 'edit' button exist");
                PreviewEdit._Introduction.Page.SwitchEditBtn.click();

                cy.stepInfo("4. Go to back page and verify that opened page");
                if (data.backLinkName === Enums.INTRODUCTION_TEXTBOX_NAMES.marketingTime) {
                    PreviewEdit._Introduction.Page.getBackLink(data.backLinkName).should("not.exist");
                    _NavigationSection.navigateToPropertyMarket();
                    Property._Market.checkIncludeMarketingTimeDescription();
                    _NavigationSection.navigateToIntroduction();
                    PreviewEdit._Introduction.Page.SwitchEditBtn.click();
                }
                PreviewEdit._Introduction.goToBackLink(data.backLinkName, data.pageName);

                cy.stepInfo("5. Enter value in comment");
                PreviewEdit._Introduction.enterFormCommentTextBox(data.textBoxName, testData.typeValue);

                cy.stepInfo("6. Proceed to the Introduction page and verify that page exist");
                _NavigationSection.navigateToIntroduction()
                    .verifyProgressBarNotExist()
                    .Page.introduction.should("exist");

                cy.stepInfo("7. Verify 'edit' button exist");
                PreviewEdit._Introduction.Page.SwitchEditBtn.click();

                cy.stepInfo("8. Verify Modified textBox");
                PreviewEdit._Introduction.Page
                    .getChipModified(data.backLinkName).should("be.visible");
                PreviewEdit._Introduction.Page
                    .formCommentTextBox(data.backLinkName)
                    .should("include.text", testData.typeValue);
                PreviewEdit._Introduction.Page.getBackLink(data.backLinkName)
                    .should("be.visible")
                    .invoke("attr", "href")
                    .then(href => {
                        cy._mapGet(mapKeysUtils.reportId).then(val => {
                            expect(href).includes(val);
                        });
                    });
            });
        });
    });
