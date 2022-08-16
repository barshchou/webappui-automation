import testData from 
    "../../../../../fixtures/not_full_reports/income/commercial/in_place_rent_roll/QA-4182-83_4388.fixture";
import { _NavigationSection } from "../../../../../actions/base";
import { Property } from "../../../../../actions";
import { Income } from "../../../../../actions";
import { createReport } from "../../../../../actions/base/baseTest.actions";

describe("Verify the Annual Rent column in the grid", 
    { tags:[ "@income", "@commercial", "@in_place_rent_roll" ] }, () => { 

        beforeEach("Create report, prepare table", () => {
            createReport(testData.reportCreationData);
            _NavigationSection.navigateToCommercialUnits();
            Property._CommercialUnits.enterUnitSFByUnitIndex(testData.general.squareFeet);
            _NavigationSection.navigateToCommercialInPlaceRentRoll();
        });

        it("Annually, [QA-4182] Verify Monthly Rent is calculated with correct formula", () => {
            Income._CommercialManager.InPlaceRentRoll.clickAnnuallyBasisButton()
                .verifyAnnualRentCellTextByRow()
                .enterAnnualRentByRowNumber(testData.general.annualRent);
        });

        it("Monthly", () => {
            Income._CommercialManager.InPlaceRentRoll.clickMonthlyBasisButton()
                .enterMonthlyRentByRowNumber(testData.general.monthlyRent)
                .verifyAnnualRentMonthlyByRowNumber(testData.general.monthlyRent);
        });

        it("Per square foot", () => {
            Income._CommercialManager.InPlaceRentRoll.enterRentPerSFAnnuallyByRowNumber(testData.general.rentPerSF)
                .verifyAnnualRentCellPerSFBasisByRow(testData.general.rentPerSF, 
                    testData.general.squareFeet, testData.unitsOfMeasureAnnually);
        });

        it("Per square foot per month, [QA-4183] Annual Rent is calculated with correct formula", () => {
            Income._CommercialManager.InPlaceRentRoll.clickPerSquareFootPerMonthButton()
                .enterRentPerSFMonthlyByRowNumber(testData.general.rentPerSF)
                .verifyAnnualRentCellPerSFBasisByRow(testData.general.rentPerSF, 
                    testData.general.squareFeet, testData.unitsOfMeasureMonthly);
        });
    });