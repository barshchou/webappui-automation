import { _NavigationSection } from '../../../../actions/base';
import { createReport } from '../../../../actions/base/baseTest.actions';
import testData from
    "../../../../fixtures/not_full_reports/review_edit/introduction/QA-4466.fixture";
import { PreviewEdit, Property } from '../../../../actions';
import mapKeysUtils from '../../../../utils/mapKeys.utils';

describe('[QA-4291_4424_27-28_32_55-56_59] Check the Introduction page',
    { tags: [ "@preview_edit", "@introduction" ] }, () => {
        beforeEach("Login, create report", () => {
            cy.stepInfo(`1. Create a report`);
            createReport(testData.reportCreationData);
        });

        it("[QA-4466]", () => {
            cy.stepInfo(`2. Navigate to Property > Market, check Include Marketing Time in the report
                        and edit Marketing Time Description`);
            _NavigationSection.navigateToPropertyMarket();

            Property._Market.checkIncludeMarketingTimeDescription()
                .enterFormCommentTextBox(testData.textBoxName, testData.typeValue);


            cy.stepInfo("3. Proceed to the Introduction page and verify that page exist");
            _NavigationSection.navigateToIntroduction()
                .verifyProgressBarNotExist()
                .Page.introduction.should("exist");

            cy.stepInfo("4. Verify 'edit' button exist");
            PreviewEdit._Introduction.Page.SwitchEditBtn.click();

            cy.stepInfo("5. Verify Modified textBox");
            PreviewEdit._Introduction.Page
                .getChipModified(testData.backLinkName).should("be.visible");
            PreviewEdit._Introduction.Page
                .formCommentTextBox(testData.backLinkName)
                .should("include.text", testData.typeValue);
            PreviewEdit._Introduction.Page.getBackLink(testData.backLinkName)
                .should("be.visible")
                .invoke("attr", "href")
                .then(href => {
                    cy._mapGet(mapKeysUtils.reportId).then(val => {
                        expect(href).includes(val);
                    });
                });

            cy.stepInfo("6. Go to back page and verify that opened page");
            PreviewEdit._Introduction.goToBackLink(
                testData.backLinkName, testData.pageName);
        });
    });
