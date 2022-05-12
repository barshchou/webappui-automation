import testData from "../../../../../fixtures/not_full_reports/income/commercial/in_place_rent_roll/QA-4388.fixture";
import { _NavigationSection } from "../../../../../actions/base";
import { Property } from "../../../../../actions";
import { Income } from "../../../../../actions";
import { createReport, deleteReport } from "../../../../../actions/base/baseTest.actions";

describe("Verify the Annual Rent column in the grid", () => {

    beforeEach("Create report, prepare table", () => {
        createReport(testData.reportCreationData);
        _NavigationSection.navigateToCommercialUnits();
        Property._CommercialUnits.enterUnitSFByUnitIndex(testData.general.squareFeet);
        _NavigationSection.navigateToCommercialInPlaceRentRoll();
    });

    it("Annually", () => {
        Income._CommercialManager.InPlaceRentRoll.clickAnnuallyBasisButton().Shared
            .verifyAnnualRentCellTextByRow();
        Income._CommercialManager.InPlaceRentRoll.enterAnnualRentByRowNumber(testData.general.annualRent);
        deleteReport(testData.reportCreationData.reportNumber);
    });

    it("Monthly", () => {
        Income._CommercialManager.InPlaceRentRoll.clickMonthlyBasisButton()
            .enterMonthlyRentByRowNumber(testData.general.monthlyRent)
            .verifyAnnualRentMonthlyByRowNumber(testData.general.monthlyRent);
        deleteReport(testData.reportCreationData.reportNumber);
    });

    it("Per square foot", () => {
        Income._CommercialManager.InPlaceRentRoll.enterAnnualRentPerSFByRowNumber(testData.general.rentPerSF).Shared
            .verifyAnnualRentCellPerSFBasisByRow(testData.general.rentPerSF, testData.general.squareFeet, "annually");
        deleteReport(testData.reportCreationData.reportNumber);
    });

    it("Per square foot per month", () => {
        Income._CommercialManager.InPlaceRentRoll.clickPerSquareFootPerMonthButton()
            .enterMonthlyRentPerSFByRowNumber(testData.general.rentPerSF).Shared
            .verifyAnnualRentCellPerSFBasisByRow(testData.general.rentPerSF, testData.general.squareFeet, "monthly");
        deleteReport(testData.reportCreationData.reportNumber);
    });
});