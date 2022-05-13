import testData from "../../../../../fixtures/not_full_reports/income/commercial/in_place_rent_roll/QA-4390.fixture";
import NavigationSection from "../../../../../actions/base/navigationSection.actions";
import Property from "../../../../../actions/property/property.manager";
import Income from "../../../../../actions/income/income.manager";
import { createReport, deleteReport } from "../../../../../actions/base/baseTest.actions";

describe("Verify the Rent PSF column in the grid", () => {

    beforeEach("Create report, prepare table", () => {
        createReport(testData.reportCreationData);
        NavigationSection.navigateToCommercialUnits();
        Property.CommercialUnits.enterUnitSFByUnitIndex(testData.general.squareFeet);
        NavigationSection.navigateToCommercialInPlaceRentRoll();
    });

    it("Annually", () => {
        Income.Commercial.InPlaceRentRoll.clickAnnuallyBasisButton()
            .enterAnnualRentByRowNumber(testData.general.annualRent)
            .verifyRentPerSFAnnuallyByRowNumber(testData.general.annualRent, testData.general.squareFeet);
        deleteReport(testData.reportCreationData.reportNumber);
    });

    it("Monthly", () => {
        Income.Commercial.InPlaceRentRoll.clickMonthlyBasisButton()
            .enterMonthlyRentByRowNumber(testData.general.monthlyRent)
            .verifyRentPerSFAnnuallyMonthlyCalcByRowNumber(testData.general.monthlyRent, testData.general.squareFeet);
        deleteReport(testData.reportCreationData.reportNumber);
    });

    it("Per square foot", () => {
        Income.Commercial.InPlaceRentRoll.Shared.verifyRentPerSFAnnuallyCellTextByRow();
        Income.Commercial.InPlaceRentRoll.enterRentPerSFAnnuallyByRowNumber(testData.general.rentPerSF);
        deleteReport(testData.reportCreationData.reportNumber);
    });

    it("Per square foot per month", () => {
        Income.Commercial.InPlaceRentRoll.clickPerSquareFootPerMonthButton()
            .enterRentPerSFMonthlyByRowNumber(testData.general.rentPerSF);
        deleteReport(testData.reportCreationData.reportNumber);
    });
});