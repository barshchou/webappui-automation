// eslint-disable-next-line max-len
import testData from "../../../../../../fixtures/not_full_reports/income/residential/rent_comps/full_building_comps/QA-4177-79_94_96_97.fixture";
import { createReport } from "../../../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../../../actions/base";
import { Income } from "../../../../../../actions";
import { conditionalDescribe } from "../../../../../checkIsProd.utils";

/**
 * On prod environment you cannot test editing of any comparables, so this test cannot be run on PROD env
 */

conditionalDescribe("Base Itemized Unit Info table tests", { tags: [ "@residential", "@rent_comps",
    "@full_building_comps", "@unit_mix" ] }, () => {

    before("Create report, navigate to unit mix", () => {
        createReport(testData.reportCreationData);
        _NavigationSection.navigateToRentComps();
        cy.stepInfo("1. Add comparable, open FullBuildingComps form, open UnitMix tab");
        Income._Residential.RentComps.BaseActions.changeToBuildingSearch()
            .clickAddRemoveBuildingCompByAddress(testData.compAddress)
            .clickEditBuildingCompButtonByAddress(testData.compAddress);
        _NavigationSection.submitSaveChangesModal();
        Income._Residential.RentComps.FullBuildingComps._UnitMix.openNavigationTab();
        cy.saveLocalStorage();
    });

    beforeEach(() => {
        cy.restoreLocalStorage();
    });

    it("[QA-4177] The default state of the Unit Mix page", () => {
        cy.contains("h6", "Itemized Unit Info").should("exist");
        Income._Residential.RentComps.FullBuildingComps._UnitMix.Page.importCsvButton.should("exist");
        testData.itemizedUnitInfoHeaders.forEach(header => {
            cy.contains("th", header).should("exist");
        });
        cy.xpath("//*[.='Itemized Unit Info']//following::th[.='Remove'][1]").should("exist");
        Income._Residential.RentComps.FullBuildingComps._UnitMix.Page.isNotReportedSFCheckboxes.eq(0).should("exist");
        cy.contains("h6", "Unit Mix").should("exist");
        testData.unitMixHeaders.forEach(header => {
            cy.contains("th", header).should("exist");
        });
        cy.xpath("//h6[.='Unit Mix']//following::th[.='Remove'][1]").should("exist");
        Income._Residential.RentComps.FullBuildingComps._UnitMix.Page.isEstimatedUnitMixSFAverageCheckbox
            .should("exist");
    });

    it("[QA-4178] Verify the # Residential Units text field on the Unit Mix page", () => {
        Income._Residential.RentComps.FullBuildingComps._UnitMix
            .verifyUnitNumberInputsQuantity(1)
            .clickMinusUnitButton()
            .enterResidentialUnitsNumber(testData.regularResNum)
            .verifyUnitNumberInputsQuantity(testData.regularResNum)
            .enterResidentialUnitsNumber(testData.otherRegularResNum)
            .verifyUnitNumberInputsQuantity(testData.otherRegularResNum)
            .enterResidentialUnitsNumber(testData.stringResNumb, false)
            .verifyUnitNumberInputsQuantity(testData.otherRegularResNum)
            .clickPlusUnitButton()
            .verifyUnitNumberInputsQuantity(testData.otherRegularResNum + 1)
            .clickMinusUnitButton()
            .verifyUnitNumberInputsQuantity(testData.otherRegularResNum);
    });

    it("[QA-4179] Verify the Include column on the Unit Mix page", () => {
        Income._Residential.RentComps.FullBuildingComps._UnitMix.verifyIncludeToggleDisabled()
            .enterBedroomsNumber(testData.bedrooms)
            .verifyIncludeToggleDisabled()
            .enterRoomsNumber(testData.rooms)
            .verifyIncludeToggleDisabled()
            .enterSquareFeet(testData.squareFeet)
            .verifyIncludeToggleDisabled()
            .enterMonthlyRent(testData.monthlyRent)
            .checkUncheckIncludeToggle()
            .checkUncheckIncludeToggle(true);
    });

    it("[QA-4194] Verify the # column on the Unit Mix page", () => {
        Income._Residential.RentComps.FullBuildingComps._UnitMix
            .enterResidentialUnitsNumber(testData.unitsQuantity4194);
        Income._Residential.RentComps.FullBuildingComps._UnitMix.Page.numberCells.each((cell, index) => {
            Income._Residential.RentComps.FullBuildingComps._UnitMix.verifyNumberCellValue(index + 1, index);
        });
    });

    it("[QA-4196] Verify the #Unit column on the Unit Mix page", () => {
        Income._Residential.RentComps.FullBuildingComps._UnitMix.enterUnitNumber(testData.unitNumber);
    });

    it("[QA-4197] Verify the #Bedrooms column on the Unit Mix page", () => {
        Income._Residential.RentComps.FullBuildingComps._UnitMix.enterBedroomsNumber(testData.decimalBedrooms)
            .enterBedroomsNumber(testData.stringBedrooms)
            .enterBedroomsNumber(testData.bedrooms);
    });
});