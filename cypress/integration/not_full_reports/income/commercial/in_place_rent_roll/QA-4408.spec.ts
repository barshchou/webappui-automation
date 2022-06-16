import testData from "../../../../../fixtures/not_full_reports/income/commercial/in_place_rent_roll/QA-4408.fixture";
import Income from "../../../../../actions/income/income.manager";
import NavigationSection from "../../../../../actions/base/navigationSection.actions";
import Property from "../../../../../actions/property/property.manager";
import { createReport, deleteReport } from "../../../../../actions/base/baseTest.actions";

describe("Verify the Current Commercial Income Discussion on the In-Place Rent Roll page", 
    { tags:[ "@income", "@commercial", "@in_place_rent_roll" ] }, () => {

    before('Prepare report', () => {
        cy.stepInfo('Preconditions: Create report and set number of commercial units');
        createReport(testData.reportCreationData);
        NavigationSection.navigateToPropertySummary();
        Property.Summary.enterNumberOfCommercialUnits(testData.numberOfCommercialUnits);
        NavigationSection.navigateToCommercialInPlaceRentRoll();

        cy.saveLocalStorage();
    });

    beforeEach("Restore local storage", () => {
        cy.restoreLocalStorage();
    });

    it("All Vacant Units", () => {

        cy.stepInfo('1. Set lease status and verify commentary text when all units are vacant');
        Income.Commercial.InPlaceRentRoll.chooseListLeaseStatuses(testData.leaseAllVacantFixture, testData.numberOfCommercialUnits)
            .verifyCommentaryContainsText(testData.allVacantFixture.commentaryToBe);
    });

    it("All units are Occupied", () => {

        cy.stepInfo('1. Set lease status and verify commentary text when all units are occupied');
        Income.Commercial.InPlaceRentRoll.chooseListLeaseStatuses(testData.leaseAllOccupiedFixture, testData.numberOfCommercialUnits)
            .verifyCommentaryContainsText(testData.allOccupiedFixture.commentaryToBe);
    });

    it("Few vacant, few occupied", () => {

        cy.stepInfo('1. Set lease status and verify commentary text when units have mixed lease status');
        Income.Commercial.InPlaceRentRoll.chooseListLeaseStatuses(testData.leaseMixedFixture, testData.numberOfCommercialUnits)
            .verifyCommentaryContainsText(testData.mixedFixture.commentaryToBe);
        deleteReport(testData.reportCreationData.reportNumber);
    });
});