import testData from "../../../../../fixtures/not_full_reports/income/residential/in_place_rent_roll/QA-4204.fixture";
import { createReport, deleteReport } from "../../../../../actions/base/baseTest.actions";
import NavigationSection from "../../../../../actions/base/navigationSection.actions";
import Property from "../../../../../actions/property/property.manager";
import Income from "../../../../../actions/income/income.manager";
import { Tag } from "../../../../../utils/tags.utils";

describe(" Verify the Number of Residential Units section on the In-Place Rent Roll page", 
    { tags:[ Tag.income, Tag.residential, Tag.in_place_rent_roll ] }, () => {
        
    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        NavigationSection.navigateToPropertySummary();
        Property.Summary.enterNumberOfResUnits(testData.numberOfUnits);
        NavigationSection.navigateToResInPlaceRentRoll();
        Income.Residential.InPlaceRentRoll.enterAllEqualRentTypeCells(testData.rentType)
            .verifyNumberOfResidentialUnits(testData.numberOfUnits)
            .goToPropSummaryWithSaveLeavingFirst();
        Property.Summary.verifyThatPageIsOpened();
        deleteReport(testData.reportCreationData.reportNumber);
    });
});