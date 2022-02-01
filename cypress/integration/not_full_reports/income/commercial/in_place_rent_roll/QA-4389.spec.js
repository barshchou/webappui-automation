import testData from "../../../../../fixtures/not_full_reports/income/commercial/in_place_rent_roll/QA-4389.fixture";
import NavigationSection from "../../../../../actions/base/navigationSection.actions";
import Property from "../../../../../actions/property/property.manager";
import Income from "../../../../../actions/income/income.manager";
import {createReport, deleteReport} from "../../../../../actions/base/baseTest.actions";

describe("Verify the Monthly Rent column in the grid", () => {

    beforeEach("Create report, prepare table", () => {
        createReport(testData.reportCreationData);
        NavigationSection.navigateToCommercialUnits();
        Property.CommercialUnits.enterUnitSFByUnitIndex(testData.general.squareFeet);
        NavigationSection.navigateToCommercialInPlaceRentRoll();
    });

    it("Annually", () => {
        Income.Commercial.InPlaceRentRoll.clickAnnuallyBasisButton()
            .enterAnnualRentByRowNumber(testData.general.annualRent)
            .verifyMonthlyRentAnnuallyByRowNumber(testData.general.annualRent);
        deleteReport(testData.reportCreationData.reportNumber);
    });

    it("Monthly", () => {
        Income.Commercial.InPlaceRentRoll.clickMonthlyBasisButton()
            .verifyMonthlyRentByRowCellText()
            .enterMonthlyRentByRowNumber(testData.general.monthlyRent);
        deleteReport(testData.reportCreationData.reportNumber);
    });

    it("Per square foot", () => {
        Income.Commercial.InPlaceRentRoll.enterAnnualRentPerSFByRowNumber(testData.general.rentPerSF)
            .verifyMonthlyRentPerSFByRow(testData.general.rentPerSF, testData.general.squareFeet, "annually");
        deleteReport(testData.reportCreationData.reportNumber);
    });

    it("Per square foot per month", () => {
        Income.Commercial.InPlaceRentRoll.clickPerSquareFootPerMonthButton()
            .enterMonthlyRentPerSFByRowNumber(testData.general.rentPerSF)
            .verifyMonthlyRentPerSFByRow(testData.general.rentPerSF, testData.general.squareFeet, "monthly");
        deleteReport(testData.reportCreationData.reportNumber);
    });
});