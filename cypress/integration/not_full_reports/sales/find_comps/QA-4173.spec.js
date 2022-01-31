import testData from "../../../../fixtures/not_full_reports/sales/find_comps/QA-4173.fixture";
import NavigationSection from "../../../../actions/base/navigationSection.actions";
import Sales from "../../../../actions/sales/sales.manager";
import {createReport, deleteReport} from "../../../../actions/base/baseTest.actions";

describe("Verify the Enter Report Unique ID modal is displayed on clicking the Import Comps button", () => {
    before("Login and create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        NavigationSection.navigateToFindComps();
        Sales.FindComps.clickImportComparableButton()
            .verifyImportCompModalShown();
        deleteReport(testData.reportCreationData.reportNumber);
    });
});