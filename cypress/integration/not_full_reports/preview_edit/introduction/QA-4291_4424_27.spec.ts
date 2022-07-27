import { _NavigationSection } from '../../../../actions/base/index';
import { createReport } from '../../../../actions/base/baseTest.actions';
import testData from "../../../../fixtures/not_full_reports/review_edit/introduction/QA-4291_4424_27.fixture";
import { PreviewEdit, Report } from '../../../../actions';
import mapKeysUtils from '../../../../utils/mapKeys.utils';

describe('[QA-4291_4424_27] Check the Introduction page',
    { tags: [ "@preview_edit", "@introduction" ] }, () => {

        before("Login, create report", () => {
            cy.stepInfo(`1. Create a report`);
            createReport(testData.reportCreationData);
        });

        it("Test body", () => {
            cy.stepInfo("2. Navigate to Report > Client and Edit Identification of the Client");
            _NavigationSection.navigateToClientPage()
                .Page.formEditBtn(1).click();

            Report._Client.enterIdentificationOfTheClientTextBox(testData.typeValue)
                .Page.formSaveBtn().click();
            Report._Client.Page.formEditBtn().click();
            Report._Client.enterIntendedUserTextBox(testData.typeValue)
                .Page.formSaveBtn().click();
            // Need wait for changes to take place.
            cy.wait(1000)


            cy.stepInfo("3. Proceed to the Introduction page and verify that page exist");
            _NavigationSection.navigateToIntroduction()
                .verifyProgressBarNotExist()
                .Page.introduction.should("exist");

            cy.stepInfo("4. Verify 'Identification of the Client' exist and edited");
            PreviewEdit._Introduction.Page.SwitchEditBtn.click();

            testData.backLinkNames.forEach(name => {
                PreviewEdit._Introduction.Page.getChipModified(name).should("be.visible");
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
