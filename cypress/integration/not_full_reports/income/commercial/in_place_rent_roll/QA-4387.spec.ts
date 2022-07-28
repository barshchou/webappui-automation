import testData from "../../../../../fixtures/not_full_reports/income/commercial/in_place_rent_roll/QA-4387.fixture";
import NavigationSection from "../../../../../actions/base/navigationSection.actions";
import Income from "../../../../../actions/income/income.manager";
import Property from "../../../../../actions/property/property.manager";
import { createReport, deleteReport } from "../../../../../actions/base/baseTest.actions";

describe("Verify the SF column in the grid", 
    { tags:[ "@income", "@commercial", "@in_place_rent_roll" ] }, () => {

        beforeEach("Login, create report", () => {
            createReport(testData.reportCreationData);
        });

        it("Test body", () => {
            NavigationSection.navigateToCommercialInPlaceRentRoll();
            Income.Commercial.InPlaceRentRoll.chooseLeaseStatusByRowNumber(testData.leaseStatus)
                .verifySfCellByRow();
            NavigationSection.navigateToCommercialUnits();
            Property.CommercialUnits.enterUnitSFByUnitIndex(testData.squareFeet);
            NavigationSection.navigateToCommercialInPlaceRentRoll();
            Income.Commercial.InPlaceRentRoll.verifySfCellByRow(testData.squareFeet);
            deleteReport(testData.reportCreationData.reportNumber);
        });
    });