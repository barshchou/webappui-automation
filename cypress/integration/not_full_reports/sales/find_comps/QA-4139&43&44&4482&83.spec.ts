import testData from "../../../../fixtures/not_full_reports/sales/find_comps/QA-4139&43&44&4482&83.fixture";
import {createReport, deleteReport} from "../../../../actions/base/baseTest.actions";
import {_NavigationSection} from "../../../../actions/base";
import {Sales} from "../../../../actions";
import {isProdEnv} from "../../../../../utils/env.utils";

/*
    # Uladzislau.Samykou
    This spec is conditional, because tests for Create Sales Comp feature should NOT be tested on PROD environment
 */
const conditionalDescribe = isProdEnv() ? describe.skip : describe;

conditionalDescribe("Group of tests for numeric inputs at create comp modal", () => {
    beforeEach("Login, create report", () => {
        createReport(testData.reportCreationData);
        cy.stepInfo("Navigate to FindComps page and create new comp");
        _NavigationSection.navigateToFindComps();
        Sales._FindComps.openAddNewComparableFormSearchResult(testData.compAddress)
            .selectDropdownOptionNewComp(Sales._FindComps.Page.conditionDropdown, testData.condition);
    });

    it("QA-4139: Verify the # Residential Units* field", () => {
        Sales._FindComps.verifyNumericInputNewComp(Sales._FindComps.Page.createCompNumberResidentialUnits, testData.spec4139.numberOfUnitsDefault)
            .enterNumericInputNewComp(Sales._FindComps.Page.createCompNumberResidentialUnits, testData.spec4139.regularNum)
            .enterNumericInputNewComp(Sales._FindComps.Page.createCompNumberResidentialUnits, testData.spec4139.decimalNum)
            .enterNumericInputNewComp(Sales._FindComps.Page.createCompNumberResidentialUnits, testData.spec4139.nonNumberValue)
            .enterNumericInputNewComp(Sales._FindComps.Page.createCompNumberResidentialUnits, testData.spec4139.longValue)
            .clearNumericInputNewComp(Sales._FindComps.Page.createCompNumberResidentialUnits)
            .selectDropdownOptionNewComp(Sales._FindComps.Page.conditionDropdown, testData.condition)
            .Page.errorMessageNewComp.should("exist");
        Sales._FindComps.Page.newCompContinueButton.should("be.disabled");
        deleteReport(testData.reportCreationData.reportNumber);
    });

    it("QA-4143: Verify the #Commercial Units* field", () => {
        Sales._FindComps.Page.createCompNumberCommercialUnits.should("not.exist");
        Sales._FindComps.selectDropdownOptionNewComp(Sales._FindComps.Page.comparableTypeDropdown, testData.comparableType)
            .enterNumericInputNewComp(Sales._FindComps.Page.createCompNumberCommercialUnits, testData.spec4143.regularNumber)
            .enterNumericInputNewComp(Sales._FindComps.Page.createCompNumberCommercialUnits, testData.spec4143.regularNumOverThousand)
            .enterNumericInputNewComp(Sales._FindComps.Page.createCompNumberCommercialUnits, testData.spec4143.nonNumberValue)
            .enterNumericInputNewComp(Sales._FindComps.Page.createCompNumberCommercialUnits, testData.spec4143.decimalNum)
            .enterNumericInputNewComp(Sales._FindComps.Page.createCompNumberCommercialUnits, testData.spec4143.longValue)
            .clearNumericInputNewComp(Sales._FindComps.Page.createCompNumberCommercialUnits)
            .selectDropdownOptionNewComp(Sales._FindComps.Page.conditionDropdown, testData.condition)
            .Page.errorMessageNewComp.should("exist");
        Sales._FindComps.Page.newCompContinueButton.should("be.disabled");
        deleteReport(testData.reportCreationData.reportNumber);
    });

    it("QA-4144: Verify the Commercial Area* field", () => {
        Sales._FindComps.Page.commercialAreaNewComp.should("not.exist");
        Sales._FindComps.selectDropdownOptionNewComp(Sales._FindComps.Page.comparableTypeDropdown, testData.comparableType)
            .enterNumericInputNewComp(Sales._FindComps.Page.commercialAreaNewComp, testData.spec4144.regularNumber)
            .enterNumericInputNewComp(Sales._FindComps.Page.commercialAreaNewComp, testData.spec4144.regularNumOverThousand)
            .enterNumericInputNewComp(Sales._FindComps.Page.commercialAreaNewComp, testData.spec4144.decimalNum)
            .enterNumericInputNewComp(Sales._FindComps.Page.commercialAreaNewComp, testData.spec4144.nonNumberValue)
            .enterNumericInputNewComp(Sales._FindComps.Page.commercialAreaNewComp, testData.spec4144.longValue)
            .clearNumericInputNewComp(Sales._FindComps.Page.commercialAreaNewComp)
            .selectDropdownOptionNewComp(Sales._FindComps.Page.conditionDropdown, testData.condition)
            .Page.errorMessageNewComp.should("exist");
        Sales._FindComps.Page.newCompContinueButton.should("be.disabled");
        deleteReport(testData.reportCreationData.reportNumber);
    });

    it("QA-4482: Verify the Net Rentable Area field", () => {
        Sales._FindComps.Page.netRentableAreaNewComp.should("not.exist");
        Sales._FindComps.selectDropdownOptionNewComp(Sales._FindComps.Page.comparableTypeDropdown, testData.comparableType)
            .enterNumericInputNewComp(Sales._FindComps.Page.netRentableAreaNewComp, testData.spec4482.regularNumber)
            .enterNumericInputNewComp(Sales._FindComps.Page.netRentableAreaNewComp, testData.spec4482.regularNumOverThousand)
            .enterNumericInputNewComp(Sales._FindComps.Page.netRentableAreaNewComp, testData.spec4482.decimalNum)
            .enterNumericInputNewComp(Sales._FindComps.Page.netRentableAreaNewComp, testData.spec4482.nonNumberValue)
            .enterNumericInputNewComp(Sales._FindComps.Page.netRentableAreaNewComp, testData.spec4482.longValue)
            .enterNumericInputNewComp(Sales._FindComps.Page.createCompNumberCommercialUnits, testData.spec4143.regularNumOverThousand)
            .enterNumericInputNewComp(Sales._FindComps.Page.commercialAreaNewComp, testData.spec4144.regularNumOverThousand)
            .clearNumericInputNewComp(Sales._FindComps.Page.netRentableAreaNewComp)
            .selectDropdownOptionNewComp(Sales._FindComps.Page.conditionDropdown, testData.condition)
            .Page.errorMessageNewComp.should("not.exist");
        Sales._FindComps.Page.newCompContinueButton.should("not.be.disabled");
        deleteReport(testData.reportCreationData.reportNumber);
    });

    it("QA-4483: Verify the Average Unit Size field", () => {
        Sales._FindComps.enterNumericInputNewComp(Sales._FindComps.Page.netRentableAreaNewComp, testData.spec4483.regularNumber)
            .enterNumericInputNewComp(Sales._FindComps.Page.netRentableAreaNewComp, testData.spec4483.regularNumOverThousand)
            .enterNumericInputNewComp(Sales._FindComps.Page.netRentableAreaNewComp, testData.spec4483.decimalNum)
            .enterNumericInputNewComp(Sales._FindComps.Page.netRentableAreaNewComp, testData.spec4483.nonNumberValue)
            .enterNumericInputNewComp(Sales._FindComps.Page.netRentableAreaNewComp, testData.spec4483.longValue)
            .enterNumericInputNewComp(Sales._FindComps.Page.createCompNumberCommercialUnits, testData.spec4143.regularNumOverThousand)
            .enterNumericInputNewComp(Sales._FindComps.Page.commercialAreaNewComp, testData.spec4144.regularNumOverThousand)
            .clearNumericInputNewComp(Sales._FindComps.Page.netRentableAreaNewComp)
            .selectDropdownOptionNewComp(Sales._FindComps.Page.conditionDropdown, testData.condition)
            .Page.errorMessageNewComp.should("not.exist");
        Sales._FindComps.Page.newCompContinueButton.should("not.be.disabled");
        deleteReport(testData.reportCreationData.reportNumber);
    });
});