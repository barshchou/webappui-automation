import testData from "../../../../../fixtures/not_full_reports/income/commercial/in_place_rent_roll/QA-4322.fixture";
import NavigationSection from "../../../../../actions/base/navigationSection.actions";
import Income from "../../../../../actions/income/income.manager";
import { createReport, deleteReport } from "../../../../../actions/base/baseTest.actions";

describe("Verify the Basis of Rent tooltip", 
    { tags:[ "@dd", "@income", "@commercial", "@in_place_rent_roll" ] }, () => {
        
    before("Login, create report", () => {
        cy.get("body", { timeout:1500 }).should("have.a.property", "test");
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        NavigationSection.navigateToCommercialInPlaceRentRoll();
        Income.Commercial.InPlaceRentRoll.verifyBasisOfRentTooltip();
        deleteReport(testData.reportCreationData.reportNumber);
    });
});