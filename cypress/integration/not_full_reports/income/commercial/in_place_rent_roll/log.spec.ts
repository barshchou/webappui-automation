import testData from "../../../../../fixtures/not_full_reports/income/commercial/in_place_rent_roll/QA-4322.fixture";
import NavigationSection from "../../../../../actions/base/navigationSection.actions";
import Income from "../../../../../actions/income/income.manager";
import {createReport, deleteReport} from "../../../../../actions/base/baseTest.actions";
import homepagePage from "../../../../../pages/base/homepage.page";
import { getDOM_Snapshot } from "../../../../../utils/snapshot.utils";

describe("Verify the Basis of Rent tooltip", () => {
    before("Login, create report", () => {
        cy.login();
        homepagePage.newReportButton.should("be.visible");
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        deleteReport(testData.reportCreationData.reportNumber);
        cy.log("test");
        NavigationSection.verifyProgressBarNotExist();
    });

    after(() => {
        getDOM_Snapshot();
    });
});