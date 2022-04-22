import testData from "../../../../../fixtures/not_full_reports/income/commercial/in_place_rent_roll/QA-4322.fixture";
import NavigationSection from "../../../../../actions/base/navigationSection.actions";
import Income from "../../../../../actions/income/income.manager";
import {createReport, deleteReport} from "../../../../../actions/base/baseTest.actions";
import { recordDOM_Snapshot } from "../../../../../utils/snapshot.utils";
import { recordProxiedRequests } from "../../../../../../utils/intercept.utils";

describe("Verify the Basis of Rent tooltip", () => {
    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        NavigationSection.navigateToCommercialInPlaceRentRoll();
        Income.Commercial.InPlaceRentRoll.verifyBasisOfRentTooltip();
        deleteReport(testData.reportCreationData.reportNumber);
    });

    after(() => {
        recordDOM_Snapshot();
        recordProxiedRequests();
    });
});