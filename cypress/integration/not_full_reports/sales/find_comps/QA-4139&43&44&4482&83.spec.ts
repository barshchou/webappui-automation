import testData from "../../../../fixtures/not_full_reports/sales/find_comps/QA-4139&43&44&4482&83.fixture";
import {createReport, deleteReport} from "../../../../actions/base/baseTest.actions";
import {_NavigationSection} from "../../../../actions/base";
import {Sales} from "../../../../actions";

describe("Group of tests for numeric inputs at create comp modal", () => {
    beforeEach("Login, create report", () => {
        createReport(testData.reportCreationData);
        cy.stepInfo("Navigate to FindComps page and create new comp");
        _NavigationSection.navigateToFindComps();
        Sales._FindComps.openAddNewComparableFormSearchResult(testData.compAddress)
            .selectConditionNewComp(testData.condition);
    });

    it("QA-4139: Verify the # Residential Units* field", () => {
        Sales._FindComps.verifyNumberResidentialUnitsNewComp(testData.spec4139.numberOfUnitsDefault)
            .enterNumberResidentialUnitsNewComp(testData.spec4139.regularNum)
            .enterNumberResidentialUnitsNewComp(testData.spec4139.decimalNum)
            .enterNumberResidentialUnitsNewComp(testData.spec4139.nonNumberValue)
            .enterNumberResidentialUnitsNewComp(testData.spec4139.longValue)
            .clearNumberResidentialUnitsNewComp()
            .selectConditionNewComp(testData.condition)
            .Page.errorMessageNewComp.should("exist");
        Sales._FindComps.Page.newCompContinueButton.should("be.disabled");
        deleteReport(testData.reportCreationData.reportNumber);
    });
});