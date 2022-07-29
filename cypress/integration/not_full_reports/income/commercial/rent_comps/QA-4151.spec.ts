import testData from "../../../../../fixtures/not_full_reports/income/commercial/rent_comps/QA-4151.fixture";
import Income from "../../../../../actions/income/income.manager";
import NavigationSection from "../../../../../actions/base/navigationSection.actions";
import { createReport } from "../../../../../actions/base/baseTest.actions";

describe("Check that Commercial Rent Comps map has Filters dropdown", 
    { tags:[ "@income", "@commercial", "@rent_comps" ] }, () => {
        
        beforeEach("Login, create report", () => {
            createReport(testData.reportCreationData);
        });

        it("Test body", () => {
            NavigationSection.navigateToCommercialRentComps();
            Income.Commercial.RentComps.openMap()
                .verifyProgressBarNotExist()
                .verifyFiltersDropdownExist();
        });
    });