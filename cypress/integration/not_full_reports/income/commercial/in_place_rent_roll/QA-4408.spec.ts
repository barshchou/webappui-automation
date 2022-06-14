import testData from "../../../../../fixtures/not_full_reports/income/commercial/in_place_rent_roll/QA-4408.fixture";
import Income from "../../../../../actions/income/income.manager";
import NavigationSection from "../../../../../actions/base/navigationSection.actions";
import Property from "../../../../../actions/property/property.manager";
import { createReport, deleteReport } from "../../../../../actions/base/baseTest.actions";

describe("Verify the Current Commercial Income Discussion on the In-Place Rent Roll page", 
    { tags:[ "@income", "@commercial", "@in_place_rent_roll" ] }, () => {

    beforeEach("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("No Vacant Units", () => {
        NavigationSection.navigateToPropertySummary();
        Property.Summary.enterNumberOfCommercialUnits(testData.noVacantData.numberOfCommercialUnits);
        NavigationSection.navigateToCommercialInPlaceRentRoll();
        Income.Commercial.InPlaceRentRoll.chooseListLeaseStatuses(testData.leaseNoVacant, testData.noVacantData.numberOfCommercialUnits)
            .verifyCommentaryContainsText(testData.noVacantData.commentaryToBe);
        deleteReport(testData.reportCreationData.reportNumber);
    });

    it("One unit is Vacant", () => {
        NavigationSection.navigateToPropertySummary();
        Property.Summary.enterNumberOfCommercialUnits(testData.oneVacantData.numberOfCommercialUnits);
        NavigationSection.navigateToCommercialInPlaceRentRoll();
        Income.Commercial.InPlaceRentRoll.chooseListLeaseStatuses(testData.leaseOneVacant, testData.oneVacantData.numberOfCommercialUnits)
            .verifyCommentaryContainsText(testData.oneVacantData.commentaryToBe);
        deleteReport(testData.reportCreationData.reportNumber);
    });

    it("All units are Vacant", () => {
        NavigationSection.navigateToPropertySummary();
        Property.Summary.enterNumberOfCommercialUnits(testData.allVacantData.numberOfCommercialUnits);
        NavigationSection.navigateToCommercialInPlaceRentRoll();
        Income.Commercial.InPlaceRentRoll.chooseListLeaseStatuses(testData.leaseAllVacant, testData.allVacantData.numberOfCommercialUnits)
            .verifyCommentaryContainsText(testData.allVacantData.commentaryToBe);
        deleteReport(testData.reportCreationData.reportNumber);
    });

    it("One unit test", () => {
        NavigationSection.navigateToPropertySummary();
        Property.Summary.enterNumberOfCommercialUnits(testData.oneUnitData.numberOfCommercialUnits);
        NavigationSection.navigateToCommercialInPlaceRentRoll();
        Income.Commercial.InPlaceRentRoll.chooseLeaseStatusByRowNumber(testData.leaseOneOccupied)
            .verifyCommentaryContainsText(testData.oneUnitData.commentaryToBe);
        deleteReport(testData.reportCreationData.reportNumber);
    });

    it("Few vacant, few occupied test", () => {
        NavigationSection.navigateToPropertySummary();
        Property.Summary.enterNumberOfCommercialUnits(testData.fewVacantFewOccupiedData.numberOfCommercialUnits);
        NavigationSection.navigateToCommercialInPlaceRentRoll();
        Income.Commercial.InPlaceRentRoll.chooseListLeaseStatuses(testData.leaseFewVacantFewOccupied,
            testData.fewVacantFewOccupiedData.numberOfCommercialUnits)
            .verifyCommentaryContainsText(testData.fewVacantFewOccupiedData.commentaryToBe);
        deleteReport(testData.reportCreationData.reportNumber);
    });
});