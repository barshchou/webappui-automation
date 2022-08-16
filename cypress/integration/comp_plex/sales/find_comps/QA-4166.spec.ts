import { navigateToCompplex } from "../../../../actions/base/baseTest.actions";
import { CompPlex, Sales } from "../../../../actions";
import testData from "../../../../fixtures/comp_plex/sales/find_comps/QA-4166.fixture";

const propertyInfoData = testData._newCompPropertyInfoData;
const saleInfoData = testData._newCompSaleInfoData;

/*
 * ernst: skipped due to unpredictable behavior of `Generated Commentary field`
 * probably will be moved to Component tests later
 */
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
                    .PropertyInfo.setGBA(propertyInfoData.gba)
                    .setYearBuild(propertyInfoData.yearBuild)
                    .setFloors(propertyInfoData.floors)
                    .setSiteArea(propertyInfoData.siteArea)
                    .setResidentialUnits(propertyInfoData.residentialUnits)
                    .checkBuildingType(propertyInfoData.buildingType);
                Sales._FindComps.PropertyInfo.Page.newCompContinueButton.click();

                Sales._FindComps.SaleInfo
                    .setBuyerGrantee(saleInfoData.buyerGrantee)
                    .setSellerGrantor(saleInfoData.sellerGrantor)
                    .selectSaleDate();
                Sales._FindComps
                    .selectDropdownOptionNewComp(Sales._FindComps.Page.SaleStatusDropdown, saleInfoData.saleStatus);
                Sales._FindComps.SaleInfo
                    .setDeedSalePrice(saleInfoData.deedSalePrice);
                Sales._FindComps.PropertyInfo.Page.newCompContinueButton.click();

                Sales._FindComps.PropertyDesc.Page.generatedCommentaryTextArea.should("be.empty");
                testData._textValues.forEach(val => {
                    Sales._FindComps.PropertyDesc.enterGeneratedCommentary(val);
                    Sales._FindComps.PropertyDesc.Page.propertyDescRevertToGenerateBtn.click();
                });

                Sales._FindComps.PropertyDesc
                    .Page.generatedCommentaryTextArea.invoke("val", testData._textValues[0]);            
            });
    });