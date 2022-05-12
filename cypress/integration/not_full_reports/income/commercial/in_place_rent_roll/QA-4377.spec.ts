import testData from "../../../../../fixtures/not_full_reports/income/commercial/in_place_rent_roll/QA-4377.fixture";
import NavigationSection from "../../../../../actions/base/navigationSection.actions";
import Income from "../../../../../actions/income/income.manager";
import Final from "../../../../../actions/final/final.manager";
import { createReport, deleteReport } from "../../../../../actions/base/baseTest.actions";
import { Tag } from "../../../../../utils/tags.utils";

describe("Verify the Inspected checkbox functionality", { tags:[ Tag.income, Tag.in_place_rent_roll ] }, () => {
    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
       NavigationSection.navigateToCommercialInPlaceRentRoll();
        Income.Commercial.InPlaceRentRoll.chooseLeaseStatusByRowNumber(testData.leaseStatus)
            .checkIsInspectedCheckboxByRowNumber();
        NavigationSection.openCommercialStabilizedRentRollInCommercial()
            .verifyProgressBarNotExist();
        Income.Commercial.StabilizedRentRoll.verifyIsInspectedChecked();
        NavigationSection.navigateToUnitInspection();
        Final.UnitInspection.verifyNumberOfInspectedUnitsCommentary();
        deleteReport(testData.reportCreationData.reportNumber);
    });
});