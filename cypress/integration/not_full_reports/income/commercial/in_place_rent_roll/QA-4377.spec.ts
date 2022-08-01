import testData from "../../../../../fixtures/not_full_reports/income/commercial/in_place_rent_roll/QA-4377.fixture";
import NavigationSection from "../../../../../actions/base/navigationSection.actions";
import Income from "../../../../../actions/income/income.manager";
import Final from "../../../../../actions/final/final.manager";
import { createReport } from "../../../../../actions/base/baseTest.actions";

describe("Verify the Inspected checkbox functionality", 
    { tags:[ "@income", "@commercial", "@in_place_rent_roll" ] }, () => {
        
        beforeEach("Login, create report", () => {
            createReport(testData.reportCreationData);
        });

        it("Test body", () => {
            NavigationSection.navigateToCommercialInPlaceRentRoll();
            Income.Commercial.InPlaceRentRoll.chooseLeaseStatusByRowNumber(testData.leaseStatus)
                .checkIsInspectedCheckboxByRowNumber();
            NavigationSection.navigateToStabilizedRentRollInCommercial()
                .verifyProgressBarNotExist();
            Income.Commercial.StabilizedRentRoll.verifyIsInspectedChecked();
            NavigationSection.navigateToUnitInspection();
            Final.UnitInspection.verifyNumberOfInspectedUnitsCommentary();
        });
    });