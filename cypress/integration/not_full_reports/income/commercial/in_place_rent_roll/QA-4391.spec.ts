import testData from "../../../../../fixtures/not_full_reports/income/commercial/in_place_rent_roll/QA-4391.fixture";
import NavigationSection from "../../../../../actions/base/navigationSection.actions";
import Property from "../../../../../actions/property/property.manager";
import Income from "../../../../../actions/income/income.manager";
import { createReport, deleteReport } from "../../../../../actions/base/baseTest.actions";
import { Tag } from "../../../../../utils/tags.utils";

describe("Verify the SF Total is calculated correctly in the grid.", 
    { tags:[ Tag.income, Tag.commercial, Tag.in_place_rent_roll ] }, () => {

    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        NavigationSection.navigateToPropertySummary();
        Property.Summary.enterNumberOfCommercialUnits(testData.general.numberOfUnits);
        NavigationSection.navigateToCommercialUnits();
        Property.CommercialUnits.enterListUnitSF(testData.general.squareFeetList, testData.general.numberOfUnits);
        NavigationSection.navigateToCommercialInPlaceRentRoll();
        Income.Commercial.InPlaceRentRoll.chooseListLeaseStatuses(testData.leaseStatusesList, testData.general.numberOfUnits)
            .verifySFTotal(testData.general.squareFeetList);
        deleteReport(testData.reportCreationData.reportNumber);
    });
});