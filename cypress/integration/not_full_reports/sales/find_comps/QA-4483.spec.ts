import testData from "../../../../fixtures/not_full_reports/sales/find_comps/QA-4483.fixture";
import {createReport} from "../../../../actions/base/baseTest.actions";
import {_NavigationSection} from "../../../../actions/base";
import {Sales} from "../../../../actions";

describe("Group of tests for numeric inputs at create comp modal", () => {
    beforeEach("Login, create report", () => {
        createReport(testData.reportCreationData);
        _NavigationSection.navigateToFindComps();
        Sales._FindComps.clickCreateCompButton()
            .openAddNewComparableFormSearchResult(testData.compAddress);
    });

    it("QA-4139: Verify the # Residential Units* field", () => {

    });
});