import testData from "../../../../fixtures/not_full_reports/sales/find_comps/QA-4139_43_44_4482_83.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import { Sales } from "../../../../actions";
import { conditionalDescribe } from "../../../checkIsProd.utils";
import { Alias } from "../../../../utils/alias.utils";
/*
 *# Uladzislau.Samykou
 *This spec is conditional, because tests for Create Sales Comp feature should NOT be tested on PROD environment
 */
const { pageElements } = Alias;

conditionalDescribe("Group of tests for numeric inputs at create comp modal", 
    { tags:[ "@find_comps", "@sales" ] }, () => {
        beforeEach("Login, create report", () => {
            createReport(testData.reportCreationData);
            cy.stepInfo(`Navigate to FindComps page and create new comp`);
            _NavigationSection.navigateToFindComps(true);
            Sales._FindComps.openAddNewComparableFormSearchResult(testData.compAddress)
                .selectDropdownOptionNewComp(Sales._FindComps.Page.conditionDropdown, testData.condition);
        });

        it(`QA-4139: Verify the # Residential Units* field`, () => {
        /**
         * ernst: Little hack necessary to interact correctly from Cypress with shadow-dom elements.
         * We get elements once, their receive their aliases and with further methods - we re-query them everytime
         */
            Sales._FindComps.Page.createCompNumberResidentialUnits;
            Sales._FindComps
                .verifyNumericInputNewComp(pageElements.compPlex.createCompNumberResidentialUnits, 
                    testData.spec4139.numberOfUnitsDefault)
                .enterNumericInputNewComp(pageElements.compPlex.createCompNumberResidentialUnits, 
                    testData.spec4139.regularNum)
                .enterNumericInputNewComp(pageElements.compPlex.createCompNumberResidentialUnits, 
                    testData.spec4139.decimalNum)
                .enterNumericInputNewComp(pageElements.compPlex.createCompNumberResidentialUnits, 
                    testData.spec4139.nonNumberValue)
                .enterNumericInputNewComp(pageElements.compPlex.createCompNumberResidentialUnits, 
                    testData.spec4139.longValue)
                .clearNumericInputNewComp(pageElements.compPlex.createCompNumberResidentialUnits)
                .selectDropdownOptionNewComp(Sales._FindComps.Page.conditionDropdown, testData.condition)
                .Page.errorMessageNewComp.should("exist");
        });

        //TODO test is not relevant anymore 
        it.skip(`QA-4143: Verify the #Commercial Units* field`, () => {        
            Sales._FindComps.Page.createCompNumberCommercialUnits.should("not.exist");
            Sales._FindComps.selectDropdownOptionNewComp(Sales._FindComps.Page.comparableTypeDropdown, 
                testData.comparableType);
        
            // ernst: query element once more in order to have "clean" alias
            Sales._FindComps.Page.createCompNumberCommercialUnits;
            Sales._FindComps
                .enterNumericInputNewComp(pageElements.compPlex.createCompNumberCommercialUnits, 
                    testData.spec4143.regularNumber)
                .enterNumericInputNewComp(pageElements.compPlex.createCompNumberCommercialUnits, 
                    testData.spec4143.regularNumOverThousand)
                .enterNumericInputNewComp(pageElements.compPlex.createCompNumberCommercialUnits, 
                    testData.spec4143.nonNumberValue)
                .enterNumericInputNewComp(pageElements.compPlex.createCompNumberCommercialUnits, 
                    testData.spec4143.decimalNum)
                .enterNumericInputNewComp(pageElements.compPlex.createCompNumberCommercialUnits, 
                    testData.spec4143.longValue)
                .clearNumericInputNewComp(pageElements.compPlex.createCompNumberCommercialUnits)
                .selectDropdownOptionNewComp(Sales._FindComps.Page.conditionDropdown, testData.condition)
                .Page.errorMessageNewComp.should("exist");
        });

        /**
         * ernst: Requires changes in Commercial Area* field to make it testable
         */
        //TODO test is not relevant anymore 
        it.skip(`QA-4144: Verify the Commercial Area* field`, () => {
            Sales._FindComps.Page.commercialAreaNewComp.should("not.exist");
            Sales._FindComps.selectDropdownOptionNewComp(Sales._FindComps.Page.comparableTypeDropdown, 
                testData.comparableType);
            Sales._FindComps.Page.commercialAreaNewComp;
            Sales._FindComps
                .enterNumericInputNewComp(pageElements.compPlex.commercialAreaNewComp, 
                    testData.spec4144.regularNumber)
                .enterNumericInputNewComp(pageElements.compPlex.commercialAreaNewComp, 
                    testData.spec4144.regularNumOverThousand)
                .enterNumericInputNewComp(pageElements.compPlex.commercialAreaNewComp, 
                    testData.spec4144.decimalNum)
                .enterNumericInputNewComp(pageElements.compPlex.commercialAreaNewComp, 
                    testData.spec4144.nonNumberValue)
                .enterNumericInputNewComp(pageElements.compPlex.commercialAreaNewComp, 
                    testData.spec4144.longValue)
                .clearNumericInputNewComp(pageElements.compPlex.commercialAreaNewComp)
                .selectDropdownOptionNewComp(Sales._FindComps.Page.conditionDropdown, testData.condition)
                .Page.errorMessageNewComp.should("exist");
        });

        it(`QA-4482: Verify the Net Rentable Area field`, () => {
            Sales._FindComps.Page.netRentableAreaNewComp.should("not.exist");
            Sales._FindComps.selectDropdownOptionNewComp(Sales._FindComps.Page.comparableTypeDropdown, 
                testData.comparableType);
            Sales._FindComps.Page.netRentableAreaNewComp;
            Sales._FindComps.Page.createCompNumberCommercialUnits;
            Sales._FindComps.Page.commercialAreaNewComp;
            Sales._FindComps.Page.editContentArrow.click();
        
            Sales._FindComps
                .enterNumericInputNewComp(pageElements.compPlex.netRentableAreaNewComp, 
                    testData.spec4482.regularNumber)
                .enterNumericInputNewComp(pageElements.compPlex.netRentableAreaNewComp, 
                    testData.spec4482.regularNumOverThousand)
                .enterNumericInputNewComp(pageElements.compPlex.netRentableAreaNewComp, 
                    testData.spec4482.decimalNum)
                .enterNumericInputNewComp(pageElements.compPlex.netRentableAreaNewComp, 
                    testData.spec4482.nonNumberValue)
                .enterNumericInputNewComp(pageElements.compPlex.netRentableAreaNewComp, 
                    testData.spec4482.longValue)
                .enterNumericInputNewComp(pageElements.compPlex.createCompNumberCommercialUnits, 
                    testData.spec4143.regularNumOverThousand)
                .enterNumericInputNewComp(pageElements.compPlex.commercialAreaNewComp, 
                    testData.spec4144.regularNumOverThousand)
                .clearNumericInputNewComp(pageElements.compPlex.netRentableAreaNewComp)
                .selectDropdownOptionNewComp(Sales._FindComps.Page.conditionDropdown, testData.condition)
                .Page.errorMessageNewComp.should("not.exist");
        });

        it("QA-4483: Verify the Average Unit Size field", { tags:[ "@comp_plex" ] }, () => {
            Sales._FindComps.Page.averageUnitSizeNewComp;
            Sales._FindComps
                .enterNumericInputNewComp(pageElements.compPlex.averageUnitSizeNewComp, 
                    testData.spec4483.regularNumber)
                .enterNumericInputNewComp(pageElements.compPlex.averageUnitSizeNewComp, 
                    testData.spec4483.regularNumOverThousand)
                .enterNumericInputNewComp(pageElements.compPlex.averageUnitSizeNewComp, 
                    testData.spec4483.decimalNum)
                .enterNumericInputNewComp(pageElements.compPlex.averageUnitSizeNewComp, 
                    testData.spec4483.nonNumberValue)
                .enterNumericInputNewComp(pageElements.compPlex.averageUnitSizeNewComp, 
                    testData.spec4483.longValue)
                .clearNumericInputNewComp(pageElements.compPlex.averageUnitSizeNewComp)
                .selectDropdownOptionNewComp(Sales._FindComps.Page.conditionDropdown, testData.condition)
                .Page.errorMessageNewComp.should("not.exist");
        });
    });
