import testData from "../../../../../fixtures/not_full_reports/income/commercial/in_place_rent_roll/QA-4379&80.fixture";
import NavigationSection from "../../../../../actions/base/navigationSection.actions";
import Income from "../../../../../actions/income/income.manager";
import Property from "../../../../../actions/property/property.manager";
import { createReport, deleteReport } from "../../../../../actions/base/baseTest.actions";
import { Tag } from "../../../../../utils/tags.utils";

describe("Verify the Unit column in the grid and grid presence", 
    { tags:[ Tag.income, Tag.commercial, Tag.in_place_rent_roll ] }, () => {
        
    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        NavigationSection.navigateToCommercialInPlaceRentRoll();
        Income.Commercial.InPlaceRentRoll.verifyUnitNumberCells()
            .chooseLeaseStatusByRowNumber(testData.leaseStatus);
        NavigationSection.navigateToPropertySummary();
        Property.Summary.enterNumberOfCommercialUnits(testData.newUnitsNumber);
        NavigationSection.navigateToCommercialInPlaceRentRoll();
        Income.Commercial.InPlaceRentRoll.verifyUnitNumberCells(testData.newUnitsNumber);
        deleteReport(testData.reportCreationData.reportNumber);
    });
});