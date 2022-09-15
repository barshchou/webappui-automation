import testData from "../../../../../fixtures/not_full_reports/income/commercial/in_place_rent_roll/QA-4408.fixture";
import { createReport } from "../../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../../actions/base";
import { DataCollections, Income } from "../../../../../actions";

describe("Verify the Current Commercial Income Discussion on the In-Place Rent Roll page", 
    { tags:[ "@income", "@commercial", "@in_place_rent_roll" ] }, () => {
        before('Prepare report', () => {
            cy.stepInfo('Preconditions: Create report and set number of commercial units');
            createReport(testData.reportCreationData);
            _NavigationSection.navigateToSubjectPropertyData();
            DataCollections._SubjectPropertyData.enterNumberOfCommercialUnits(testData.numberOfCommercialUnits);
            _NavigationSection.navigateToCommercialInPlaceRentRoll();

            cy.saveLocalStorage();
        });

        beforeEach("Restore local storage", () => {
            cy.restoreLocalStorage();
        });

        it("All Vacant Units", () => {
            cy.stepInfo('1. Set lease status and verify commentary text when all units are vacant');
            Income._CommercialManager.InPlaceRentRoll.chooseListLeaseStatuses(testData.leaseAllVacantFixture,
                testData.numberOfCommercialUnits)
                .verifyCommentaryContainsText(testData.allVacantFixture.commentaryToBe);
        });

        it("All units are Occupied", () => {
            cy.stepInfo('1. Set lease status and verify commentary text when all units are occupied');
            Income._CommercialManager.InPlaceRentRoll.chooseListLeaseStatuses(testData.leaseAllOccupiedFixture,
                testData.numberOfCommercialUnits)
                .verifyCommentaryContainsText(testData.allOccupiedFixture.commentaryToBe);
        });

        it("Few vacant, few occupied", () => {
            cy.stepInfo('1. Set lease status and verify commentary text when units have mixed lease status');
            Income._CommercialManager.InPlaceRentRoll.chooseListLeaseStatuses(testData.leaseMixedFixture,
                testData.numberOfCommercialUnits)
                .verifyCommentaryContainsText(testData.mixedFixture.commentaryToBe);
        });
    });