import testData from "../../../../../fixtures/not_full_reports/income/commercial/in_place_rent_roll/QA-4389.fixture";
import { _NavigationSection } from "../../../../../actions/base";
import { Property } from "../../../../../actions";
import { Income } from "../../../../../actions";
import { createReport } from "../../../../../actions/base/baseTest.actions";

describe("Verify the Monthly Rent column in the grid", 
    { tags:[ "@income", "@commercial", "@in_place_rent_roll" ] }, () => {

        beforeEach("Create report, prepare table", () => {
            createReport(testData.reportCreationData);
            _NavigationSection.navigateToCommercialUnits();
            Property._CommercialUnits.enterUnitSFByUnitIndex(testData.general.squareFeet);
            _NavigationSection.navigateToCommercialInPlaceRentRoll();
        });

        it("Annually", () => {
            Income._CommercialManager.InPlaceRentRoll.clickAnnuallyBasisButton()
                .enterAnnualRentByRowNumber(testData.general.annualRent)
                .verifyMonthlyRentAnnuallyByRowNumber(testData.general.annualRent);
        });

        it("Monthly", () => {
            Income._CommercialManager.InPlaceRentRoll.clickMonthlyBasisButton()
                .verifyMonthlyRentByRowCellText();
            Income._CommercialManager.InPlaceRentRoll.enterMonthlyRentByRowNumber(testData.general.monthlyRent);
        });

        it("Per square foot", () => {
            Income._CommercialManager.InPlaceRentRoll.enterRentPerSFAnnuallyByRowNumber(testData.general.rentPerSF)
                .verifyMonthlyRentPerSFByRow(testData.general.rentPerSF, testData.general.squareFeet, 
                    testData.unitsOfMeasureAnnually);
        });

        it("Per square foot per month", () => {
            Income._CommercialManager.InPlaceRentRoll.clickPerSquareFootPerMonthButton()
                .enterRentPerSFMonthlyByRowNumber(testData.general.rentPerSF)
                .verifyMonthlyRentPerSFByRow(testData.general.rentPerSF, testData.general.squareFeet, 
                    testData.unitsOfMeasureMonthly);
        });
    });