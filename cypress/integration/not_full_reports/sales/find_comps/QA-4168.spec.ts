import { Sales } from './../../../../actions/index';
import { _NavigationSection } from './../../../../actions/base/index';
import testData from "../../../../fixtures/not_full_reports/sales/find_comps/QA-4168.fixture";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";

describe("[QA-4168] Verify the Internal Notes field", () => {
    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        _NavigationSection.navigateToFindComps();

        Sales._FindComps.openAddNewComparableFormSearchResult(testData.compAddress);

        // deleteReport(testData.reportCreationData.reportNumber);
    });
});