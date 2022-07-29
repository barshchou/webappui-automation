import testData from "../../../../../fixtures/not_full_reports/income/commercial/rent_comps/QA-4152.fixture";
import Income from "../../../../../actions/income/income.manager";
import NavigationSection from "../../../../../actions/base/navigationSection.actions";
import { createReport } from "../../../../../actions/base/baseTest.actions";

describe("Dropdown 'Filters'- 'Sort by' section", 
    { tags:[ "@income", "@commercial", "@rent_comps" ] }, () => {

        before("Login, create report", () => {
            createReport(testData.reportCreationData);
        });

        it("Test body", () => {
            NavigationSection.navigateToCommercialRentComps();
            Income.Commercial.RentComps.openMap()
                .verifyProgressBarNotExist()
                .verifyFiltersDropdownExist()
                .clickFiltersDropdown()
                .verifySortBySectionExist();
            testData.sortByOptions.forEach(option => {
                Income.Commercial.RentComps.selectSortByOption(option);
            });
        });
    });