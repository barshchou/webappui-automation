import Homepage from "../../../../../actions/base/homepage.actions";
import testData from "../../../../../fixtures/not_full_reports/income/commercial/in_place_rent_roll/QA-4388.fixture";
import NavigationSection from "../../../../../actions/base/navigationSection.actions";
import Property from "../../../../../actions/property/property.manager";
import Income from "../../../../../actions/income/income.manager";

describe("Verify the Annual Rent column in the grid", () => {

    beforeEach("Create report, prepare table", () => {
        cy.login();
        Homepage.createReport(testData.reportCreationData);
        NavigationSection.navigateToCommercialUnits();
        Property.CommercialUnits.enterUnitSFByUnitIndex(testData.general.squareFeet);
        NavigationSection.navigateToCommercialInPlaceRentRoll();
    });

    it("Annually", () => {
        Income.Commercial.InPlaceRentRoll.clickAnnuallyBasisButton()
            .verifyAnnualRentCellTextByRow()
            .enterAnnualRentByRowNumber(testData.general.annualRent);
        deleteReport();
    });

    it("Monthly", () => {
        Income.Commercial.InPlaceRentRoll.clickMonthlyBasisButton()
            .enterMonthlyRentByRowNumber(testData.general.monthlyRent)
            .verifyAnnualRentMonthlyByRowNumber(testData.general.monthlyRent);
        deleteReport();
    });

    it("Per square foot", () => {
        Income.Commercial.InPlaceRentRoll.enterAnnualRentPerSFByRowNumber(testData.general.rentPerSF)
            .verifyAnnualRentCellPerSFBasisByRow(testData.general.rentPerSF, testData.general.squareFeet, "annually");
        deleteReport();
    });

    it("Per square foot per month", () => {
        Income.Commercial.InPlaceRentRoll.clickPerSquareFootPerMonthButton()
            .enterMonthlyRentPerSFByRowNumber(testData.general.rentPerSF)
            .verifyAnnualRentCellPerSFBasisByRow(testData.general.rentPerSF, testData.general.squareFeet, "monthly");
        deleteReport();
    });

    const deleteReport = () => {
        Income.Commercial.InPlaceRentRoll.returnToHomePage();
        Homepage.deleteReport(testData.reportCreationData.reportNumber);
    };
});