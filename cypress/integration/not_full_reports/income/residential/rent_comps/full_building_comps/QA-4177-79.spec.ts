import testData from "../../../../../../fixtures/not_full_reports/income/residential/rent_comps/full_building_comps/QA-4177-79.fixture";
import { createReport, deleteReport } from "../../../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../../../actions/base";
import { Income } from "../../../../../../actions";
import { isProdEnv } from "../../../../../../../utils/env.utils";

/**
 * On prod environment you cannot test editing of any comparables, so this test cannot be run on PROD env
 */
const conditionalDescribe = isProdEnv() ? describe.skip : describe;

conditionalDescribe("Base Itemized Unit Info table tests", () => {

    before("Create report, navigate to unit mix", () => {
       createReport(testData.reportCreationData);
       _NavigationSection.navigateToRentComps();
       Income._Residential.RentComps.BaseActions.changeToBuildingSearch()
           .clickAddRemoveBuildingCompByAddress(testData.compAddress)
           .clickEditBuildingCompButtonByAddress(testData.compAddress);
       _NavigationSection.clickYesIfExist();
       Income._Residential.RentComps.FullBuildingComps.UnitMix.openPage();
       cy.saveLocalStorage();
    });

    beforeEach(() => {
        cy.restoreLocalStorage();
    });

    it("[QA-4177] The default state of the Unit Mix page", () => {
        cy.contains("h6", "Itemized Unit Info").should("exist");
        Income._Residential.RentComps.FullBuildingComps.UnitMix.Page.importCsvButton.should("exist");
        cy.contains("th", "Include").should("exist");
        cy.contains("th", "#").should("exist");
        cy.contains("th", "# Unit").should("exist");
        cy.contains("th", "# Bedrooms").should("exist");
        cy.contains("th", "# Bathrooms").should("exist");
        cy.contains("th", "# Rooms").should("exist");
        cy.contains("th", "Square Feet").should("exist");
        cy.contains("th", "Outdoor Space").should("exist");
        cy.contains("th", "Rent Type").should("exist");
        cy.contains("th", "Monthly Rent").should("exist");
        cy.contains("th", "Rent/Room").should("exist");
        cy.xpath("//*[.='Itemized Unit Info']//following::th[.='Remove'][1]").should("exist");
        Income._Residential.RentComps.FullBuildingComps.UnitMix.Page.isNotReportedSFCheckboxes.eq(0).should("exist");
        cy.contains("h6", "Unit Mix").should("exist");
        cy.contains("th", "Unit Group").should("exist");
        cy.contains("th", "Units").should("exist");
        cy.contains("th", "Avg Baths").should("exist");
        cy.contains("th", "Avg Rooms").should("exist");
        cy.contains("th", "Min Rent").should("exist");
        cy.contains("th", "Avg Rent").should("exist");
        cy.contains("th", "Max Rent").should("exist");
        cy.contains("th", "Avg Square Feet").should("exist");
        cy.contains("th", "Avg Rent/Room").should("exist");
        cy.contains("th", "Avg Rent/SF/Month").should("exist");
        cy.contains("th", "Avg Rent/SF/Year").should("exist");
        cy.xpath("//h6[.='Unit Mix']//following::th[.='Remove'][1]").should("exist");
        Income._Residential.RentComps.FullBuildingComps.UnitMix.Page.isEstimatedUnitMixSFAverageCheckbox.should("exist");
    });

    it("[QA-4178] Verify the # Residential Units text field on the Unit Mix page", () => {
        Income._Residential.RentComps.FullBuildingComps.UnitMix
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
        Income._Residential.RentComps.FullBuildingComps.UnitMix.verifyIncludeToggleDisabled()
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

    after(() => {
        deleteReport(testData.reportCreationData.reportNumber);
    });
});