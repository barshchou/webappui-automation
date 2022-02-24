import testData from "../../../../../fixtures/not_full_reports/income/commercial/in_place_rent_roll/QA-4408.fixture";
import Income from "../../../../../actions/income/income.manager";
import NavigationSection from "../../../../../actions/base/navigationSection.actions";
import Property from "../../../../../actions/property/property.manager";
import {createReport, deleteReport} from "../../../../../actions/base/baseTest.actions";

describe("Verify the Current Commercial Income Discussion on the In-Place Rent Roll page", () => {

    beforeEach("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("No Vacant Units", () => {
        NavigationSection.navigateToPropertySummary();
        Property.Summary.enterNumberOfCommercialUnits(testData.noVacantData.numberOfCommercialUnits);
        NavigationSection.navigateToCommercialInPlaceRentRoll();
        Income.Commercial.InPlaceRentRoll.chooseListLeaseStatuses(testData.noVacantData.leases, testData.noVacantData.numberOfCommercialUnits)
            .verifyCommentarySavedText(testData.noVacantData.commentaryToBe);
        deleteReport(testData.reportCreationData.reportNumber);
    });

    it("One unit is Vacant", () => {
        NavigationSection.navigateToPropertySummary();
        Property.Summary.enterNumberOfCommercialUnits(testData.oneVacantData.numberOfCommercialUnits);
        NavigationSection.navigateToCommercialInPlaceRentRoll();
        Income.Commercial.InPlaceRentRoll.chooseListLeaseStatuses(testData.oneVacantData.leases, testData.oneVacantData.numberOfCommercialUnits)
            .verifyCommentarySavedText(testData.oneVacantData.commentaryToBe);
        deleteReport(testData.reportCreationData.reportNumber);
    });

    it("All units are Vacant", () => {
        NavigationSection.navigateToPropertySummary();
        Property.Summary.enterNumberOfCommercialUnits(testData.allVacantData.numberOfCommercialUnits);
        NavigationSection.navigateToCommercialInPlaceRentRoll();
        Income.Commercial.InPlaceRentRoll.chooseListLeaseStatuses(testData.allVacantData.leases, testData.allVacantData.numberOfCommercialUnits)
            .verifyCommentarySavedText(testData.allVacantData.commentaryToBe);
        deleteReport(testData.reportCreationData.reportNumber);
    });

    it("One unit test", () => {
        NavigationSection.navigateToPropertySummary();
        Property.Summary.enterNumberOfCommercialUnits(testData.oneUnitData.numberOfCommercialUnits);
        NavigationSection.navigateToCommercialInPlaceRentRoll();
        Income.Commercial.InPlaceRentRoll.chooseLeaseStatusByRowNumber(testData.oneUnitData.lease)
            .verifyCommentarySavedText(testData.oneUnitData.commentaryToBe);
        deleteReport(testData.reportCreationData.reportNumber);
    });

    it("Few vacant, few occupied test", () => {
        NavigationSection.navigateToPropertySummary();
        Property.Summary.enterNumberOfCommercialUnits(testData.fewVacantFewOccupiedData.numberOfCommercialUnits);
        NavigationSection.navigateToCommercialInPlaceRentRoll();
        Income.Commercial.InPlaceRentRoll.chooseListLeaseStatuses(testData.fewVacantFewOccupiedData.leases,
            testData.fewVacantFewOccupiedData.numberOfCommercialUnits)
            .verifyCommentarySavedText(testData.fewVacantFewOccupiedData.commentaryToBe);
        deleteReport(testData.reportCreationData.reportNumber);
    });
});