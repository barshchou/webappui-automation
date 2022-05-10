import testData from "../../../../../fixtures/not_full_reports/income/commercial/in_place_rent_roll/QA-4493.fixture";
import { _NavigationSection } from "../../../../../actions/base";
import { Income } from "../../../../../actions";
import {createReport, deleteReport} from "../../../../../actions/base/baseTest.actions";

describe("Verify the Unsaved changes modal functionality on the In-Place Rent Roll page", () => {
    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        cy.stepInfo('1. Navigate to Commercial In Place Rent Roll and set any field');
        _NavigationSection.navigateToCommercialInPlaceRentRoll();
        Income._CommercialManager.InPlaceRentRoll.chooseLeaseStatusByRowNumber(testData.occupiedLeaseStatus);

        cy.stepInfo('2. Navigate to another page saving data');
        _NavigationSection.clickPropertyButton().clickSummaryButton().verifyUnsavedChangesModal();
        _NavigationSection.clickYesButton(); 

        cy.stepInfo('3. Navigate back to Commercial In Place Rent Roll, verify set data and set again any field');
        _NavigationSection.navigateToCommercialInPlaceRentRoll();
        Income._CommercialManager.InPlaceRentRoll.verifyLeaseStatusCellTextByRow(testData.occupiedLeaseStatus);
        Income._CommercialManager.InPlaceRentRoll.chooseLeaseStatusByRowNumber(testData.vacantLeaseStatus)
            .verifyLeaseStatusCellTextByRow(testData.vacantLeaseStatus);

        cy.stepInfo('4. Navigate to another page without saving data');
        _NavigationSection.clickPropertyButton().clickSummaryButton().verifyUnsavedChangesModal();
        _NavigationSection.clickNoButton(); 

        cy.stepInfo('5. Navigate back to Commercial In Place Rent Roll and verify data');
        _NavigationSection.navigateToCommercialInPlaceRentRoll();
        Income._CommercialManager.InPlaceRentRoll.verifyLeaseStatusCellTextByRow(testData.occupiedLeaseStatus);
        
        deleteReport(testData.reportCreationData.reportNumber);
    });
});