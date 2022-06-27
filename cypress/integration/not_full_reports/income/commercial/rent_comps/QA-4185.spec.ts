import testData from "../../../../../fixtures/not_full_reports/income/commercial/rent_comps/QA-4185.fixture";
import { createReport } from "../../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../../actions/base";


describe("Test", () => {

    before("Create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        _NavigationSection.navigateToCommercialRentComps();

    });
});