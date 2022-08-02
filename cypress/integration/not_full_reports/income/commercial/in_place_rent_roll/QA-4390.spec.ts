import testData from "../../../../../fixtures/not_full_reports/income/commercial/in_place_rent_roll/QA-4390.fixture";
import NavigationSection from "../../../../../actions/base/navigationSection.actions";
import Property from "../../../../../actions/property/property.manager";
import Income from "../../../../../actions/income/income.manager";
import { createReport } from "../../../../../actions/base/baseTest.actions";

describe("Verify the Rent PSF column in the grid", 
    { tags:[ "@income", "@commercial", "@in_place_rent_roll" ] }, () => {

        beforeEach("Create report, prepare table", () => {
            createReport(testData.reportCreationData);
            NavigationSection.navigateToCommercialUnits();
            Property.CommercialUnits.enterUnitSFByUnitIndex(testData.general.squareFeet);
            NavigationSection.navigateToCommercialInPlaceRentRoll();
        });

        it("Annually", () => {
            Income.Commercial.InPlaceRentRoll.clickAnnuallyBasisButton()
                .enterAnnualRentByRowNumber(testData.general.annualRent)
                .verifyRentPerSFAnnuallyAnnuallyCalcByRow(testData.general.annualRent, testData.general.squareFeet);
        });

        it("Monthly", () => {
            Income.Commercial.InPlaceRentRoll.clickMonthlyBasisButton()
                .enterMonthlyRentByRowNumber(testData.general.monthlyRent)
                .verifyRentPerSFAnnuallyMonthlyCalcByRowNumber(testData.general.monthlyRent, 
                    testData.general.squareFeet);
        });

        it("Per square foot", () => {
            Income.Commercial.InPlaceRentRoll.verifyRentPerSFAnnuallyCellTextByRow()
                .enterRentPerSFAnnuallyByRowNumber(testData.general.rentPerSF);
        });

        it("Per square foot per month", () => {
            Income.Commercial.InPlaceRentRoll.clickPerSquareFootPerMonthButton()
                .enterRentPerSFMonthlyByRowNumber(testData.general.rentPerSF);
        });
    });