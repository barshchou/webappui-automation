import testData from "../../../../../fixtures/not_full_reports/income/commercial/in_place_rent_roll/QA-4322.fixture";
import NavigationSection from "../../../../../actions/base/navigationSection.actions";
import Income from "../../../../../actions/income/income.manager";
import {createReport, deleteReport} from "../../../../../actions/base/baseTest.actions";
import { Tag } from "../../../../../utils/tags.utils";

describe("Verify the Basis of Rent tooltip", {tags:[ Tag.income, Tag.in_place_rent_roll ]}, () => {
    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        NavigationSection.navigateToCommercialInPlaceRentRoll();
        Income.Commercial.InPlaceRentRoll.verifyBasisOfRentTooltip();
        deleteReport(testData.reportCreationData.reportNumber);
    });
});