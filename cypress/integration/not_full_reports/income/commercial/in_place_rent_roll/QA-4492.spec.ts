import testData from "../../../../../fixtures/not_full_reports/income/commercial/in_place_rent_roll/QA-4492.fixture";
import { _NavigationSection } from "../../../../../actions/base";
import { Income } from "../../../../../actions";
import { createReport, deleteReport } from "../../../../../actions/base/baseTest.actions";
import { getTodayDateString } from "../../../../../../utils/date.utils";

describe("Verify the Save & Continue button functionality on the In-Place Rent Roll page",
    { tags: [ "@income", "@commercial", "@in_place_rent_roll" ] }, () => {

        before("Login, create report", () => {
            createReport(testData.reportCreationData);
        });

        it("Test body", () => {
            cy.stepInfo('1. The Save & Continue button is displayed on the In-Place Rent Roll page.');
            _NavigationSection.navigateToCommercialInPlaceRentRoll();
            Income._CommercialManager.InPlaceRentRoll.verifyThatPageIsOpened().
                Page.SaveAndContinueBtn.scrollIntoView().should('exist');

            cy.stepInfo('2. Fill in the editable fields with values or/and check check-boxes or/and click the radio button and click on the Save & Continue button.');
            Income._CommercialManager.InPlaceRentRoll.chooseLeaseStatusByRowNumber(testData.leaseStatus)
                .verifyLeaseStatusByRow(testData.leaseStatus)
                .checkIsInspectedCheckboxByRowNumber(0).verifyIsInspectedChecked()
                .enterTenantNameByRowNumber(testData.newTenantName).verifyTenantNameByRow(testData.leaseStatus, testData.newTenantName)
                .enterLeaseDateByRowNumber("Start", getTodayDateString("/"))
                .verifyLeaseDateByRowNumber("Start", testData.leaseStatus, "in-place", getTodayDateString("/"))
                .enterLeaseDateByRowNumber("Expiry", getTodayDateString("/"),)
                .verifyLeaseDateByRowNumber("Expiry", testData.leaseStatus, "in-place", getTodayDateString("/"))
                .editDiscussion(testData.newCommentary)
                .verifyCommentaryContainsText(testData.newCommentary)
                .verifyModifiedLabelExist()
                .enterRentPerSFAnnuallyByRowNumber(testData.rentPerSF)
                .verifyRentPsfAnnuallyByRow(testData.rentPerSF, 0)
                .clickSaveContinueButton();

            cy.stepInfo('3. Verify that the changes are saved and the user is redirected to the next page (Income > Commercial > Stabilized Lease Structure).');
            Income._CommercialManager.StabilizedLeaseStructure.verifyThatPageIsOpened();
            _NavigationSection.navigateToCommercialInPlaceRentRoll();
            Income._CommercialManager.InPlaceRentRoll.verifyLeaseStatusByRow(testData.leaseStatus)
                .verifyLeaseStatusByRow(testData.leaseStatus)
                .verifyIsInspectedChecked()
                .verifyTenantNameByRow(testData.leaseStatus, testData.newTenantName)
                .verifyLeaseDateByRowNumber("Start", testData.leaseStatus, "in-place", getTodayDateString("/"))
                .verifyLeaseDateByRowNumber("Expiry", testData.leaseStatus, "in-place", getTodayDateString("/"))
                .verifyRentPsfAnnuallyByRow(testData.rentPerSF, 0)
                .verifyCommentaryFullText(testData.newCommentary);

            deleteReport(testData.reportCreationData.reportNumber);
        });
    });