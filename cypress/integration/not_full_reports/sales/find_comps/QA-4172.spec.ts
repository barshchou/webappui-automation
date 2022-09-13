import testData from "../../../../fixtures/not_full_reports/sales/find_comps/QA-4172.fixture";
import NavigationSection from "../../../../actions/base/navigationSection.actions";
import Sales from "../../../../actions/sales/sales.manager";
import { createReport } from "../../../../actions/base/baseTest.actions";

// Check test after resolving https://bowery.atlassian.net/browse/QA-6890
describe("Verify the functionality of the Upload Comps button", 
    { tags:[ "@find_comps", "@sales" ] }, () => {
        beforeEach("Login and create report", () => {
            createReport(testData.reportCreationData);
        });

        it("Test body", () => {
            NavigationSection.navigateToFindComps();
            Sales.FindComps.uploadComps(testData.filePath)
                .verifyComparablesNumber(testData.compsNumber);
        });
    });