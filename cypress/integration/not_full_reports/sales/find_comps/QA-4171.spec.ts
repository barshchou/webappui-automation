import testData from "../../../../fixtures/not_full_reports/sales/find_comps/QA-4171.fixture";
import NavigationSection from "../../../../actions/base/navigationSection.actions";
import Sales from "../../../../actions/sales/sales.manager";
import { createReport } from "../../../../actions/base/baseTest.actions";

describe("Selected Comparables table. Verify the functionality of Remove button", 
    { tags:[ "@find_comps", "@sales", "@fix" ] }, () => {
        beforeEach("Login, create report", () => {
            createReport(testData.reportCreationData);
        });

        it("Test body", () => {
            NavigationSection.navigateToFindComps();
            Sales.FindComps.AddressSearch.openAddressSearchTab()
                .addCompByParameter(1, testData.compProperty, testData.compStatusDate);
            Sales.FindComps.verifyAddedCompAddress(testData.comparable.address)
                .removeCompByAddress(testData.comparable.address)
                .verifyCompIsInRemovedSection(testData.comparable.address)
                .removeDeletedCompByAddress(testData.comparable.address);
        });
    });