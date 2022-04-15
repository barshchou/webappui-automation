import testData from "../../../../fixtures/not_full_reports/property/commercial_units/QA-4558.fixture";
import {createReport} from "../../../../actions/base/baseTest.actions";
import {_NavigationSection} from "../../../../actions/base";
import {Property} from "../../../../actions";

describe("Verify the functionality of the Use* radio button", () => {

    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        _NavigationSection.navigateToPropertySummary();
        Property._Summary.enterNumberOfCommercialUnits();
    });
});