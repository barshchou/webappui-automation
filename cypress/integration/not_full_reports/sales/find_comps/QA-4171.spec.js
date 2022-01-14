import testData from "../../../../fixtures/not_full_reports/sales/find_comps/QA-4171.fixture";
import Homepage from "../../../../actions/base/homepage.actions";
import NavigationSection from "../../../../actions/base/navigationSection.actions";
import Sales from "../../../../actions/sales/sales.manager";

describe("Selected Comparables table. Verify the functionality of Remove button", () => {

    before("Login, create report", () => {
        cy.login();
        Homepage.createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        NavigationSection.navigateToFindComps();
        Sales.FindComps.selectCompFromMapByAddress(testData.comparable.address)
            .verifyAddedCompAddressByIndex(testData.comparable.address)
            .removeCompByAddress(testData.comparable.address)
            .verifyCompIsInRemovedSection(testData.comparable.address)
            .verifyCompIsInMap(testData.comparable.address)
            .removeDeletedCompByAddress(testData.comparable.address)
            .returnToHomePage();
        Homepage.deleteReport(testData.reportCreationData.reportNumber);
    });
});