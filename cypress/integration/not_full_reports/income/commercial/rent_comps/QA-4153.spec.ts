import testData from "../../../../../fixtures/not_full_reports/income/commercial/rent_comps/QA-4153.fixture";
import Income from "../../../../../actions/income/income.manager";
import NavigationSection from "../../../../../actions/base/navigationSection.actions";
import { createReport, deleteReport } from "../../../../../actions/base/baseTest.actions";

describe("Dropdown 'Filters'- 'Lease terms' section", 
    { tags:[ "@income", "@commercial", "@rent_comps" ] }, () => {

        beforeEach("Login, create report", () => {
            createReport(testData.reportCreationData);
        });

        it("Test body", () => {
            NavigationSection.navigateToCommercialRentComps();
            Income.Commercial.RentComps.openMap()
                .verifyProgressBarNotExist()
                .verifyFiltersDropdownExist()
                .clickFiltersDropdown()
                .verifyLeaseTermsSectionExist();
            testData.checkboxesAttributes.forEach(attr => {
                Income.Commercial.RentComps.checkCheckboxByQAAttr(attr)
                    .uncheckCheckboxByQAAttr(attr);
            });
            deleteReport(testData.reportCreationData.reportNumber);
        });
    });