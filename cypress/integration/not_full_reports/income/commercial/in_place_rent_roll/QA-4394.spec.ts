import testData from "../../../../../fixtures/not_full_reports/income/commercial/in_place_rent_roll/QA-4394.fixture";
import NavigationSection from "../../../../../actions/base/navigationSection.actions";
import Property from "../../../../../actions/property/property.manager";
import Income from "../../../../../actions/income/income.manager";
import { createReport, deleteReport } from "../../../../../actions/base/baseTest.actions";

describe("Verify the Rent PSF Total is calculated correctly in the grid", () => {

    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        NavigationSection.navigateToPropertySummary();
        Property.Summary.enterNumberOfCommercialUnits(testData.general.numberOfUnits);
        NavigationSection.clickCommercialUnits()
            .clickYesButton();
        Property.CommercialUnits.enterListUnitSF(testData.general.squareFeetList, testData.general.numberOfUnits);
        NavigationSection.navigateToCommercialInPlaceRentRoll();
        Income.Commercial.InPlaceRentRoll.chooseListLeaseStatuses(testData.leaseStatusesList, testData.general.numberOfUnits)
            .enterListPerSF(testData.leaseStatusesList, testData.general.perSFList)
            .verifyPerSFTotal(testData.leaseStatusesList, testData.general.perSFList, testData.general.squareFeetList);
        deleteReport(testData.reportCreationData.reportNumber);
    });
});