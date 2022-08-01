import { _NavigationSection } from '../../../../actions/base';
import { createReport } from '../../../../actions/base/baseTest.actions';
// eslint-disable-next-line max-len
import testData from "../../../../fixtures/not_full_reports/review_edit/introduction/QA-4291_4424_27-28_32_55-56_59-60_66.fixture";
import { PreviewEdit, Report, Property } from '../../../../actions';
import mapKeysUtils from '../../../../utils/mapKeys.utils';

describe('[QA-4291_4424_27-28_32_55-56_59] Check the Introduction page',
    { tags: ["@preview_edit", "@introduction"] }, () => {

        beforeEach("Login, create report", () => {
            cy.stepInfo(`1. Create a report`);
            createReport(testData.reportCreationData);
        });

        it("[QA-4291]", () => {
            cy.stepInfo("2. Proceed to the Introduction page and verify that page exist");
            _NavigationSection.navigateToIntroduction()
                .verifyProgressBarNotExist()
                .Page.introduction.should("exist");

            cy.stepInfo("3. Verify 'Edit' button exist");
            PreviewEdit._Introduction.Page.SwitchEditBtn.click();
        });

        it("[QA-4424]", () => {
            cy.stepInfo("2. Navigate to Report > Client and Edit Identification of the Client and Intended User Text");
            _NavigationSection.navigateToClientPage()
                .clickFormEditBtn(1)
                .enterFormCommentTextBox(testData.textBoxNames.identificationOfClient, testData.typeValue)
                .clickFormSaveBtn();
            // Need wait for changes to take place.
            cy.wait(1000);

            cy.stepInfo("3. Proceed to the Introduction page and verify that page exist");
            _NavigationSection.navigateToIntroduction()
                .verifyProgressBarNotExist()
                .Page.introduction.should("exist");

            cy.stepInfo("4. Verify 'Edit' button exist");
            PreviewEdit._Introduction.Page.SwitchEditBtn.click();

            cy.stepInfo("5. Verify Modified textBox");
            PreviewEdit._Introduction.Page
                .getChipModified(testData.backLinkNames.identificationOfClient).should("be.visible");
            PreviewEdit._Introduction.Page
                .formCommentTextBox(testData.backLinkNames.identificationOfClient)
                .should("include.text", testData.typeValue);
            PreviewEdit._Introduction.Page.getBackLink(testData.backLinkNames.identificationOfClient)
                .should("be.visible")
                .invoke("attr", "href")
                .then(href => {
                    cy._mapGet(mapKeysUtils.reportId).then(val => {
                        expect(href).includes(val);
                    });
                });
        });

        it("[QA-4427]", () => {
            cy.stepInfo("2. Navigate to Report > Client and Edit Intended User");
            _NavigationSection.navigateToClientPage()
                .clickFormEditBtn()
                .enterFormCommentTextBox(testData.textBoxNames.intendedUser, testData.typeValue)
                .clickFormSaveBtn();
            // Need wait for changes to take place.
            cy.wait(1000);

            cy.stepInfo("3. Proceed to the Introduction page and verify that page exist");
            _NavigationSection.navigateToIntroduction()
                .verifyProgressBarNotExist()
                .Page.introduction.should("exist");

            cy.stepInfo("4. Verify 'Edit' button exist");
            PreviewEdit._Introduction.Page.SwitchEditBtn.click();

            cy.stepInfo("5. Verify Modified textBox");
            PreviewEdit._Introduction.Page
                .getChipModified(testData.backLinkNames.intendedUser).should("be.visible");
            PreviewEdit._Introduction.Page
                .formCommentTextBox(testData.backLinkNames.intendedUser)
                .should("include.text", testData.typeValue);
            PreviewEdit._Introduction.Page.getBackLink(testData.backLinkNames.intendedUser)
                .should("be.visible")
                .invoke("attr", "href")
                .then(href => {
                    cy._mapGet(mapKeysUtils.reportId).then(val => {
                        expect(href).includes(val);
                    });
                });
        });

        it("[QA-4428]", () => {
            cy.stepInfo("2. Navigate to Report > Key Info and Edit Definition of Market Value");
            _NavigationSection.navigateToReportInformation();

            Report._KeyInfo.enterDefinitionMarketValue(testData.typeValue);
            cy.wait(1000);

            cy.stepInfo("3. Proceed to the Introduction page and verify that page exist");
            _NavigationSection.navigateToIntroduction()
                .verifyProgressBarNotExist()
                .Page.introduction.should("exist");

            cy.stepInfo("4. Verify 'Edit' button exist");
            PreviewEdit._Introduction.Page.SwitchEditBtn.click();

            cy.stepInfo("5. Verify Modified textBox");
            PreviewEdit._Introduction.Page
                .getChipModified(testData.backLinkNames.definitionOfMarketValue).should("be.visible");
            PreviewEdit._Introduction.Page
                .formCommentTextBox(testData.backLinkNames.definitionOfMarketValue)
                .should("include.text", testData.typeValue);
            PreviewEdit._Introduction.Page.getBackLink(testData.backLinkNames.definitionOfMarketValue)
                .should("be.visible")
                .invoke("attr", "href")
                .then(href => {
                    cy._mapGet(mapKeysUtils.reportId).then(val => {
                        expect(href).includes(val);
                    });
                });
        });

        it("[QA-4432]", () => {
            cy.stepInfo(`2. Navigate to Final > Assumptions and Conditions page and 
                        Edit General Assumptions Discussion`);
            _NavigationSection.navigateToAssumptionsConditions()
                .clickFormEditBtn()
                .enterFormCommentTextBox(testData.textBoxNames.generalAssumptionsDiscussion, testData.typeValue)
                .clickFormSaveBtn();
            cy.wait(1000);

            cy.stepInfo("3. Proceed to the Introduction page and verify that page exist");
            _NavigationSection.navigateToIntroduction()
                .verifyProgressBarNotExist()
                .Page.introduction.should("exist");

            cy.stepInfo("4. Verify 'Edit' button exist");
            PreviewEdit._Introduction.Page.SwitchEditBtn.click();

            cy.stepInfo("5. Verify Modified textBox");
            PreviewEdit._Introduction.Page
                .getChipModified(testData.backLinkNames.generalAssumptionsDiscussion).should("be.visible");
            PreviewEdit._Introduction.Page
                .formCommentTextBox(testData.backLinkNames.generalAssumptionsDiscussion)
                .should("include.text", testData.typeValue);
            PreviewEdit._Introduction.Page.getBackLink(testData.backLinkNames.generalAssumptionsDiscussion)
                .should("be.visible")
                .invoke("attr", "href")
                .then(href => {
                    cy._mapGet(mapKeysUtils.reportId).then(val => {
                        expect(href).includes(val);
                    });
                });
        });

        it("[QA-4455]", () => {
            cy.stepInfo("2. Navigate to Property > Property History and Edit Recent Sales History Discussion");
            _NavigationSection.navigateToPropertyHistory()
                .clickFormEditBtn()
                .enterFormCommentTextBox(testData.textBoxNames.recentSalesHistoryDiscussion, testData.typeValue)
                .clickFormSaveBtn();
            cy.wait(1000);

            cy.stepInfo("3. Proceed to the Introduction page and verify that page exist");
            _NavigationSection.navigateToIntroduction()
                .verifyProgressBarNotExist()
                .Page.introduction.should("exist");

            cy.stepInfo("4. Verify 'Edit' button exist");
            PreviewEdit._Introduction.Page.SwitchEditBtn.click();

            cy.stepInfo("5. Verify Modified textBox");
            PreviewEdit._Introduction.Page
                .getChipModified(testData.backLinkNames.recentSalesHistoryDiscussion).should("be.visible");
            PreviewEdit._Introduction.Page
                .formCommentTextBox(testData.backLinkNames.recentSalesHistoryDiscussion)
                .should("include.text", testData.typeValue);
            PreviewEdit._Introduction.Page.getBackLink(testData.backLinkNames.recentSalesHistoryDiscussion)
                .should("be.visible")
                .invoke("attr", "href")
                .then(href => {
                    cy._mapGet(mapKeysUtils.reportId).then(val => {
                        expect(href).includes(val);
                    });
                });
        });

        it("[QA-4456]", () => {
            cy.stepInfo("2. Navigate to Property > Property History and Edit Property Contract History Discussion");
            _NavigationSection.navigateToPropertyHistory()
                .clickFormEditBtn(1)
                .enterFormCommentTextBox(testData.textBoxNames.propertyContractHistoryDiscussion, testData.typeValue)
                .clickFormSaveBtn();
            cy.wait(1000);

            cy.stepInfo("3. Proceed to the Introduction page and verify that page exist");
            _NavigationSection.navigateToIntroduction()
                .verifyProgressBarNotExist()
                .Page.introduction.should("exist");

            cy.stepInfo("4. Verify 'Edit' button exist");
            PreviewEdit._Introduction.Page.SwitchEditBtn.click();

            cy.stepInfo("5. Verify Modified textBox");
            PreviewEdit._Introduction.Page
                .getChipModified(testData.backLinkNames.propertyContractHistoryDiscussion).should("be.visible");
            PreviewEdit._Introduction.Page
                .formCommentTextBox(testData.backLinkNames.propertyContractHistoryDiscussion)
                .should("include.text", testData.typeValue);
            PreviewEdit._Introduction.Page.getBackLink(testData.backLinkNames.propertyContractHistoryDiscussion)
                .should("be.visible")
                .invoke("attr", "href")
                .then(href => {
                    cy._mapGet(mapKeysUtils.reportId).then(val => {
                        expect(href).includes(val);
                    });
                });
        });

        it("[QA-4459]", () => {
            cy.stepInfo("2. Navigate to Income > Cap Rate Conclusion and Edit Purpose & Date of Value Discussion");
            _NavigationSection.navigateToCapRateConclusion()
                .clickFormEditBtn()
                .enterFormCommentTextBox(testData.textBoxNames.purposeDateOfValueDiscussion, testData.typeValue)
                .clickFormSaveBtn();
            cy.wait(1000);

            cy.stepInfo("3. Proceed to the Introduction page and verify that page exist");
            _NavigationSection.navigateToIntroduction()
                .verifyProgressBarNotExist()
                .Page.introduction.should("exist");

            cy.stepInfo("4. Verify 'Edit' button exist");
            PreviewEdit._Introduction.Page.SwitchEditBtn.click();

            cy.stepInfo("5. Verify Modified textBox");
            PreviewEdit._Introduction.Page
                .getChipModified(testData.backLinkNames.purposeAndDateOfValue).should("be.visible");
            PreviewEdit._Introduction.Page
                .formCommentTextBox(testData.backLinkNames.purposeAndDateOfValue)
                .should("include.text", testData.typeValue);
            PreviewEdit._Introduction.Page.getBackLink(testData.backLinkNames.purposeAndDateOfValue)
                .should("be.visible")
                .invoke("attr", "href")
                .then(href => {
                    cy._mapGet(mapKeysUtils.reportId).then(val => {
                        expect(href).includes(val);
                    });
                });
        });

        it("[QA-4460]", () => {
            cy.stepInfo("2. Navigate to Property > Market and Edit Exposure Time Description");
            _NavigationSection.navigateToPropertyMarket()
                .clickFormEditBtn()
                .enterFormCommentTextBox(testData.textBoxNames.exposureTimeDescription, testData.typeValue)
                .clickFormSaveBtn();
            cy.wait(1000);

            cy.stepInfo("3. Proceed to the Introduction page and verify that page exist");
            _NavigationSection.navigateToIntroduction()
                .verifyProgressBarNotExist()
                .Page.introduction.should("exist");

            cy.stepInfo("4. Verify 'Edit' button exist");
            PreviewEdit._Introduction.Page.SwitchEditBtn.click();

            cy.stepInfo("5. Verify Modified textBox");
            PreviewEdit._Introduction.Page
                .getChipModified(testData.backLinkNames.exposureTime).should("be.visible");
            PreviewEdit._Introduction.Page
                .formCommentTextBox(testData.backLinkNames.exposureTime)
                .should("include.text", testData.typeValue);
            PreviewEdit._Introduction.Page.getBackLink(testData.backLinkNames.exposureTime)
                .should("be.visible")
                .invoke("attr", "href")
                .then(href => {
                    cy._mapGet(mapKeysUtils.reportId).then(val => {
                        expect(href).includes(val);
                    });
                });
        });

        it("[QA-4466]", () => {
            cy.stepInfo(`2. Navigate to Property > Market, check Include Marketing Time in the report
            and Edit Marketing Time Description`);
            _NavigationSection.navigateToPropertyMarket();

            Property._Market.checkIncludeMarketingTimeDescription()
                .clickFormEditBtn(1)
                .enterFormCommentTextBox(testData.textBoxNames.marketingTimeDescription, testData.typeValue)
                .clickFormSaveBtn();
            cy.wait(1000);

            cy.stepInfo("3. Proceed to the Introduction page and verify that page exist");
            _NavigationSection.navigateToIntroduction()
                .verifyProgressBarNotExist()
                .Page.introduction.should("exist");

            cy.stepInfo("4. Verify 'Edit' button exist");
            PreviewEdit._Introduction.Page.SwitchEditBtn.click();

            cy.stepInfo("5. Verify Modified textBox");
            PreviewEdit._Introduction.Page
                .getChipModified(testData.backLinkNames.marketingTime).should("be.visible");
            PreviewEdit._Introduction.Page
                .formCommentTextBox(testData.backLinkNames.marketingTime)
                .should("include.text", testData.typeValue);
            PreviewEdit._Introduction.Page.getBackLink(testData.backLinkNames.marketingTime)
                .should("be.visible")
                .invoke("attr", "href")
                .then(href => {
                    cy._mapGet(mapKeysUtils.reportId).then(val => {
                        expect(href).includes(val);
                    });
                });
            
            cy.stepInfo("6. Go to back page and verify that opened page");
            PreviewEdit._Introduction.goToBackLink(
                testData.marketGoToBackLink.whereTo, testData.marketGoToBackLink.pageName);
        });

        it("Go to Back link", () => {
            testData.backLinkAndPageNames.forEach((elem, index) => {
                cy.stepInfo("2. Proceed to the Introduction page and verify that page exist");
                _NavigationSection.navigateToIntroduction()
                    .verifyProgressBarNotExist()
                    .Page.introduction.should("exist");

                cy.stepInfo("3. Verify 'Edit' button exist");
                PreviewEdit._Introduction.Page.SwitchEditBtn.click();

                cy.stepInfo(`4.${index} Go to back page and verify that opened page`);
                PreviewEdit._Introduction.goToBackLink(elem.whereTo, elem.pageName);
            });
        });
    });
