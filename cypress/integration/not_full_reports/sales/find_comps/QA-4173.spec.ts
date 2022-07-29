import testData from "../../../../fixtures/not_full_reports/sales/find_comps/QA-4173.fixture";
import NavigationSection from "../../../../actions/base/navigationSection.actions";
import Sales from "../../../../actions/sales/sales.manager";
import { createReport } from "../../../../actions/base/baseTest.actions";

/*
 * TODO: https://bowery.atlassian.net/browse/QA-6383 Update test spec after test case update
 *Test is skipped as it's outdated. Import modal moved to another place.
 */
describe.skip("Verify the Enter Report Unique ID modal is displayed on clicking the Import Comps button", 
    { tags:[ "@find_comps", "@sales" ] }, () => {
        before("Login and create report", () => {
            createReport(testData.reportCreationData);
        });

        it("Test body", () => {
            NavigationSection.navigateToFindComps();
            Sales.FindComps.clickImportComparableButton()
                .verifyImportCompModalShown();
        });
    });