import testData from "../../../../../fixtures/not_full_reports/income/residential/in_place_rent_roll/QA-4092.fixture";
import {createReport, deleteReport} from "../../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../../actions/base";
import { Income, Property } from "../../../../../actions";

describe(`Verify if "Per Year" time period PSF Rent based on is selected - > 
    the calculation of "Rent PSF" should be Monthly Rent *12/Square Footage/`, () => {
    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        _NavigationSection.navigateToPropertySummary();
        Property._Summary.enterNumberOfResUnits(testData.resUnit);
        _NavigationSection.navigateToResInPlaceRentRoll();
        Income._Residential.InPlaceRentRoll.checkPerUnitSquareFootage();

        testData.cases.forEach(el => {
            Income._Residential.InPlaceRentRoll.enterSquareFootageByRow(el.squareFootage)
                .enterMonthlyRentByRowNumber(el.monthlyRent)
                .verifyMonthlyTotalForecastEqualValue()
                .verifyAnnuallyTotalForecastEqualValue();
        });
        // cy.reload();
        // deleteReport(testData.reportCreationData.reportNumber);
    });
});