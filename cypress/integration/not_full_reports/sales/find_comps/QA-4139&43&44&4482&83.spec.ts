import testData from "../../../../fixtures/not_full_reports/sales/find_comps/QA-4139&43&44&4482&83.fixture";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import { Sales } from "../../../../actions";
import { Alias } from "../../../../utils/alias.utils";
import { conditionalDescribe } from "../../../checkIsProd.utils";
/*
    # Uladzislau.Samykou
    This spec is conditional, because tests for Create Sales Comp feature should NOT be tested on PROD environment
 */
const { pageElements } = Alias;

conditionalDescribe("Group of tests for numeric inputs at create comp modal",
    { tags:[ "@find_comps", "@sales" ] }, () => {

    beforeEach("Login, create report", () => {
        createReport(testData.reportCreationData);
        cy.stepInfo("Navigate to FindComps page and create new comp");
        _NavigationSection.navigateToFindComps(true);
        Sales._FindComps.openAddNewComparableFormSearchResult(testData.compAddress)
            .selectDropdownOptionNewComp(Sales._FindComps.Page.conditionDropdown, testData.condition);
    });

    it("QA-4139: Verify the # Residential Units* field", () => {
        /**
         * ernst: Little hack necessary to interact correctly from Cypress with shadow-dom elements.
         * We get elements once, their recieve their aliases and with further methods - we requery them everytime
         */
        Sales._FindComps.Page.createCompNumberResidentialUnits;

        Sales._FindComps.verifyNumericInputNewComp(pageElements.comp_plex.createCompNumberResidentialUnits, testData.spec4139.numberOfUnitsDefault)
            .enterNumericInputNewComp(pageElements.comp_plex.createCompNumberResidentialUnits, testData.spec4139.regularNum)
            .enterNumericInputNewComp(pageElements.comp_plex.createCompNumberResidentialUnits, testData.spec4139.decimalNum)
            .enterNumericInputNewComp(pageElements.comp_plex.createCompNumberResidentialUnits, testData.spec4139.nonNumberValue)
            .enterNumericInputNewComp(pageElements.comp_plex.createCompNumberResidentialUnits, testData.spec4139.longValue)
            .clearNumericInputNewComp(pageElements.comp_plex.createCompNumberResidentialUnits)
            .selectDropdownOptionNewComp(Sales._FindComps.Page.conditionDropdown, testData.condition)
            .Page.errorMessageNewComp.should("exist");
  
        deleteReport(testData.reportCreationData.reportNumber);
    });

    it("QA-4143: Verify the #Commercial Units* field", () => {        
        Sales._FindComps.Page.createCompNumberCommercialUnits.should("not.exist");
        Sales._FindComps.selectDropdownOptionNewComp(Sales._FindComps.Page.comparableTypeDropdown, testData.comparableType);
        
        // ernst: query element once more in order to have "clean" alias
        Sales._FindComps.Page.createCompNumberCommercialUnits;
        
        Sales._FindComps
            .enterNumericInputNewComp(pageElements.comp_plex.createCompNumberCommercialUnits, testData.spec4143.regularNumber)
            .enterNumericInputNewComp(pageElements.comp_plex.createCompNumberCommercialUnits, testData.spec4143.regularNumOverThousand)
            .enterNumericInputNewComp(pageElements.comp_plex.createCompNumberCommercialUnits, testData.spec4143.nonNumberValue)
            .enterNumericInputNewComp(pageElements.comp_plex.createCompNumberCommercialUnits, testData.spec4143.decimalNum)
            .enterNumericInputNewComp(pageElements.comp_plex.createCompNumberCommercialUnits, testData.spec4143.longValue)
            .clearNumericInputNewComp(pageElements.comp_plex.createCompNumberCommercialUnits)
            .selectDropdownOptionNewComp(Sales._FindComps.Page.conditionDropdown, testData.condition)
            .Page.errorMessageNewComp.should("exist");

        deleteReport(testData.reportCreationData.reportNumber);
    });

    /**
     * ernst: Requires changes in Commercial Area* field to make it testable
     */
    it("QA-4144: Verify the Commercial Area* field", () => {
        Sales._FindComps.Page.commercialAreaNewComp.should("not.exist");
        Sales._FindComps.selectDropdownOptionNewComp(Sales._FindComps.Page.comparableTypeDropdown, testData.comparableType);
        Sales._FindComps.Page.commercialAreaNewComp;
        Sales._FindComps
            .enterNumericInputNewComp(pageElements.comp_plex.commercialAreaNewComp, testData.spec4144.regularNumber)
            .enterNumericInputNewComp(pageElements.comp_plex.commercialAreaNewComp, testData.spec4144.regularNumOverThousand)
            .enterNumericInputNewComp(pageElements.comp_plex.commercialAreaNewComp, testData.spec4144.decimalNum)
            .enterNumericInputNewComp(pageElements.comp_plex.commercialAreaNewComp, testData.spec4144.nonNumberValue)
            .enterNumericInputNewComp(pageElements.comp_plex.commercialAreaNewComp, testData.spec4144.longValue)
            .clearNumericInputNewComp(pageElements.comp_plex.commercialAreaNewComp)
            .selectDropdownOptionNewComp(Sales._FindComps.Page.conditionDropdown, testData.condition)
            .Page.errorMessageNewComp.should("exist");

        deleteReport(testData.reportCreationData.reportNumber);
    });

    it("QA-4482: Verify the Net Rentable Area field", () => {
        Sales._FindComps.Page.netRentableAreaNewComp.should("not.exist");
        Sales._FindComps.selectDropdownOptionNewComp(Sales._FindComps.Page.comparableTypeDropdown, testData.comparableType);
        
        Sales._FindComps.Page.netRentableAreaNewComp;
        Sales._FindComps.Page.createCompNumberCommercialUnits;
        Sales._FindComps.Page.commercialAreaNewComp;

        Sales._FindComps.Page.editContentArrow.click();
        
        Sales._FindComps
            .enterNumericInputNewComp(pageElements.comp_plex.netRentableAreaNewComp, testData.spec4482.regularNumber)
            .enterNumericInputNewComp(pageElements.comp_plex.netRentableAreaNewComp, testData.spec4482.regularNumOverThousand)
            .enterNumericInputNewComp(pageElements.comp_plex.netRentableAreaNewComp, testData.spec4482.decimalNum)
            .enterNumericInputNewComp(pageElements.comp_plex.netRentableAreaNewComp, testData.spec4482.nonNumberValue)
            .enterNumericInputNewComp(pageElements.comp_plex.netRentableAreaNewComp, testData.spec4482.longValue)
            .enterNumericInputNewComp(pageElements.comp_plex.createCompNumberCommercialUnits, testData.spec4143.regularNumOverThousand)
            .enterNumericInputNewComp(pageElements.comp_plex.commercialAreaNewComp, testData.spec4144.regularNumOverThousand)
            .clearNumericInputNewComp(pageElements.comp_plex.netRentableAreaNewComp)
            .selectDropdownOptionNewComp(Sales._FindComps.Page.conditionDropdown, testData.condition)
            .Page.errorMessageNewComp.should("not.exist");

        deleteReport(testData.reportCreationData.reportNumber);
    });

    it("QA-4483: Verify the Average Unit Size field", { tags:[ "@comp_plex" ] }, () => {
        Sales._FindComps.Page.averageUnitSizeNewComp;

        Sales._FindComps.enterNumericInputNewComp(pageElements.comp_plex.averageUnitSizeNewComp, testData.spec4483.regularNumber)
            .enterNumericInputNewComp(pageElements.comp_plex.averageUnitSizeNewComp, testData.spec4483.regularNumOverThousand)
            .enterNumericInputNewComp(pageElements.comp_plex.averageUnitSizeNewComp, testData.spec4483.decimalNum)
            .enterNumericInputNewComp(pageElements.comp_plex.averageUnitSizeNewComp, testData.spec4483.nonNumberValue)
            .enterNumericInputNewComp(pageElements.comp_plex.averageUnitSizeNewComp, testData.spec4483.longValue)
            .clearNumericInputNewComp(pageElements.comp_plex.averageUnitSizeNewComp)
            .selectDropdownOptionNewComp(Sales._FindComps.Page.conditionDropdown, testData.condition)
            .Page.errorMessageNewComp.should("not.exist");
            
        deleteReport(testData.reportCreationData.reportNumber);
    });
});