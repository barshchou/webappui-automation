import Homepage from "../../../../../actions/base/homepage.actions";
import testData from "../../../../../fixtures/not_full_reports/income/commercial/in_place_rent_roll/QA-4393.fixture";
import NavigationSection from "../../../../../actions/base/navigationSection.actions";
import Property from "../../../../../actions/property/property.manager";
import Income from "../../../../../actions/income/income.manager";

describe("Verify the Monthly Rent Total is calculated correctly in the grid.", () => {

    before("Login, create report", () => {
        cy.login();
        Homepage.createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        NavigationSection.navigateToPropertySummary();
        Property.Summary.enterNumberOfCommercialUnits(testData.general.numberOfUnits);
        NavigationSection.clickCommercialUnits()
            .clickYesButton();
        Property.CommercialUnits.enterListOfCommercialUnits(testData.general.squareFeetList, testData.general.numberOfUnits);
        NavigationSection.navigateToCommercialInPlaceRentRoll();
        Income.Commercial.InPlaceRentRoll.chooseListLeaseStatuses(testData.general.leaseStatusesList, testData.general.numberOfUnits)
            .clickMonthlyBasisButton()
            .enterListMonthlyRent(testData.general.leaseStatusesList, testData.general.monthlyRents)
            .verifyMonthlyRentTotal(testData.general.leaseStatusesList, testData.general.monthlyRents)
            .returnToHomePage();
        Homepage.deleteReport(testData.reportCreationData.reportNumber);
    });
});