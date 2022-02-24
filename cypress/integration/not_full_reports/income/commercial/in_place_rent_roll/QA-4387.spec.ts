import testData from "../../../../../fixtures/not_full_reports/income/commercial/in_place_rent_roll/QA-4387.fixture";
import NavigationSection from "../../../../../actions/base/navigationSection.actions";
import Income from "../../../../../actions/income/income.manager";
import Property from "../../../../../actions/property/property.manager";
import {createReport, deleteReport} from "../../../../../actions/base/baseTest.actions";

describe("Verify the SF column in the grid", () => {

    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
       NavigationSection.navigateToCommercialInPlaceRentRoll();
       Income.Commercial.InPlaceRentRoll.chooseLeaseStatusByRowNumber(testData.leaseStatus)
           .verifySquareFeetByRowNumber();
       NavigationSection.navigateToCommercialUnits();
       Property.CommercialUnits.enterUnitSFByUnitIndex(testData.squareFeet);
       NavigationSection.navigateToCommercialInPlaceRentRoll();
       Income.Commercial.InPlaceRentRoll.verifySquareFeetByRowNumber(testData.squareFeet);
       deleteReport(testData.reportCreationData.reportNumber);
    });
});