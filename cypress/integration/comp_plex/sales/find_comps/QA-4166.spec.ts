import { navigateToCompplex } from "../../../../actions/base/baseTest.actions";
import { CompPlex, Sales } from "../../../../actions";
import testData from "../../../../fixtures/comp_plex/sales/find_comps/QA-4166.fixture";

// ernst: skipped due to unpredictable behavior of `Generated Commentary field`
describe.skip(
    `[Sales > Find Comps > Create Comp > Review Property Description form] Verify the Generated Commentary field`, 
    { tags:[ "@comp_plex_standalone" ] }, () => {

        beforeEach(() => {
            navigateToCompplex();
        });

        it(`[QA-4166] -> Check that following fields are disabled in the edit mode`,
            { tags: "@comp-plex-standalone" }, () => {
                CompPlex.Actions.createComp();
                
                Sales._FindComps.Actions.selectDropdownOptionNewComp(
                    Sales._FindComps.Page.comparableTypeDropdown, testData.comparableType);

                Sales._FindComps
                    .Actions.selectDropdownOptionNewComp(
                        Sales._FindComps.Page.conditionDropdown, testData.condition)
                    .PropertyInfo.setGBA("100").setYearBuild("2000")
                    .setFloors("2").setSiteArea("100").setResidentialUnits("2").checkBuildingType("elevator");
                Sales._FindComps.PropertyInfo.Page.newCompContinueButton.click();

                Sales._FindComps.SaleInfo
                    .setBuyerGrantee("Test and CO")
                    .setSellerGrantor("Test inc")
                    .selectSaleDate();
                Sales._FindComps
                    .selectDropdownOptionNewComp(Sales._FindComps.Page.SaleStatusDropdown, "Transaction");
                Sales._FindComps.SaleInfo
                    .setDeedSalePrice("10000");
                Sales._FindComps.PropertyInfo.Page.newCompContinueButton.click();

                Sales._FindComps.PropertyDesc.Page.generatedCommentaryTextArea.should("be.empty");
                testData._textValues.forEach(val => {
                    Sales._FindComps.PropertyDesc.enterGeneratedCommentary(val);
                    cy.get('[data-qa="revert-to-generated-btn"]').click();
                });

                Sales._FindComps.PropertyDesc
                    .Page.generatedCommentaryTextArea.invoke("val", testData._textValues[0]);            
            });
    });