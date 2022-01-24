import testData from "../../../../../fixtures/not_full_reports/income/commercial/in_place_rent_roll/QA-4408.fixture";
import Homepage from "../../../../../actions/base/homepage.actions";
import Income from "../../../../../actions/income/income.manager";
import NavigationSection from "../../../../../actions/base/navigationSection.actions";
import Property from "../../../../../actions/property/property.manager";

// TODO: The hole test is skipped for now, until the fix of bug WEB-3953 is deployed from dev env
describe.skip("Verify the Current Commercial Income Discussion on the In-Place Rent Roll page", () => {

    beforeEach("Login, create report", () => {
        cy.login();
        Homepage.createReport(testData.reportCreationData);
    });

    it("No Vacant Units", () => {
        NavigationSection.navigateToPropertySummary();
        Property.Summary.enterNumberOfCommercialUnits(testData.noVacantData.numberOfCommercialUnits);
        NavigationSection.navigateToCommercialInPlaceRentRoll();
        Income.Commercial.InPlaceRentRoll.chooseListLeaseStatuses(testData.noVacantData.leases, testData.noVacantData.numberOfCommercialUnits)
            .verifyCommentarySavedText(testData.noVacantData.commentaryToBe);
        deleteReport();
    });

    it("One unit is Vacant", () => {
        NavigationSection.navigateToPropertySummary();
        Property.Summary.enterNumberOfCommercialUnits(testData.oneVacantData.numberOfCommercialUnits);
        NavigationSection.navigateToCommercialInPlaceRentRoll();
        Income.Commercial.InPlaceRentRoll.chooseListLeaseStatuses(testData.oneVacantData.leases, testData.oneVacantData.numberOfCommercialUnits)
            .verifyCommentarySavedText(testData.oneVacantData.commentaryToBe);
        deleteReport();
    });

    it("All units are Vacant", () => {
        NavigationSection.navigateToPropertySummary();
        Property.Summary.enterNumberOfCommercialUnits(testData.allVacantData.numberOfCommercialUnits);
        NavigationSection.navigateToCommercialInPlaceRentRoll();
        Income.Commercial.InPlaceRentRoll.chooseListLeaseStatuses(testData.allVacantData.leases, testData.allVacantData.numberOfCommercialUnits)
            .verifyCommentarySavedText(testData.allVacantData.commentaryToBe);
        deleteReport();
    });

    it("One unit test", () => {
        NavigationSection.navigateToPropertySummary();
        Property.Summary.enterNumberOfCommercialUnits(testData.oneUnitData.numberOfCommercialUnits);
        NavigationSection.navigateToCommercialInPlaceRentRoll();
        Income.Commercial.InPlaceRentRoll.chooseLeaseStatusByRowNumber(testData.oneUnitData.lease)
            .verifyCommentarySavedText(testData.oneUnitData.commentaryToBe);
        deleteReport();
    });

    it("Few vacant, few occupied test", () => {
        NavigationSection.navigateToPropertySummary();
        Property.Summary.enterNumberOfCommercialUnits(testData.fewVacantFewOccupiedData.numberOfCommercialUnits);
        NavigationSection.navigateToCommercialInPlaceRentRoll();
        Income.Commercial.InPlaceRentRoll.chooseListLeaseStatuses(testData.fewVacantFewOccupiedData.leases,
            testData.fewVacantFewOccupiedData.numberOfCommercialUnits)
            .verifyCommentarySavedText(testData.fewVacantFewOccupiedData.commentaryToBe);
        deleteReport();
    });
    
    const deleteReport = () => {
        Income.Commercial.InPlaceRentRoll.returnToHomePage();
        Homepage.deleteReport(testData.reportCreationData.reportNumber);
    };
});