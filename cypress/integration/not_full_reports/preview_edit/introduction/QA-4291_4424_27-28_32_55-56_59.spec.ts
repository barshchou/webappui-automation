import { _NavigationSection } from '../../../../actions/base/index';
import { createReport } from '../../../../actions/base/baseTest.actions';
// eslint-disable-next-line max-len
import testData from "../../../../fixtures/not_full_reports/review_edit/introduction/QA-4291_4424_27-28_32_55-56_59.fixture";
import { PreviewEdit, Report } from '../../../../actions';
import mapKeysUtils from '../../../../utils/mapKeys.utils';

describe('[QA-4291_4424_27-28_32_55-56_59] Check the Introduction page',
    { tags: [ "@preview_edit", "@introduction" ] }, () => {

        before("Login, create report", () => {
            cy.stepInfo(`1. Create a report`);
            createReport(testData.reportCreationData);
        });

        it("Test body", () => {
            cy.stepInfo("2. Navigate to Report > Client and Edit Identification of the Client and Intended User Text");
            _NavigationSection.navigateToClientPage()
                .clickFormEditBtn(1)
                .enterFormCommentTextBox(testData.textBoxNames.identificationOfClient, testData.typeValue)
                .clickFormSaveBtn()
                .clickFormEditBtn()
                .enterFormCommentTextBox(testData.textBoxNames.intendedUser, testData.typeValue)
                .clickFormSaveBtn();
            // Need wait for changes to take place.
            cy.wait(1000);

            cy.stepInfo("3. Navigate to Report > Key Info and Edit Definition of Market Value");
            _NavigationSection.navigateToReportInformation();

            Report._KeyInfo.enterDefinitionMarketValue(testData.typeValue);
            cy.wait(1000);

            cy.stepInfo(`4. Navigate to Final > Assumptions and Conditions page and 
                Edit General Assumptions Discussion`);
            _NavigationSection.navigateToAssumptionsConditions()
                .clickFormEditBtn()
                .enterFormCommentTextBox(testData.textBoxNames.generalAssumptionsDiscussion, testData.typeValue)
                .clickFormSaveBtn();
            cy.wait(1000);

            cy.stepInfo("5. Navigate to Property > Property History and Edit Recent Sales History Discussion");
            _NavigationSection.navigateToPropertyHistory()
                .clickFormEditBtn()
                .enterFormCommentTextBox(testData.textBoxNames.recentSalesHistoryDiscussion, testData.typeValue)
                .clickFormSaveBtn();
            cy.wait(1000);

            cy.stepInfo("6. Navigate to Property > Property History and Edit Property Contract History Discussion");
            _NavigationSection.navigateToPropertyHistory()
                .clickFormEditBtn(1)
                .enterFormCommentTextBox(testData.textBoxNames.propertyContractHistoryDiscussion, testData.typeValue)
                .clickFormSaveBtn();
            cy.wait(1000);

            cy.stepInfo("7. Navigate to Income > Cap Rate Conclusion and Edit Purpose & Date of Value Discussion");
            _NavigationSection.navigateToCapRateConclusion()
                .clickFormEditBtn(0)
                .enterFormCommentTextBox(testData.textBoxNames.purposeDateOfValueDiscussion, testData.typeValue)
                .clickFormSaveBtn();
            cy.wait(1000);


            cy.stepInfo("8. Proceed to the Introduction page and verify that page exist");
            _NavigationSection.navigateToIntroduction()
                .verifyProgressBarNotExist()
                .Page.introduction.should("exist");

            cy.stepInfo("9. Verify 'Identification of the Client' exist and edited");
            PreviewEdit._Introduction.Page.SwitchEditBtn.click();

            testData.backLinkNames.forEach(name => {
                PreviewEdit._Introduction.Page.getChipModified(name).should("be.visible");
                PreviewEdit._Introduction.Page.formCommentTextBox(name).should("include.text", testData.typeValue);
                PreviewEdit._Introduction.Page.getBackLink(name)
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
