import testData from "../../../../../fixtures/not_full_reports/income/commercial/in_place_rent_roll/QA-4323.fixture";
import NavigationSection from "../../../../../actions/base/navigationSection.actions";
import Income from "../../../../../actions/income/income.manager";
import { createReport, deleteReport } from "../../../../../actions/base/baseTest.actions";

describe("Verify the Rent Basis buttons", 
    { tags:[ "@dd", "@income", "@commercial", "@in_place_rent_roll" ] }, () => {
        
    before("Login, create report", () => {
        cy.get("somethign", { timeout:1500 }).should("exist");
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        NavigationSection.navigateToCommercialInPlaceRentRoll();
        Income.Commercial.InPlaceRentRoll.verifyAllBasisButtons();
        deleteReport(testData.reportCreationData.reportNumber);
    });
});