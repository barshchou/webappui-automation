import testData from "../../../../../fixtures/not_full_reports/income/commercial/in_place_rent_roll/QA-4323.fixture";
import NavigationSection from "../../../../../actions/base/navigationSection.actions";
import Income from "../../../../../actions/income/income.manager";
import {createReport, deleteReport} from "../../../../../actions/base/baseTest.actions";

describe("Verify the Rent Basis buttons", () => {
    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        NavigationSection.navigateToCommercialInPlaceRentRoll();
        cy.get("[somehow]").should("exist");
        Income.Commercial.InPlaceRentRoll.verifyAllBasisButtons();
        deleteReport(testData.reportCreationData.reportNumber);
    });
});