import { Report } from '../../../../actions';
import testData from "../../../../fixtures/not_full_reports/report/client/QA-6538-40.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";

describe("Verify the functionality of the Add Additional Client", 
    { tags: [ "@report", "@client" ] }, () => {
        beforeEach("Login, create report", () => {
            createReport(testData.reportCreationData);

            cy.stepInfo("1. Navigate to the Report > Client page");
            _NavigationSection.navigateToClientPage();
        });

        it("[QA-6538]", () => {
            cy.stepInfo("2. Verify that the 'Add Additional Client' button is displayed and disabled");
            Report._Client.Page.addAdditionalClientBtn.should("be.disabled");

            cy.stepInfo(`3. Fill the Client field with any valid data (e.g. Andrew Winston) and 
                        verify Add Additional Client' button is still disabled`);
            Report._Client.enterClientName(testData.clientName)
                .Page.addAdditionalClientBtn.should("be.disabled");

            cy.stepInfo(`4. Fill the Client File Number field with any valid data (e.g. 8675309) and 
                verify Add Additional Client' button has become enabled`);
            Report._Client.enterClientFileNumber(testData.clientNumber)
                .Page.addAdditionalClientBtn.should("be.enabled");

            cy.stepInfo("5. Click on the 'Add Additional Client' three times button");
            for (let i = 0; i < 3; i++) {
                Report._Client.clickAddAdditionalClientBtn();
            }

            cy.stepInfo(`6. Verify the 'Client X', 'Client File Number' and 'NYCB Application Number' 
                        are added and displayed below the NYCB Application Number field from the first section`);
            for (let i = 0; i <= 3; i++) {
                Report._Client.verifyAdditionalClientAdded(i);
            }

            cy.stepInfo(`7. Verify 'Add Additional Client' button has become disabled 
                        and the text 'Max of four clients allowed' appears below the button.`);
            Report._Client.Page.addAdditionalClientBtn.should("be.disabled");
            Report._Client.Page.maxClientMessage.should("exist");
        });

        it("[QA-6539]", () => {
            cy.stepInfo(`2. Fill the 'Client' field and 'Client File Number' and click 'Add additional client`);
            Report._Client.enterClientName(testData.clientName)
                .enterClientFileNumber(testData.clientNumber)
                .clickAddAdditionalClientBtn();

            cy.stepInfo("3. Hover the remove 'X' button and verify the tooltip 'Remove' is displayed on hover");
            Report._Client.Page.getRemoveIcon().trigger("mouseover");
            Report._Client.verifyTooltipExistOrNot();

            cy.stepInfo(`4. Click on the remove 'X' button and verify the The 'Client X', 'Client File Number' and 
                        'NYCB Application Number' fields become disabled and the 'Undo' button is displayed for 
                        3 seconds before they disappear`);
            Report._Client.clickRemoveAdditionalClientBtn()
                .verifyAdditionalClientRemoved();
        });

        it("[QA-6540]", () => {
            cy.stepInfo(`2. Fill the 'Client' field and 'Client File Number' and click 'Add additional client`);
            Report._Client.enterClientName(testData.clientName)
                .enterClientFileNumber(testData.clientNumber)
                .clickAddAdditionalClientBtn();

            cy.stepInfo(`2. Click on the remove 'X' button and Click on the 'Undo' button. 
                        Verify fields enable or disable, remove icon visible or not`);
            Report._Client.clickRemoveAdditionalClientBtn()
                .verifyAdditionalClientEnableOrNot(1, false)
                .clickUndoBtn()
                .verifyAdditionalClientEnableOrNot()
                .Page.getRemoveIcon().should("exist");
        });
    });