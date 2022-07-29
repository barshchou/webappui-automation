import testData from "../../../../../fixtures/not_full_reports/income/commercial/rent_comps/QA-4146.fixture";
import Income from "../../../../../actions/income/income.manager";
import NavigationSection from "../../../../../actions/base/navigationSection.actions";
import { createReport } from "../../../../../actions/base/baseTest.actions";

describe("Check that map is closed by default", 
    { tags:[ "@income", "@commercial", "@rent_comps" ] }, () => {
        
        before("Login, create report", () => {
            createReport(testData.reportCreationData);
        });

        it("Test body", () => {
            NavigationSection.navigateToCommercialRentComps();
            Income.Commercial.RentComps.verifyMapClosedByDefault();
        });
    });